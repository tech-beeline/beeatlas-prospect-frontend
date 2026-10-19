import React, { FC } from 'react';

import { Text } from 'components/core';
import { ClampedText } from 'components/interaction';
import { Icon } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';
import { useGetProjectUsecaseRootOperationsQuery } from 'api/queries/usecase';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ImplementationSourceType } from '../../types';

import { ISourceCard } from './types';
import * as S from './units';

export const SourceCard: FC<ISourceCard> = ({ source, biStepId, onClick }) => {
    const e2e = source.type === ImplementationSourceType.E2E ? source.e2e : null;
    const useCase = source.type === ImplementationSourceType.USE_CASE ? source.useCase : null;
    const sequenceQuery = useGetSequenceCallsByIdQuery(e2e?.code ?? null);
    const useCaseQuery = useGetProjectUsecaseRootOperationsQuery(useCase?.projectId, useCase?.id);
    const callsCount =
        source.type === ImplementationSourceType.MANUAL
            ? source.relations.length
            : e2e
            ? sequenceQuery.data?.operationsRelations.length
            : useCaseQuery.data?.length;
    const isError = e2e ? sequenceQuery.isError : useCase ? useCaseQuery.isError : false;
    const label = e2e ? `Шаг E2E сценария (${e2e.source})` : 'Use Case';

    return (
        <S.Card type="button" onClick={onClick}>
            <S.Content>
                <S.Title>
                    {source.type !== ImplementationSourceType.MANUAL && (
                        <Text variant="caption" inactive>
                            {label}
                        </Text>
                    )}
                    <Text variant="body3">
                        <ClampedText
                            text={source.name}
                            tooltipId={`source-${biStepId}-${source.key}`}
                            noArrow
                            place="top"
                            offset={8}
                        />
                    </Text>
                </S.Title>
                <Text variant="caption" inactive>
                    {isError
                        ? 'Не удалось загрузить кол-во вызовов'
                        : `Кол-во вызовов: ${callsCount ?? '…'}`}
                </Text>
            </S.Content>
            <Icon iconName={Icons.NavArrowRight} />
        </S.Card>
    );
};
