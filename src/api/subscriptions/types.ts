export enum SubscriptionType {
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
    GROUP = 'GROUP',
    DOMAIN = 'DOMAIN',
    CJ = 'CJ',
    TECHNOLOGY = 'TECHNOLOGY',
}

export interface ISubscription {
    id: number;
    type: SubscriptionType;
    title: string;
}
