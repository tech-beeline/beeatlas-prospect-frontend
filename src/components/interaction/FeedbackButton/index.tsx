import React, { useRef, useState } from 'react';
import { AiChat, useAiChatStore } from 'features/ai';

import { useModal } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { BlameSideblock } from './components';
import * as S from './units';

export const FeedbackButton = () => {
    const [expanded, setExpanded] = useState(false);
    const isAiChatOpen = useAiChatStore((state) => state.isOpen);
    const openAiChat = useAiChatStore((state) => state.open);
    const { openModal, closeModal, modalOpened } = useModal();

    const dropdownRef = useRef(null);
    const iconRef = useRef<HTMLButtonElement>(null);
    useOutsideClick(dropdownRef, expanded, setExpanded, iconRef);

    const handleQuestionButtonClick = () => {
        setExpanded(!expanded);
    };

    const handleBlameButtonClick = () => {
        openModal();
        setExpanded(false);
    };

    const handleAiButtonClick = () => {
        openAiChat();
        setExpanded(false);
    };

    return (
        <>
            <S.Container hidden={isAiChatOpen}>
                <S.Dropdown ref={dropdownRef}>
                    {!window.FEATURE_FLAGS.FLAG_HIDE_AI_ASSISTANT && (
                        <S.AIButton visible={expanded}>
                            <S.FABStyled
                                onClick={handleAiButtonClick}
                                type="extended"
                                iconName={Icons.AiAssistant}
                            >
                                AI-помощник
                            </S.FABStyled>
                        </S.AIButton>
                    )}
                    {!window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND && (
                        <S.ComplainButton visible={expanded}>
                            <S.FABStyled
                                onClick={handleBlameButtonClick}
                                type="extended"
                                iconName={Icons.MessageAlert}
                            >
                                Пожаловаться на данные
                            </S.FABStyled>
                        </S.ComplainButton>
                    )}
                </S.Dropdown>
                <S.FABStyled
                    ref={iconRef}
                    onClick={handleQuestionButtonClick}
                    iconName={expanded ? Icons.Close : Icons.AiAssistant}
                />
                {!window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND && (
                    <BlameSideblock isOpen={modalOpened} onClose={closeModal} />
                )}
                {!window.FEATURE_FLAGS.FLAG_HIDE_AI_ASSISTANT && <AiChat />}
            </S.Container>
        </>
    );
};
