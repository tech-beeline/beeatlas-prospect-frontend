import { ISubscription } from 'api/subscriptions/types';

export interface ISubscriptionCard {
    onCheckboxClick: (subscription: ISubscription) => void;
    selectedSubscriptionsIds: number[];
    subscription: ISubscription;
}
