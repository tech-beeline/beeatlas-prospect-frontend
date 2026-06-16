import React, { FC, useState } from 'react';
import { sendAnalytics } from 'features/analytics';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Button, TextArea } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IBlameSideblock } from './types';
import * as S from './units';

export const BlameSideblock: FC<IBlameSideblock> = ({ isOpen, onClose }) => {
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitClick = () => {
        sendAnalytics(['feedback', text, window.location.href]);
        setSubmitted(true);
    };

    const handleClose = () => {
        onClose();
        setSubmitted(false);
        setText('');
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Пожаловаться на данные</Text>
                        <IconButton size="large" iconName={Icons.Close} onClick={handleClose} />
                    </S.TitleContainer>
                    {submitted ? (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                setMinSize={false}
                                imageVariant={ImageVariants.CHECK}
                                title="Описание проблемы отправлено"
                                text=""
                            />
                        </S.NotFoundContainer>
                    ) : (
                        <TextArea
                            fullWidth
                            label="Описание проблемы"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    )}
                </S.ContentContainer>
                <S.ButtonsContainer>
                    {submitted ? (
                        <>
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"
                                onClick={handleClose}
                            >
                                Закрыть
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button fullWidth size="medium" onClick={handleClose}>
                                Отменить
                            </Button>
                            <Button
                                fullWidth
                                disabled={!text}
                                size="medium"
                                variant="contained"
                                onClick={handleSubmitClick}
                            >
                                Отправить
                            </Button>
                        </>
                    )}
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
