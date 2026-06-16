export enum TabVariants {
    GENERAL_INFO = 'GENERAL_INFO',
    FITNESS_FUNCTIONS = 'FITNESS_FUNCTIONS',
    E2E_PROCESSES = 'E2E_PROCESSES',
    TECH_CAPABILITIES = 'TECH_CAPABILITIES',
    INTERFACES_AND_METHODS = 'INTERFACES_AND_METHODS',
    ARCHITECTURE_CHANGES = 'ARCHITECTURE_CHANGES',
    TECHNOLOGIES = 'TECHNOLOGIES',
    PATTERNS = 'PATTERNS',
    REQUIREMENTS = 'REQUIREMENTS',
    DIAGRAMS = 'DIAGRAMS',
    DATA = 'DATA',
    STANDS = 'STANDS',
}

export const TABS = [
    {
        id: TabVariants.GENERAL_INFO,
        label: 'Общая информация',
    },
    {
        id: TabVariants.INTERFACES_AND_METHODS,
        label: 'Интерфейсы, методы и SLA',
    },
    {
        id: TabVariants.FITNESS_FUNCTIONS,
        label: 'Фитнес-функции',
    },
    {
        id: TabVariants.TECH_CAPABILITIES,
        label: 'Технические возможности',
    },
    {
        id: TabVariants.E2E_PROCESSES,
        label: 'E2E процессы',
    },
    // {
    //     id: TabVariants.ARCHITECTURE_CHANGES,
    //     label: 'Изменения в архитектуре',
    // },
    {
        id: TabVariants.TECHNOLOGIES,
        label: 'Технологии',
    },
    {
        id: TabVariants.PATTERNS,
        label: 'Паттерны',
    },
    {
        id: TabVariants.REQUIREMENTS,
        label: 'Нефункциональные требования',
    },
    {
        id: TabVariants.DIAGRAMS,
        label: 'Диаграммы',
    },
    // {
    //     id: TabVariants.DATA,
    //     label: 'Данные',
    // },
    // {
    //     id: TabVariants.STANDS,
    //     label: 'Стенды',
    // },
];
