import { ISubscriptionEntity, ISubscriptionV2 } from 'api/subscriptions/types';

export interface ISubscriptionCard {
    // selectedSubscriptions: ISubscription[];
    // setSelectedSubscriptions: (subscriptions: ISubscription[]) => void;
    // selectedSubscriptionsIds: number[];
    entitiesData: ISubscriptionEntity[];
    subscription: ISubscriptionV2;
    openModal: () => void;
    setSelectedSingleSubscription: (subscription: ISubscriptionV2) => void;
}
