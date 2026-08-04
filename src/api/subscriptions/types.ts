export enum SubscriptionType {
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
    GROUP = 'GROUP',
    DOMAIN = 'DOMAIN',
    CJ = 'CJ',
    TECHNOLOGY = 'TECHNOLOGY',
    PATTERN = 'PATTERN',
}

export interface ISubscription {
    id: number;
    type: SubscriptionType;
    title: string;
}

export enum SubscriptionEntityVariants {
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
    TECH = 'TECH',
    ARCH_INTERFACE = 'arch_interface',
    PATTERN = 'pattern',
}

export interface ISubscriptionForm {
    entityType: SubscriptionEntityVariants;
    id: number;
    subChildren?: boolean;
    name?: string;
}

export interface IMultipleSubscriptionForm {
    entityType: SubscriptionEntityVariants;
    ids: number[];
}

export interface ISubscriptionEntity {
    id: number;
    alias: string;
    type: SubscriptionEntityVariants;
}

export interface ISubscriptionV2 {
    id: number;
    name: string;
    entityType: SubscriptionEntityVariants;
}
