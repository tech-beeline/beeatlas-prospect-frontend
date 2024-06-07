import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Chip, Icon, Pagination } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetSubscriptionsQuery } from 'api/queries/subscriptions';
import { ISubscription } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';

import { SubscriptionCard, SubscriptionCardSkeleton } from './components';
import {
    CHIPS,
    FilterVariants,
    filterVariantToButtonTextMap,
    filterVariantToNotFoundTextMap,
    filterVariantToRouteMap,
} from './const';
import * as S from './units';
import { subscriptionFilterFunction } from './utils';

const SUBS_PER_PAGE = 5;

export const SubscriptionsPage = () => {
    const [page, setPage] = useState(1);
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const [search, setSearch] = useState('');
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);

    const { modalOpened, openModal, closeModal } = useModal();

    const navigate = useNavigate();

    const { data, isLoading } = useGetSubscriptionsQuery();

    const [selectedSubscriptions, setSelectedSubscriptions] = useState<ISubscription[]>([]);
    const seletedSubscriptionsIds = selectedSubscriptions.map((subscription) => subscription.id);

    const startIndex = (page - 1) * SUBS_PER_PAGE;
    const endIndex = page * SUBS_PER_PAGE;

    const filteredSubscriptions = subscriptionFilterFunction(
        data ?? [],
        filterVariant,
        search,
        ascendingOrder,
    );

    const slicedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

    const handleActionRowCheckboxClick = () => {
        if (data && selectedSubscriptions.length === data?.length) {
            setSelectedSubscriptions([]);
        } else {
            setSelectedSubscriptions([
                ...selectedSubscriptions,
                ...slicedSubscriptions.filter(
                    (subscription) => !seletedSubscriptionsIds.includes(subscription.id),
                ),
            ]);
        }
    };

    const handleCardCheckboxClick = (subscription: ISubscription) => {
        if (seletedSubscriptionsIds.includes(subscription.id)) {
            setSelectedSubscriptions(
                selectedSubscriptions.filter(
                    (selectedSubscription) => selectedSubscription.id !== subscription.id,
                ),
            );
        } else {
            setSelectedSubscriptions([...selectedSubscriptions, subscription]);
        }
    };

    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <S.Title>Мои подписки</S.Title>
                </S.Header>
                <S.FiltersContainer>
                    <S.SearchStyled
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        onClear={() => {
                            setSearch('');
                            setPage(1);
                        }}
                    />
                </S.FiltersContainer>
                <S.ChipsContainer>
                    {CHIPS.map((chip) => (
                        <Chip
                            key={chip.value}
                            label={chip.label}
                            active={filterVariant === chip.value}
                            onClick={() => {
                                setFilterVariant(chip.value);
                                setPage(1);
                            }}
                        />
                    ))}
                </S.ChipsContainer>

                <S.CardsContainer>
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
                                onClick={openModal}
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
                                <Icon
                                    iconName={ascendingOrder ? Icons.SortDown : Icons.SortUp}
                                    size="large"
                                />
                                Сортировка
                            </S.CustomButton>
                        </S.ButtonsContainer>
                    </S.ActionsRow>
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <SubscriptionCardSkeleton key={i} />
                        ))}
                    {slicedSubscriptions.map((subscription) => (
                        <SubscriptionCard
                            key={subscription.id}
                            onCheckboxClick={handleCardCheckboxClick}
                            selectedSubscriptionsIds={seletedSubscriptionsIds}
                            subscription={subscription}
                        />
                    ))}
                    {!isLoading && slicedSubscriptions.length === 0 && (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                title="Пока здесь пусто"
                                text={filterVariantToNotFoundTextMap[filterVariant]}
                                buttonProps={
                                    filterVariant === FilterVariants.ALL
                                        ? undefined
                                        : {
                                              text: filterVariantToButtonTextMap[filterVariant],
                                              size: 'medium',
                                              endIconName: Icons.ArrowRight,
                                              onClick: () =>
                                                  navigate(filterVariantToRouteMap[filterVariant]),
                                          }
                                }
                            />
                        </S.NotFoundContainer>
                    )}
                </S.CardsContainer>
                {filteredSubscriptions.length > SUBS_PER_PAGE && (
                    <S.PaginationContainer>
                        <Pagination
                            collapsed
                            count={Math.ceil(filteredSubscriptions.length / SUBS_PER_PAGE)}
                            page={page}
                            onChange={setPage}
                        />
                    </S.PaginationContainer>
                )}
            </S.Container>
            <Dialog
                opened={modalOpened}
                title="Отписаться?"
                onClose={closeModal}
                onConfirm={() => {
                    console.log(selectedSubscriptions);
                    setSelectedSubscriptions([]);
                    closeModal();
                }}
                confirmText="Отписаться"
            >
                Вы отписываетесь от{' '}
                <S.BoldSpan>
                    {selectedSubscriptions.map((subscription) => subscription.title).join(', ')}
                </S.BoldSpan>
            </Dialog>
        </S.PageWrapper>
    );
};
