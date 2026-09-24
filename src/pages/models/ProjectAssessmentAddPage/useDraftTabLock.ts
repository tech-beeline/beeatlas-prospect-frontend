import { useEffect, useRef, useState } from 'react';

export type DraftTabLockState = 'checking' | 'owner' | 'locked';

const FALLBACK_LOCK_TTL = 10_000;
const FALLBACK_HEARTBEAT_INTERVAL = 3_000;

const lockName = (projectId: string) => `project-assessment-edit:${projectId}`;
const fallbackLockKey = (projectId: string) => `${lockName(projectId)}:lock`;

interface IFallbackLock {
    ownerId: string;
    expiresAt: number;
}

const readFallbackLock = (projectId: string): IFallbackLock | null => {
    try {
        const value = JSON.parse(localStorage.getItem(fallbackLockKey(projectId)) || 'null');
        return value && typeof value.ownerId === 'string' && typeof value.expiresAt === 'number'
            ? value
            : null;
    } catch {
        return null;
    }
};

const writeFallbackLock = (projectId: string, ownerId: string) => {
    localStorage.setItem(
        fallbackLockKey(projectId),
        JSON.stringify({ ownerId, expiresAt: Date.now() + FALLBACK_LOCK_TTL }),
    );
};

export const useDraftTabLock = (projectId: string | null): DraftTabLockState => {
    const [state, setState] = useState<DraftTabLockState>('checking');
    const ownerId = useRef(
        typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
    );

    useEffect(() => {
        if (!projectId) {
            setState('owner');
            return;
        }

        let active = true;
        let releaseWebLock: (() => void) | undefined;
        let fallbackHeartbeat: ReturnType<typeof setInterval> | undefined;
        let ownsFallbackLock = false;

        const acquireFallbackLock = () => {
            if (!active) return;
            try {
                const current = readFallbackLock(projectId);
                if (
                    current &&
                    current.ownerId !== ownerId.current &&
                    current.expiresAt > Date.now()
                ) {
                    if (active) setState('locked');
                    return;
                }

                writeFallbackLock(projectId, ownerId.current);
                ownsFallbackLock = readFallbackLock(projectId)?.ownerId === ownerId.current;
                if (!active) return;

                if (!ownsFallbackLock) {
                    setState('locked');
                    return;
                }

                setState('owner');
                fallbackHeartbeat = setInterval(() => {
                    const lock = readFallbackLock(projectId);
                    if (lock && lock.ownerId !== ownerId.current && lock.expiresAt > Date.now()) {
                        ownsFallbackLock = false;
                        setState('locked');
                        if (fallbackHeartbeat) clearInterval(fallbackHeartbeat);
                        return;
                    }
                    writeFallbackLock(projectId, ownerId.current);
                }, FALLBACK_HEARTBEAT_INTERVAL);
            } catch {
                if (active) setState('owner');
            }
        };

        const handleFallbackLockChange = (event: StorageEvent) => {
            if (!ownsFallbackLock || event.key !== fallbackLockKey(projectId) || !event.newValue)
                return;

            try {
                const nextLock = JSON.parse(event.newValue) as IFallbackLock;
                if (nextLock.ownerId !== ownerId.current && nextLock.expiresAt > Date.now()) {
                    ownsFallbackLock = false;
                    setState('locked');
                    if (fallbackHeartbeat) clearInterval(fallbackHeartbeat);
                }
            } catch {
                // Некорректная внешняя запись не должна лишать текущую вкладку блокировки.
            }
        };

        window.addEventListener('storage', handleFallbackLockChange);

        if (navigator.locks) {
            void navigator.locks
                .request(lockName(projectId), { ifAvailable: true }, async (lock) => {
                    if (!active) return;
                    if (!lock) {
                        setState('locked');
                        return;
                    }

                    setState('owner');
                    await new Promise<void>((resolve) => {
                        releaseWebLock = resolve;
                        if (!active) resolve();
                    });
                })
                .catch(acquireFallbackLock);
        } else {
            acquireFallbackLock();
        }

        return () => {
            active = false;
            releaseWebLock?.();
            if (fallbackHeartbeat) clearInterval(fallbackHeartbeat);
            window.removeEventListener('storage', handleFallbackLockChange);
            try {
                if (ownsFallbackLock && readFallbackLock(projectId)?.ownerId === ownerId.current) {
                    localStorage.removeItem(fallbackLockKey(projectId));
                }
            } catch {
                // Истёкший fallback-lock будет проигнорирован при следующем открытии страницы.
            }
        };
    }, [projectId]);

    return state;
};
