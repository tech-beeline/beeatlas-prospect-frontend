import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OpenAiChatOptions {
    fullscreen?: boolean;
}

interface AiChatStore {
    isOpen: boolean;
    isFullscreen: boolean;
    prefillText: string;
    pinnedSessions: string[];
    shouldSendMessage: boolean;
    selectedSessionKey: string | null;

    open: (prefillText?: string, options?: OpenAiChatOptions) => void;
    close: () => void;
    setIsFullscreen: (isFullscreen: boolean) => void;
    setPrefillText: (text: string) => void;
    setPinnedSessions: (pinnedSessions: string[]) => void;
    setShouldSendMessage: (shouldSendMessage: boolean) => void;
    setSelectedSessionKey: (selectedSessionKey: string | null) => void;
}

const defaultValues: Pick<
    AiChatStore,
    | 'isOpen'
    | 'isFullscreen'
    | 'prefillText'
    | 'pinnedSessions'
    | 'shouldSendMessage'
    | 'selectedSessionKey'
> = {
    isOpen: false,
    isFullscreen: false,
    prefillText: '',
    pinnedSessions: [],
    shouldSendMessage: false,
    selectedSessionKey: null,
};

export const useAiChatStore = create<AiChatStore>()(
    persist(
        (set) => ({
            ...defaultValues,
            open: (prefillText = '', options) =>
                set({ isOpen: true, prefillText, isFullscreen: options?.fullscreen ?? false }),
            close: () => set({ ...defaultValues }),
            setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
            setPrefillText: (prefillText) => set({ prefillText }),
            setPinnedSessions: (pinnedSessions) => set({ pinnedSessions }),
            setShouldSendMessage: (shouldSendMessage) => set({ shouldSendMessage }),
            setSelectedSessionKey: (selectedSessionKey) => set({ selectedSessionKey }),
        }),
        {
            name: 'ai-chat-store',
            partialize: (state) => ({
                pinnedSessions: state.pinnedSessions,
            }),
        },
    ),
);
