import React, { FC } from 'react';

import { Text } from 'components/core';
import { Badge, Button, Icon, Radio } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { CallDecisionType } from '../../../../types';
import * as S from '../../../../units';
import { CALL_DECISION_OPTIONS, OPERATION_STATUS_BADGE } from '../../const';
import { isDraftComplete } from '../../utils';

import { DevelopFields, ExistingMethodFields } from './components';
import { IUnmappedPartCard } from './types';
import { getCardTitle } from './utils';

export const UnmappedPartCard: FC<IUnmappedPartCard> = ({
    operation,
    productLocked,
    products,
    productsLoading,
    draft,
    isEditing,
    disabled,
    onEdit,
    onTypeChange,
    onDraftChange,
}) => {
    const savedStatus =
        operation.status === 'unmapped' ? null : OPERATION_STATUS_BADGE[operation.status];

    return (
        <S.UnmappedCard>
            <S.CardHeader>
                <div>
                    <Text variant="body2">{getCardTitle(operation)}</Text>
                    <Text inactive variant="body3">
                        {operation.reason ?? 'Решение задано архитектором'}
                    </Text>
                </div>
                {isEditing && isDraftComplete(draft) && (
                    <Badge semantic="success">Решение выбрано</Badge>
                )}
                {isEditing && !isDraftComplete(draft) && (
                    <Badge semantic="warning">Требует решения</Badge>
                )}
                {!isEditing && savedStatus && (
                    <S.ChoiceRow>
                        <Badge semantic={savedStatus.semantic}>{savedStatus.label}</Badge>
                        <Button
                            disabled={disabled}
                            size="small"
                            type="button"
                            variant="outlined"
                            startIcon={<Icon iconName={Icons.Edit} />}
                            onClick={onEdit}
                        />
                    </S.ChoiceRow>
                )}
            </S.CardHeader>
            {isEditing &&
                CALL_DECISION_OPTIONS.map((option) => (
                    <S.Option key={option.type}>
                        <Radio
                            checked={draft.type === option.type}
                            disabled={disabled}
                            label={
                                <S.OptionLabel>
                                    <Text variant="body2">{option.title}</Text>
                                    <Text inactive variant="caption">
                                        {option.description}
                                    </Text>
                                </S.OptionLabel>
                            }
                            name={`resolution-${operation.operationId}`}
                            onChange={() => onTypeChange(option.type)}
                        />
                        {draft.type === CallDecisionType.EXISTING &&
                            option.type === CallDecisionType.EXISTING && (
                                <ExistingMethodFields
                                    productLocked={productLocked}
                                    products={products}
                                    productsLoading={productsLoading}
                                    draft={draft}
                                    disabled={disabled}
                                    onDraftChange={onDraftChange}
                                />
                            )}
                        {draft.type === CallDecisionType.DEVELOP &&
                            option.type === CallDecisionType.DEVELOP && (
                                <DevelopFields
                                    products={products}
                                    productsLoading={productsLoading}
                                    draft={draft}
                                    disabled={disabled}
                                    onDraftChange={onDraftChange}
                                />
                            )}
                    </S.Option>
                ))}
        </S.UnmappedCard>
    );
};
