export enum SortingVariant {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum TabVariant {
    ACTIVE = 'ACTIVE',
    REVIEWED = 'REVIEWED',
    DRAFT = 'DRAFT',
    AWAITING_EXECUTOR = 'AWAITING_EXECUTOR',
    AWAITING_DECISION = 'AWAITING_DECISION',
    HISTORY = 'HISTORY',
}

export const tabVaraintToNotFoundTextMap: Record<TabVariant, string> = {
    [TabVariant.ACTIVE]: 'Здесь будут отображаться ваши активные заявки',
    [TabVariant.REVIEWED]: 'Здесь будут отображаться ваши согласованные заявки',
    [TabVariant.DRAFT]: 'Здесь будут отображаться ваши черновики',
    [TabVariant.AWAITING_EXECUTOR]:
        'Здесь будут отображаться заявки, которые ожидают, когда их возьмут на согласование',
    [TabVariant.AWAITING_DECISION]:
        'Здесь будут отображаться заявки, которые ожидают, когда по ним будет вынесено решение',
    [TabVariant.HISTORY]: 'Здесь будут отображаться согласованные заявки',
};
