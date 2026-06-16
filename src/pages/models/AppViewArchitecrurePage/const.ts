export enum TabVariants {
    CONTEXT_DIAGRAM = 'CONTEXT_DIAGRAM',
    CONTAINER_DIAGRAM = 'CONTAINER_DIAGRAM',
    DEPLOYMENT_DIAGRAM = 'DEPLOYMENT_DIAGRAM',
}

export const TABS = [
    {
        id: TabVariants.CONTEXT_DIAGRAM,
        label: 'Контекстная диаграмма',
    },
    {
        id: TabVariants.CONTAINER_DIAGRAM,
        label: 'Контейнерная диаграмма',
    },
    {
        id: TabVariants.DEPLOYMENT_DIAGRAM,
        label: 'Диаграмма развертывания ',
    },
];

export enum DisplayOptions {
    CHANGES = 'CHANGES',
    DIAGRAM = 'DIAGRAM',
}
