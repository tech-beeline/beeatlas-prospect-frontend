import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Pagination } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetAllSubscriptionsQuery } from 'api/queries/subscriptions';
import { ISubscription } from 'api/subscriptions/types';
import { useModal } from 'hooks';
// import { pluralize } from 'utils/helpers';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    // ActionRow,
    SubscriptionCard,
    SubscriptionCardSkeleton,
    SubscriptionFilters,
} from './components';
import {
    FilterVariants,
    filterVariantToButtonTextMap,
    filterVariantToNotFoundTextMap,
    filterVariantToRouteMap,
    subscriptionTypeToTitleMap,
} from './const';
import * as S from './units';
import { subscriptionFilterFunction } from './utils';

const SUBS_PER_PAGE = 20;

export const SubscriptionsPage = () => {
    const [page, setPage] = useState(1);
    // const [ascendingOrder, setAscendingOrder] = useState(true);
    const [search, setSearch] = useState('');
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);

    const {
        modalOpened: singleUnsubscriptionsModalOpened,
        openModal: openSingleUnsubscriptionModal,
        closeModal: closeSingleUnsubscriptionModal,
    } = useModal();
    // const {
    //     modalOpened: multipleUnsubscriptionsModalOpened,
    //     openModal: openMultipleUnsubscriptionModal,
    //     closeModal: closeMultipleUnsubscriptionModal,
    // } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigate = useNavigate();

    const { data, isLoading } = useGetAllSubscriptionsQuery();

    const [selectedSubscriptions, setSelectedSubscriptions] = useState<ISubscription[]>([]);
    const [selectedSingleSubscription, setSelectedSingleSubscription] =
        useState<ISubscription | null>(null);
    const seletedSubscriptionsIds = selectedSubscriptions.map((subscription) => subscription.id);

    const startIndex = (page - 1) * SUBS_PER_PAGE;
    const endIndex = page * SUBS_PER_PAGE;

    const filteredSubscriptions = subscriptionFilterFunction(
        data ?? [],
        filterVariant,
        search,
        // ascendingOrder,
        true,
    );

    const slicedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <S.Title>Мои подписки</S.Title>
                </S.Header>

                <SubscriptionFilters
                    search={search}
                    filterVariant={filterVariant}
                    setSearch={setSearch}
                    setFilterVariant={setFilterVariant}
                    setPage={setPage}
                />

                <S.CardsContainer>
                    {/* Задел под массовую отписку, пока отказались */}
                    {/* <ActionRow
                        data={data}
                        ascendingOrder={ascendingOrder}
                        selectedSubscriptions={selectedSubscriptions}
                        filteredSubscriptions={filteredSubscriptions}
                        slicedSubscriptions={slicedSubscriptions}
                        selectedSubscriptionsIds={seletedSubscriptionsIds}
                        setAscendingOrder={setAscendingOrder}
                        setPage={setPage}
                        openMultipleUnsubscriptionModal={openMultipleUnsubscriptionModal}
                        openSingleUnsubscriptionModal={openSingleUnsubscriptionModal}
                        setSelectedSingleSubscription={setSelectedSingleSubscription}
                        setSelectedSubscriptions={setSelectedSubscriptions}
                    /> */}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <SubscriptionCardSkeleton key={i} />
                        ))}
                    {slicedSubscriptions.map((subscription) => (
                        <SubscriptionCard
                            key={subscription.id}
                            selectedSubscriptions={selectedSubscriptions}
                            selectedSubscriptionsIds={seletedSubscriptionsIds}
                            setSelectedSubscriptions={setSelectedSubscriptions}
                            subscription={subscription}
                            openModal={openSingleUnsubscriptionModal}
                            setSelectedSingleSubscription={setSelectedSingleSubscription}
                        />
                    ))}
                    {!isLoading && slicedSubscriptions.length === 0 && (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                title="Пока здесь пусто"
                                text={filterVariantToNotFoundTextMap[filterVariant]}
                                buttonText={
                                    filterVariant === FilterVariants.ALL
                                        ? ''
                                        : filterVariantToButtonTextMap[filterVariant]
                                }
                                buttonProps={{
                                    size: 'medium',
                                    endIcon: <Icon iconName={Icons.ArrowRight} />,
                                    onClick: () =>
                                        filterVariant !== FilterVariants.ALL &&
                                        navigate(filterVariantToRouteMap[filterVariant]),
                                }}
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
            {/* <Dialog
                opened={multipleUnsubscriptionsModalOpened}
                title="Отписаться?"
                onClose={closeMultipleUnsubscriptionModal}
                onConfirm={() => {
                    setSelectedSubscriptions([]);
                    closeMultipleUnsubscriptionModal();
                    showSnackbar({ message: 'Вы отписаны от уведомлений' });
                }}
                confirmText="Отписаться"
            >
                Вы отказываетесь от <S.BoldSpan>{selectedSubscriptions.length}</S.BoldSpan>{' '}
                {pluralize(['подписки', 'подписок', 'подписок'], selectedSubscriptions.length)}
            </Dialog> */}
            <Dialog
                opened={singleUnsubscriptionsModalOpened}
                title={`Отписаться от ${
                    selectedSingleSubscription
                        ? subscriptionTypeToTitleMap[selectedSingleSubscription.type]
                        : ''
                }?`}
                onClose={closeSingleUnsubscriptionModal}
                onConfirm={() => {
                    setSelectedSubscriptions([]);
                    setSelectedSingleSubscription(null);
                    closeSingleUnsubscriptionModal();
                    showSnackbar({ message: 'Вы отписаны от уведомлений' });
                }}
                confirmText="Отписаться"
            >
                Вы отписываетесь от <S.BoldSpan>{selectedSingleSubscription?.title}</S.BoldSpan>
            </Dialog>
        </S.PageWrapper>
    );
};
