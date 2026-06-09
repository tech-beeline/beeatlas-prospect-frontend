import React, { FC } from 'react';

import { Checkbox, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IActionRow } from './types';
import * as S from './units';

export const ActionRow: FC<IActionRow> = ({
    data,
    filteredSubscriptions,
    slicedSubscriptions,
    selectedSubscriptionsIds,
    selectedSubscriptions,
    ascendingOrder,
    setSelectedSubscriptions,
    setSelectedSingleSubscription,
    setAscendingOrder,
    setPage,
    openMultipleUnsubscriptionModal,
    openSingleUnsubscriptionModal,
}) => {
    const handleActionRowCheckboxClick = () => {
        if (data && selectedSubscriptions.length === data?.length) {
            setSelectedSubscriptions([]);
        } else {
            setSelectedSubscriptions([
                ...selectedSubscriptions,
                ...slicedSubscriptions.filter(
                    (subscription) => !selectedSubscriptionsIds.includes(subscription.id),
                ),
            ]);
        }
    };

    const handleActionRowUnsubscribeClick = () => {
        if (selectedSubscriptions.length === 1) {
            setSelectedSingleSubscription(selectedSubscriptions[0]);
            openSingleUnsubscriptionModal();
        } else {
            openMultipleUnsubscriptionModal();
        }
    };

    return (
        <S.ActionsRow>
            <Checkbox
                checked={selectedSubscriptions.length > 0}
                type={
                    selectedSubscriptions.length === data?.length ||
                    selectedSubscriptions.length === 0
                        ? 'checkbox'
                        : 'indeterminate'
                }
                onChange={handleActionRowCheckboxClick}
            />
            <S.ButtonsContainer>
                <S.CustomButton
                    disabled={selectedSubscriptions.length === 0}
                    onClick={handleActionRowUnsubscribeClick}
                >
                    <Icon iconName={Icons.NotificationOff} size="large" />
                    Отписаться
                </S.CustomButton>
                <S.CustomButton
                    disabled={filteredSubscriptions.length < 3}
                    onClick={() => {
                        setAscendingOrder(!ascendingOrder);
                        setPage(1);
                    }}
                >
                    <Icon iconName={ascendingOrder ? Icons.SortDown : Icons.SortUp} size="large" />
                    Сортировка
                </S.CustomButton>
            </S.ButtonsContainer>
        </S.ActionsRow>
    );
};
