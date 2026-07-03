# Витрина ФДМ

Веб-приложение для работы с моделями функционально-доменной архитектуры (ФДМ): каталог приложений, паттерны, карты возможностей, Customer Journey, технологический радар, администрирование и личный кабинет.

## Стек

- **React 18** + **TypeScript**
- **Webpack 5** — сборка и dev-сервер
- **React Router 6** — маршрутизация
- **TanStack Query** — работа с API
- **Zustand** — клиентское состояние
- **Emotion** — стилизация компонентов
- **bpmn-js**, **D3**, **react-force-graph-2d** — диаграммы и визуализации

## Требования

| Инструмент | Версия |
|---|---|
| Node.js | >= 16.14.0 |
| npm | >= 8 |

Для production-развёртывания через Docker потребуется предварительно собранная директория `build/` и образ на базе nginx (см. [Docker](#docker)).

> **Бэкенд.** Приложение — SPA-клиент к API-шлюзу. Для полноценной работы нужен развёрнутый backend (gateway и связанные сервисы). Без него интерфейс загрузится, но запросы к API будут завершаться ошибкой.

## Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone <repository-url>
cd frontend-arhitect-area

# 2. Установить зависимости
npm install

# 3. Настроить переменные окружения (см. раздел ниже)
cp public/env/env.example public/env/env
# отредактируйте public/env/env под своё окружение

# 4. Запустить dev-сервер
npm start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Описание |
|---|---|
| `npm start` | Dev-сервер с hot reload (порт **3000**) |
| `npm run build` | Production-сборка в директорию `build/` |
| `npm run lint` | TypeScript + ESLint + Prettier |
| `npm run lint:tsc` | Проверка типов |
| `npm run lint:eslint` | ESLint с автоисправлением |
| `npm run lint:prettier` | Форматирование Prettier |
| `npm run lint:stylelint` | Stylelint для `units.ts` |

## Переменные окружения

Конфигурация загружается **во время выполнения** из файла `/env/env`. При старте приложение выполняет `fetch('/env/env')` и записывает значения в `window.FEATURE_FLAGS`.

### Локальная разработка

Скопируйте шаблон и отредактируйте под своё окружение:

```bash
cp public/env/env.example public/env/env
```

Файл [`public/env/env`](public/env/env) не коммитится в git (см. [`.gitignore`](.gitignore)). Dev-сервер отдаёт его по пути `/env/env`. Эталон значений — [`public/env/env.example`](public/env/env.example).

Формат — пары `KEY='value'`, по одной на строку. Булевы значения задаются как `'true'` / `'false'`.

### Production / Docker

При сборке файл копируется из `public/env/` в `build/env/`. В Docker-образе значения **перезаписываются** при старте контейнера скриптом [`nginx/scripts/99-replace-www-env.sh`](nginx/scripts/99-replace-www-env.sh) на основе переменных окружения контейнера.

### Справочник переменных

Переменные из таблицы ниже попадают в `window.FEATURE_FLAGS` и доступны в рантайме приложения.

| Переменная | Тип | Описание |
|---|---|---|
| `FLAG_IS_PROD` | boolean | Production-режим. Скрывает dev-инструменты (например, ссылку на WebIDE). |
| `FLAG_IS_DEMO_STAND` | boolean | **Режим демо-стенда.** При `true` используется OIDC-авторизация (Authentik) вместо eAuth. Рекомендуется для open-source и внешних развёртываний. Скрывает корпоративные разделы (дашборды приложений и E2E, обратная связь и др.). |
| `FLAG_SHOW_TOP_BANNER` | boolean | Показывает верхний баннер с приглашением пройти опрос (`TopBanner` над шапкой). При `false` баннер не отображается. Если пользователь закрыл баннер, он больше не показывается (состояние сохраняется в localStorage). |
| `FLAG_API_URL` | string | Базовый URL API-шлюза. В dev-режиме запросы идут напрямую на этот адрес; в production — через относительные пути и nginx-прокси. |
| `FLAG_AUTHENTIK_URL` | string | URL сервера Authentik (OIDC). Используется при `FLAG_IS_DEMO_STAND='true'`. |
| `FLAG_AUTHENTIK_CLIENT_ID` | string | Client ID приложения в Authentik. |
| `FLAG_EAUTH_URL` | string | URL сервиса eAuth. Используется при `FLAG_IS_DEMO_STAND='false'`. В dev-режиме обычно указывают `http://localhost:3000`, чтобы запросы авторизации шли через прокси dev-сервера. |
| `FLAG_DOC_SERVICE_URL` | string | URL сервиса документации (ссылка в шапке, инструкции). |
| `FLAG_WEBIDE_URL` | string | URL WebIDE (доступна в non-prod окружениях). |
| `FLAG_TEMPLATE_URL` | string | URL шаблонов материалов. Используется на странице «Шаблоны» в разделе базы знаний для открытия презентаций и документов. |
| `FLAG_DASHBOARD_URL` | string | Базовый URL встроенных дашбордов. Используется для iframe-страниц «Приложения» (`/systems`) и «E2E» (`/e2e`). Доступны только при `FLAG_IS_DEMO_STAND='false'`. |

#### Только для локальной разработки

Переменная ниже читается **только** webpack dev-сервером из `public/env/env` и **не** попадает в `window.FEATURE_FLAGS`.

| Переменная | Тип | Описание |
|---|---|---|
| `FLAG_EAUTH_PROXY_TARGET` | string | Upstream для проксирования `/api/v1/auth` на eAuth-сервер в dev-режиме (см. [`config/webpack/webpack.dev.js`](config/webpack/webpack.dev.js)). Если не задана, прокси для eAuth не включается. |

### Переменные nginx (Docker)

При развёртывании через [`Dockerfile`](Dockerfile) дополнительно настраиваются прокси-маршруты:

| Переменная | По умолчанию | Описание |
|---|---|---|
| `NGINX_LOCATION_API_GATEWAY` | `http://gateway:8080` | Upstream для `/api-gateway`, `/product/api`, `/cx/api` и других сервисов шлюза |
| `NGINX_LOCATION_API` | `http://backend:8080` | Upstream для `/api` |
| `NGINX_LOCATION_API_GATEWAY_ADDITIONAL_PARAMS` | — | Дополнительные директивы nginx для gateway-локаций |
| `NGINX_LOCATION_API_ADDITIONAL_PARAMS` | — | Дополнительные директивы nginx для `/api` |

Полный список проксируемых путей — в [`nginx/templates/http-frontend.conf.template`](nginx/templates/http-frontend.conf.template).

## Авторизация

Провайдер выбирается автоматически на основе `FLAG_IS_DEMO_STAND`:

| `FLAG_IS_DEMO_STAND` | Провайдер | Зависимость |
|---|---|---|
| `false` | eAuth (Beeline) | `@beeline/lk-auth` (optional) |
| `true` | OIDC (Authentik) | `oidc-client-ts` |

### Режим eAuth (по умолчанию)

Использует пакет `@beeline/lk-auth` — **optional dependency**. Если пакет не установлен, webpack подключает заглушку [`src/features/auth/providers/lk-auth-stub.ts`](src/features/auth/providers/lk-auth-stub.ts), и авторизация через eAuth работать не будет.

В dev-режиме запросы к `/api/v1/auth` проксируются на eAuth-сервер, если в `public/env/env` задан `FLAG_EAUTH_PROXY_TARGET`:

```env
FLAG_EAUTH_URL='http://localhost:3000'
FLAG_EAUTH_PROXY_TARGET='https://eauth.example.com'
```

Логика прокси — в [`config/webpack/webpack.dev.js`](config/webpack/webpack.dev.js).

### Режим демо-стенда (OIDC)

Для open-source и автономного развёртывания рекомендуется:

```env
FLAG_IS_DEMO_STAND='true'
FLAG_AUTHENTIK_URL='https://your-authentik-instance'
FLAG_AUTHENTIK_CLIENT_ID='your-client-id'
```

Настройте OIDC-приложение в Authentik с redirect URI, совпадающим с URL фронтенда.

## Сборка

```bash
npm run build
```

Результат — статические файлы в директории `build/`, готовые к раздаче через nginx или любой статический хостинг с поддержкой SPA (fallback на `index.html`).

При сборке в `build/` также копируются:
- `env/` — файл конфигурации
- `docs/` — документация
- `templates/` — шаблоны

## Docker

```bash
# 1. Собрать фронтенд
npm run build

# 2. Собрать образ (build/ должна существовать)
docker build -t fdm-frontend .

# 3. Запустить контейнер
docker run -p 8080:8080 \
  -e FLAG_IS_DEMO_STAND=true \
  -e FLAG_AUTHENTIK_URL=https://authentik.example.com \
  -e FLAG_AUTHENTIK_CLIENT_ID=your-client-id \
  -e FLAG_API_URL= \
  -e FLAG_TEMPLATE_URL=https://templates.example.com \
  -e FLAG_DASHBOARD_URL=https://dashboard.example.com \
  -e NGINX_LOCATION_API_GATEWAY=http://gateway:8080 \
  fdm-frontend
```

Контейнер слушает порт **8080**, health-check доступен по `/actuator/health/liveness`.

## Структура проекта

```
├── config/webpack/       # Конфигурация Webpack (dev / prod)
├── nginx/                # Шаблоны nginx и скрипты для Docker
├── public/
│   ├── env/
│   │   ├── env.example   # Шаблон конфигурации (коммитится)
│   │   └── env           # Локальная конфигурация (не коммитится)
│   ├── docs/             # Статическая документация
│   └── index.html
├── src/
│   ├── api/              # HTTP-клиент и эндпоинты
│   ├── components/       # UI-компоненты
│   ├── features/         # Фичи (auth, theme, …)
│   ├── pages/            # Страницы приложения
│   │   ├── models/       # Модели ФДМ, приложения, паттерны, …
│   │   ├── cx/           # Customer Journey
│   │   ├── database/     # База знаний
│   │   ├── profile/      # Личный кабинет
│   │   └── admin/        # Администрирование
│   ├── router/           # Маршруты
│   └── styles/           # Глобальные стили и design tokens
├── Dockerfile
└── package.json
```

## Работа с API

В **development** запросы отправляются напрямую на `FLAG_API_URL` + префикс сервиса (например, `/api-gateway/`, `/cx/api/`).

В **production** используются относительные пути (`/api-gateway/`, `/product/api/` и т.д.), которые nginx проксирует на backend-сервисы.

Логика формирования URL — в [`src/api/const.ts`](src/api/const.ts).

## Установка зависимостей

Проект использует публичный npm registry. Файл [`.npmrc`](.npmrc) в репозитории может содержать ссылку на корпоративный registry — при open-source развёртывании удалите или замените его на стандартный:

```ini
registry=https://registry.npmjs.org/
```

Пакет `@beeline/lk-auth` не публикуется в открытый npm. Для работы без него используйте режим демо-стенда (`FLAG_IS_DEMO_STAND='true'`) с OIDC.

## Лицензия

Проект распространяется под лицензией [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Полный текст — в файле [`LICENSE.txt`](LICENSE.txt).
