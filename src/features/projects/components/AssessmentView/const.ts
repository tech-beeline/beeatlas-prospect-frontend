export const NAVIGATION_ITEMS = [
    { id: 'assessment-statistics', label: 'Статистика' },
    { id: 'assessment-methodology', label: 'Оценка по методологии' },
    { id: 'assessment-functional', label: 'Функциональные требования' },
    { id: 'assessment-non-functional', label: 'Нефункциональные требования' },
    { id: 'assessment-capabilities', label: 'Технические возможности' },
    { id: 'assessment-questions', label: 'Вопросы для уточнения' },
];

export const METHODOLOGY_LEVELS = [
    {
        code: 'S',
        tone: 'success',
        title: 'Минимальная',
        description:
            'Доработка 1-ой системы (внутренняя команда, нет доработок смежных систем; изменения конфигурационного характера).',
    },
    {
        code: 'M',
        tone: 'neutral',
        title: 'Низкая',
        description:
            'Доработка не более 1–2 систем (внутренняя команда; новый конфигурационный параметр; незначительные изменения без влияния на архитектуру).',
    },
    {
        code: 'L',
        tone: 'warning',
        title: 'Средняя',
        description:
            'Доработка не более 4-х систем: DMP (внутренняя разработка), PBE (внутренняя разработка), доработка смежных систем.',
    },
    {
        code: 'XL',
        tone: 'error',
        title: 'Высокая',
        description:
            'Доработка 5-и и более систем; внешние команды и вендоры; новая ИТ-архитектура или существенные изменения проекта.',
    },
] as const;
