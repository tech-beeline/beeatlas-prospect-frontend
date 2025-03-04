export const APPLICATIONS_PER_PAGE = 15;

export enum TabVariant {
    ACTIVE = 'ACTIVE',
    REVIEWED = 'REVIEWED',
    DRAFT = 'DRAFT',
    AWAITING_EXECUTOR = 'AWAITING_EXECUTOR',
    AWAITING_DECISION = 'AWAITING_DECISION',
    HISTORY = 'HISTORY',
}

export enum SortingVariant {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const USER_TABS = [
    { label: 'Активные', value: TabVariant.ACTIVE },
    { label: 'Рассмотренные', value: TabVariant.REVIEWED },
    { label: 'Черновики', value: TabVariant.DRAFT },
];

export const REVIEWER_TABS = [
    { label: 'Ожидают исполнителя', value: TabVariant.AWAITING_EXECUTOR },
    { label: 'Ожидают решения', value: TabVariant.AWAITING_DECISION },
    { label: 'История решений', value: TabVariant.HISTORY },
];

export const tabVaraintToNotFoundTextMap: Record<TabVariant, string> = {
    [TabVariant.ACTIVE]: 'Здесь будут отображаться ваши активные заявки',
    [TabVariant.REVIEWED]: 'Здесь будут отображаться ваши рассмотренные заявки',
    [TabVariant.DRAFT]: 'Здесь будут отображаться ваши черновики',
    [TabVariant.AWAITING_EXECUTOR]:
        'Здесь будут отображаться заявки, которые ожидают, когда их возьмут на рассмотрение',
    [TabVariant.AWAITING_DECISION]:
        'Здесь будут отображаться заявки, которые ожидают, когда по ним будет вынесено решение',
    [TabVariant.HISTORY]: 'Здесь будут отображаться рассмотренные заявки',
};
