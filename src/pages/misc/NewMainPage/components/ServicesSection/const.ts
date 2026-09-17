import { ColorTypes } from 'components/ui/types';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

export interface ServiceItemData {
    title: string;
    description: string;
    to: string;
    icon: Icons;
    color: ColorTypes;
}

export interface ServiceCategoryData {
    title: string;
    items: ServiceItemData[];
}

export const SERVICE_CATEGORIES: ServiceCategoryData[] = [
    {
        title: 'Проектирование CX',
        items: [
            {
                title: 'Библиотека CJ',
                to: `${R.CX_PATH}${R.CJ_PATH}`,
                icon: Icons.Map,
                color: 'magenta',
                description:
                    'CJ — это конечный набор взаимодействий человека с компанией, реализация которого приводит к достижению целей как клиента, так и компании',
            },
            {
                title: 'Библиотека BI',
                to: `${R.CX_PATH}${R.BI_PATH}`,
                icon: Icons.Puzzle,
                color: 'blue',
                description:
                    'BI — выделяемые в составе CJ наборы действий, итогом которых является законченный промежуточный результат, значимый с точки зрения решаемой клиентом задачи',
            },
        ],
    },
    {
        title: 'Бизнес-архитектура',
        items: [
            {
                title: 'Поиск ФДМ',
                to: `${R.MODELS_PATH}${R.SEARCH_PATH}`,
                icon: Icons.Search,
                color: 'orange',
                description:
                    'Полнотекстовый поиск бизнес и технических возможностей на ландшафте компании',
            },
            {
                title: 'ФДМ',
                to: `${R.MODELS_PATH}${R.FDM_PATH}`,
                icon: Icons.NetworkAlt,
                color: 'orange',
                description:
                    'Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта ВК, разработанная для обеспечения простой и удобной навигации в пространстве возможностей по функциональному признаку.',
            },
            {
                title: 'Карта возможностей',
                to: `${R.MODELS_PATH}${R.MAP_PATH}`,
                icon: Icons.Map,
                color: 'orange',
                description:
                    'Это инструмент, который позволяет анализировать и контролировать состояние возможностей в рамках функционально-доменной модели',
            },
            ...(window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND
                ? []
                : [
                      {
                          title: 'Каталог E2E-сценариев',
                          to: `${R.MODELS_PATH}${R.E2E_PATH}`,
                          icon: Icons.List,
                          color: 'orange',
                          description:
                              'Содержит список сценариев и подробную информацию о них, включая проверку их описания',
                      } as ServiceItemData,
                  ]),
        ],
    },
    {
        title: 'Архитектура приложения',
        items: [
            {
                title: 'Каталог приложений',
                to: `${R.MODELS_PATH}${R.APPS_PATH}`,
                icon: Icons.Catalog,
                color: 'teal',
                description:
                    'Содержит список приложений и дополнительную информацию о каждом приложении',
            },
            {
                title: 'Каталог жизненных ситуаций',
                to: `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`,
                icon: Icons.NetworkRight,
                color: 'teal',
                description:
                    'Жизненная ситуация связывает проблему пользователя с готовыми решениями. Каждая ситуация закрывается комбинацией паттернов — универсальных способов действий, которые реализуются через конкретные требования — четкие шаги к результату. Это обеспечивает переиспользование решений и прозрачный маршрут',
            },
            {
                title: 'Аналитический отчет фитнес-функций',
                to: `${R.MODELS_PATH}${R.ANALYTICAL_REPORT_PATH}`,
                icon: Icons.Reports,
                color: 'teal',
                description:
                    'Это сводка автоматических проверок, которая показывает, насколько работа приложения соответствует ожидаемым производственным стандартам',
            },
        ],
    },
    {
        title: 'Техническая архитектура',
        items: [
            {
                title: 'Каталог паттернов',
                to: `${R.MODELS_PATH}${R.PATTERNS_PATH}`,
                icon: Icons.Archive,
                color: 'green',
                description:
                    'Паттерны содержат эффективные решения типовых задач разработки, а раздел антипаттернов помогает избежать типичных ошибок при создании качественных продуктов',
            },
            {
                title: 'Архитектура компании',
                to: `${R.MODELS_PATH}${R.IMPACT_PATH}`,
                icon: Icons.DashboardDots,
                color: 'green',
                description:
                    'Инструмент для оценки влияния сбойных элементов (приложений, экземпляров, сервисов, серверов, эндпоинтов) на работу системы',
            },
            {
                title: 'Технорадар',
                to: `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
                icon: Icons.Radar,
                color: 'green',
                description:
                    'Диаграмма, на которой можно увидеть технологии и инструменты, которые используются в компании',
            },
        ],
    },
];
