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
    DEPLOYMENT = 'DEPLOYMENT',
    DATA = 'DATA',
    STANDS = 'STANDS',
}

export const TABS = [
    {
        id: TabVariants.GENERAL_INFO,
        label: 'Общая информация',
    },
    {
        id: TabVariants.DEPLOYMENT,
        label: 'Развёртывание',
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
];

export const DEPLOYMENT_ENV_PARAM = 'env';
