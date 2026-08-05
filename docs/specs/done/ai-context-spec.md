Твоя задача — внедрить систему сбора контекста для LLM во всём frontend-приложении.

Ориентируйся на существующую реализацию:

```
feature/ai-context/page-context/AppViewPage
```

Используй её как эталон архитектуры.

Не меняй бизнес-логику приложения. Нужно только добавить поддержку AI-контекста.

---

## 1. Создание page-context для каждой страницы

Сначала найди все страницы приложения:

* route-level страницы;
* page components;
* основные контейнеры страниц;
* места, где используется `usePageContext`.

Для каждой страницы создай отдельную папку:

```
feature/ai-context/page-context/<PageName>
```

Структура должна соответствовать примеру `AppViewPage`.

Например:

```
feature/ai-context/page-context/ProductPage
├── index.ts
├── context.ts
├── types.ts
└── utils.ts (если нужен)
```

Внутри:

* создай конфигурацию страницы;
* определи `pageId`;
* добавь описание контекста страницы;
* используй существующие типы и утилиты из `feature/ai-context`.

Не создавай уникальные форматы. Все страницы должны иметь одинаковую структуру.

---

## 2. Регистрация страниц

После создания каждой страницы добавь её в:

```
feature/ai-context/utils/registry.ts
```

Используй существующий формат registry.

Пример:

```ts
export const PAGE_CONTEXT_REGISTRY = {
    appView: APP_VIEW_PAGE,
    product: PRODUCT_PAGE,
};
```

Каждая новая страница должна быть доступна через registry.

---

## 3. Добавление usePageContext

В каждой странице найди основной компонент входа.

Добавь:

```tsx
usePageContext({
    page: PAGE_CONTEXT_CONFIG,
    entityType,
    entityId,
    activeTab,
});
```

Где возможно:

* `entityType` — тип текущей сущности;
* `entityId` — id сущности;
* `activeTab` — текущий выбранный таб.

Если страница без сущности:

```tsx
usePageContext({
    page: PAGE_CONTEXT_CONFIG,
    activeTab,
});
```

---

## 4. Добавление useAdditionalPageContext

После подключения базового контекста найди места, где есть дополнительные данные:

### Таблицы

Для раскрывающихся строк:

```tsx
useAdditionalPageContext(
    `${entityName}-${entity.id}`,
    expanded
        ? {
              id: entity.id,
              name: entity.name,
              status: entity.status,
          }
        : null,
);
```

Контекст добавляется только когда сущность активна/раскрыта.

---

### Табы

Для каждого таба, где есть специфичные данные:

```tsx
useAdditionalPageContext(
    'tabName',
    {
        selectedValue,
        filters,
        settings,
    }
);
```

---

### Детальные страницы

Добавляй:

* выбранные параметры;
* текущий статус;
* настройки;
* пользовательский выбор.

Не добавляй:

* большие API response;
* технические поля;
* timestamps;
* внутренние флаги.

---

## 5. Правила ключей additionalContext

Ключи должны быть уникальными.

Нельзя:

```ts
useAdditionalPageContext('item', data)
```

Можно:

```ts
useAdditionalPageContext(
    `item-${item.id}`,
    data
)
```

Используй namespace:

```json
{
    "additionalContext": {
        "fitnessFunction-123": {},
        "productSettings": {}
    }
}
```

---

## 6. Проверка интеграции

После изменений проверь:

1. Каждая страница имеет свой page-context.
2. Каждая страница зарегистрирована в:

```
feature/ai-context/utils/registry.ts
```

3. На каждой странице вызывается:

```ts
usePageContext()
```

4. В динамических компонентах используется:

```ts
useAdditionalPageContext()
```

5. Несколько раскрытых сущностей не перезаписывают друг друга.

6. Контекст корректно очищается при уходе со страницы.

---

## 7. Финальный отчёт

После выполнения выведи:

1. Список созданных папок:

```
feature/ai-context/page-context/*
```

2. Изменения в:

```
feature/ai-context/utils/registry.ts
```

3. Список файлов, где добавлены:

```
usePageContext
useAdditionalPageContext
```

4. Пример итогового объекта:

```json
{
    "pageId": "...",
    "entity": {},
    "uiState": {},
    "additionalContext": {}
}
```
