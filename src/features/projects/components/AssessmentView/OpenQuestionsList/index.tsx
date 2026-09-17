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
            <S.CardStyled border="default">
                {questions.map((question) => (
                    <S.Question key={question.id}>
                        <Text variant="body2">{question.code || '—'}</Text>
                        <Text inactive variant="body3">
                            {question.text || '—'}
                        </Text>
                    </S.Question>
                ))}
            </S.CardStyled>
        </S.List>
    );
};
