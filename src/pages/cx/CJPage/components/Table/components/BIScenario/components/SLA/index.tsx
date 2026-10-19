import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableNumber } from 'utils/formatters';

import { ISLA } from './types';
import * as S from './units';

export const SLA: FC<ISLA> = ({ biStep, onEdit }) => {
    const [expanded, setExpanded] = useState(false);
    const filled = [biStep.rps, biStep.latency, biStep.errorRate].every(
        (value) => value !== null && value !== undefined,
    );

    return (
        <S.Card>
            <S.Header type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
                <Text variant="body3">SLA</Text>
                <S.Status>
                    <Text variant="caption" inactive>
                        {filled ? 'заполнено' : 'не заполнено'}
                    </Text>
                </S.Status>
                <Icon iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown} />
            </S.Header>
            {expanded && (
                <S.Content>
                    <S.Metrics>
                        <S.Metric>
                            <Text variant="overline">RPS</Text>
                            <Text variant="body3">{formatNullableNumber(biStep.rps)}</Text>
                        </S.Metric>
                        <S.Metric>
                            <Text variant="overline">LATENCY, MS</Text>
                            <Text variant="body3">{formatNullableNumber(biStep.latency)}</Text>
                        </S.Metric>
                        <S.Metric>
                            <Text variant="overline">ERROR RATE, %</Text>
                            <Text variant="body3">{formatNullableNumber(biStep.errorRate)}</Text>
                        </S.Metric>
                    </S.Metrics>
                    <Button type="button" variant="outlined" fullWidth onClick={onEdit}>
                        Редактировать
                    </Button>
                </S.Content>
            )}
        </S.Card>
    );
};
