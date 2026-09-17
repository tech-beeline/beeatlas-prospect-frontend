import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getProjectAssessmentName, getProjectAssessmentSemantic } from 'features/projects';

import { Text } from 'components/core';
import { Badge } from 'components/ui';

import * as R from 'router/const';
import { formatDateToUTC } from 'utils/formatters';

import { IAssessmentCard } from './types';
import * as S from './units';

const METRICS = [
    { key: 'reqFuncCount', label: 'FR' },
    { key: 'reqNonFuncCount', label: 'NFR' },
    { key: 'tcCount', label: 'TC' },
    { key: 'productCount', label: 'Системы' },
    { key: 'oqCount', label: 'Вопросы' },
] as const;

export const AssessmentCard: FC<IAssessmentCard> = ({ assessment, current }) => {
    const navigate = useNavigate();

    const createdDateFormatted = dayjs(formatDateToUTC(assessment.createdDate))
        .local()
        .format('DD.MM.YYYY, HH:mm');

    return (
        <S.Card>
            <S.Labels>
                <Badge semantic={getProjectAssessmentSemantic(assessment.impactLevel)}>
                    {getProjectAssessmentName(assessment.impactLevel)}
                </Badge>
                {current && <Badge semantic="magenta">Последняя оценка</Badge>}
            </S.Labels>

            <Text
                link
                pointer
                variant="h6"
                onClick={() =>
                    navigate(
                        `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.ASSESSMENT_PATH}?id=${assessment.id}`,
                    )
                }
            >
                Оценка от {createdDateFormatted}
            </Text>

            <S.Metrics>
                {METRICS.map((metric) => (
                    <div key={metric.key}>
                        <Text inactive variant="overline">
                            {metric.label}
                        </Text>
                        <Text variant="body2">{assessment[metric.key]}</Text>
                    </div>
                ))}
            </S.Metrics>

            <S.MetaInfoContainer>
                <Text inactive variant="body3">
                    Автор
                </Text>
                <Text variant="body2">{assessment.ownerName}</Text>
            </S.MetaInfoContainer>

            <S.MetaInfoContainer>
                <Text inactive variant="body3">
                    Дата проведения
                </Text>
                <Text variant="body2">{createdDateFormatted}</Text>
            </S.MetaInfoContainer>
        </S.Card>
    );
};
