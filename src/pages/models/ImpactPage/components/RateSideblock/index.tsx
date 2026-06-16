import React, { FC, useState } from 'react';
import { sendAnalytics } from 'features/analytics';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Button, TextArea } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IRateSideblock } from './types';
import * as S from './units';

export const RateSideblock: FC<IRateSideblock> = ({ isOpen, onClose }) => {
    const [ratingValue, setRatingValue] = useState<null | number>(null);
    const [comment, setComment] = useState('');
    const [reviewDone, setReviewDone] = useState(false);

    const handleSendReviewClick = () => {
        sendAnalytics(['impact_rating', String(ratingValue), comment]);
        setReviewDone(true);
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.MainContent>
                    <S.FlexWrapper>
                        <Text variant="h5">Оценка сервиса</Text>

                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.FlexWrapper>

                    {!reviewDone && (
                        <>
                            <Text variant="subtitle1">
                                Поделись своим впечатлением о сервисе и помоги нам стать еще лучше
                            </Text>

                            <S.RatingStyled
                                value={ratingValue ?? undefined}
                                score={ratingValue ? `${ratingValue} из 5` : `\u00A0`}
                                onChange={(i) => setRatingValue(i)}
                            />

                            {ratingValue && (
                                <>
                                    <Text variant="subtitle1">
                                        Что бы вы изменили или добавили?
                                    </Text>
                                    <S.TextAreaContainer>
                                        <TextArea
                                            fullWidth
                                            label="Напишите ваш комментарий"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </S.TextAreaContainer>
                                </>
                            )}
                        </>
                    )}

                    {reviewDone && (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                setMinSize={false}
                                imageVariant={ImageVariants.CHECK}
                                title="Спасибо за ответ"
                                text="Он поможет нам измениться в лучшую сторону"
                            />
                        </S.NotFoundContainer>
                    )}
                </S.MainContent>
                {!reviewDone && (
                    <S.Footer>
                        <Button
                            fullWidth
                            variant="contained"
                            size="medium"
                            onClick={handleSendReviewClick}
                            disabled={!ratingValue}
                        >
                            Отправить оценку
                        </Button>
                    </S.Footer>
                )}
            </S.Container>
        </SideBlock>
    );
};
