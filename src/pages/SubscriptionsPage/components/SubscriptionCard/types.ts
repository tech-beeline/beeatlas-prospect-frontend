import { ISubscription } from 'api/subscriptions/types';

export interface ISubscriptionCard {
    // selectedSubscriptions: ISubscription[];
    // setSelectedSubscriptions: (subscriptions: ISubscription[]) => void;
    // selectedSubscriptionsIds: number[];
    subscription: ISubscription;
    openModal: () => void;
    setSelectedSingleSubscription: (subscription: ISubscription) => void;
}
