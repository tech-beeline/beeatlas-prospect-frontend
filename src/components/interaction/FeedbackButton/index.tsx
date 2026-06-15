import React, { useRef, useState } from 'react';

import { useModal } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { BlameSideblock } from './components';
import * as S from './units';

export const FeedbackButton = () => {
    const [expanded, setExpanded] = useState(false);
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

    return (
        <S.Container>
            <S.ComplainButton ref={dropdownRef} visible={expanded}>
                <S.FABStyled
                    onClick={handleBlameButtonClick}
                    type="extended"
                    iconName={Icons.MessageAlert}
                >
                    Пожаловаться на данные
                </S.FABStyled>
            </S.ComplainButton>
            <S.FABStyled
                ref={iconRef}
                onClick={handleQuestionButtonClick}
                iconName={expanded ? Icons.Close : Icons.QuestionCircled}
            />
            <BlameSideblock isOpen={modalOpened} onClose={closeModal} />
        </S.Container>
    );
};
