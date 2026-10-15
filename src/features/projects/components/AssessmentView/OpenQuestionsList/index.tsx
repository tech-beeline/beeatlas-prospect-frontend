import React, { FC } from 'react';

import { Text } from 'components/core';

import { IOpenQuestionsListProps } from './types';
import * as S from './units';

export const OpenQuestionsList: FC<IOpenQuestionsListProps> = ({
    questions,
    emptyText = 'Вопросы не выявлены',
}) => {
    if (!questions.length) {
        return (
            <Text inactive variant="body2">
                {emptyText}
            </Text>
        );
    }

    return (
        <S.List>
            {questions.map((question, index) => (
                <S.CardStyled key={question.id} border="default">
                    <Text inactive variant="body3">
                        {question.code}
                    </Text>
                    <Text variant="body2">{question.text || '—'}</Text>
                </S.CardStyled>
            ))}
        </S.List>
    );
};
