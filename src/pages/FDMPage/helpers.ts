import { Item, ItemTypes } from './store/types';

const authParams = ['auth_code', 'auth_state', 'auth_provider'];

export const validateFDMParams = (params: URLSearchParams): boolean => {
    const paramsObject = Object.fromEntries(params);
    const filteredEntries = Object.entries(paramsObject).filter(
        (entry) => !authParams.includes(entry[0]),
    );
    const paramsLength = filteredEntries.length;
    const filteredParams = Object.fromEntries(filteredEntries);

    if (paramsLength === 0) {
        return true;
    }

    if (
        paramsLength === 2 &&
        filteredParams.id &&
        (filteredParams.type === ItemTypes.BUSINESS || filteredParams.type === ItemTypes.TECH)
    ) {
        return true;
    }

    return false;
};

export enum ItemClassification {
    GROUP = 'GROUP',
    DOMAIN = 'DOMAIN',
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
}

export const getItemClassification = (item: Item): ItemClassification => {
    if (item.isDomain && item.parent === null) {
        return ItemClassification.GROUP;
    }

    if (item.isDomain && item.parent !== null) {
        return ItemClassification.DOMAIN;
    }

    if (item.type === ItemTypes.TECH) {
        return ItemClassification.TECH_CAPABILITY;
    }

    return ItemClassification.BUSINESS_CAPABILITY;
};

export const itemToNameMap: Record<ItemClassification, string> = {
    [ItemClassification.GROUP]: 'группы',
    [ItemClassification.DOMAIN]: 'домена',
    [ItemClassification.BUSINESS_CAPABILITY]: 'бизнес-возможности',
    [ItemClassification.TECH_CAPABILITY]: 'технической возможности',
};

export const itemToSubscriptionMessageMap: Record<ItemClassification, string> = {
    [ItemClassification.GROUP]:
        'Вы подписаны на изменения группы и её дочерних элементов. Уведомления будут отображаться на витрине ФДМ',
    [ItemClassification.DOMAIN]:
        'Вы подписаны на изменения домена и его дочерних элементов. Уведомления будут отображаться на витрине ФДМ',
    [ItemClassification.BUSINESS_CAPABILITY]:
        'Вы подписаны на изменения бизнес-возможности и её дочерних элементов. Уведомления будут отображаться на витрине ФДМ',
    [ItemClassification.TECH_CAPABILITY]:
        'Вы подписаны на изменения технической возможности. Уведомления будут отображаться на витрине ФДМ',
};
