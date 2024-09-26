import { ISubscription } from 'api/subscriptions/types';

export interface IActionRow {
    selectedSubscriptions: ISubscription[];
    selectedSubscriptionsIds: number[];
    data: ISubscription[] | undefined;
    filteredSubscriptions: ISubscription[];
    slicedSubscriptions: ISubscription[];
    ascendingOrder: boolean;
    setSelectedSubscriptions: (selectedSubscriptions: ISubscription[]) => void;
    setSelectedSingleSubscription: (selectedSubscription: ISubscription) => void;
    setAscendingOrder: (ascendingOrder: boolean) => void;
    setPage: (page: number) => void;
    openSingleUnsubscriptionModal: () => void;
    openMultipleUnsubscriptionModal: () => void;
}
