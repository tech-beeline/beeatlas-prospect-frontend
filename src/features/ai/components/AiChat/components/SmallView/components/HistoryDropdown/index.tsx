import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAiChatStore } from 'features/ai/store';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { HistoryItem } from './components';
import { IHistoryDropDown } from './types';
import * as S from './units';

const getMenuPosition = (triggerRect: DOMRect) => ({
    top: triggerRect.bottom,
    left: triggerRect.right - S.HISTORY_MENU_WIDTH,
});

export const HistoryDropdown: FC<IHistoryDropDown> = ({ children, sessions }) => {
    const setSelectedSessionKey = useAiChatStore((state) => state.setSelectedSessionKey);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, triggerRef);

    useLayoutEffect(() => {
        if (!isMenuOpen || !triggerRef.current) {
            return undefined;
        }

        const updatePosition = () => {
            if (!triggerRef.current) {
                return;
            }

            setMenuPosition(getMenuPosition(triggerRef.current.getBoundingClientRect()));
        };

        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isMenuOpen]);

    const handleTriggerClick = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleSessionClick = (sessionKey: string) => {
        setSelectedSessionKey(sessionKey);
        setMenuOpen(false);
    };

    return (
        <S.Container>
            <div ref={triggerRef} onClick={handleTriggerClick}>
                {children}
            </div>

            {isMenuOpen &&
                createPortal(
                    <S.MenuBlock
                        ref={menuRef}
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                    >
                        {sessions.length === 0 && (
                            <S.HistorySection>
                                <Text inactive variant="body3">
                                    Нет сессий
                                </Text>
                            </S.HistorySection>
                        )}
                        {sessions.map((section) => (
                            <S.HistorySection key={section.title}>
                                <S.HistorySectionTitle>
                                    <Text inactive variant="overline">
                                        {section.title}
                                    </Text>
                                    {section.pinned && (
                                        <IconButton
                                            iconName={
                                                isCollapsed ? Icons.NavArrowDown : Icons.NavArrowUp
                                            }
                                            aria-label={
                                                isCollapsed
                                                    ? 'Развернуть секцию'
                                                    : 'Свернуть секцию'
                                            }
                                            size="small"
                                            onClick={() => setIsCollapsed((prev) => !prev)}
                                        />
                                    )}
                                </S.HistorySectionTitle>
                                {!(section.pinned && isCollapsed) &&
                                    section.items.map((session) => (
                                        <HistoryItem
                                            key={session.key}
                                            session={session}
                                            handleSessionClick={handleSessionClick}
                                        />
                                    ))}
                            </S.HistorySection>
                        ))}
                    </S.MenuBlock>,
                    document.body,
                )}
        </S.Container>
    );
};
