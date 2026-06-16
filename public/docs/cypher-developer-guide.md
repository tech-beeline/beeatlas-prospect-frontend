# Руководство для разработчиков Cypher-запросов

## 1. Подстановка Jinja: `{{ cmdb }}`

В шаблонах используйте `{{ cmdb }}` для кода системы. При рендеринге он заменяется на фактическое значение (ARFIX, LCR и т.д.):

```cypher
WHERE start.cmdb = '{{ cmdb }}' AND start.graphTag = 'Global'
```

---

## 2. UNION ALL вместо сложных условий

Вместо одного запроса с множеством `WHERE`/`CASE WHEN` — разбивайте на несколько простых и объединяйте через `UNION ALL`:

```cypher
MATCH (...) WHERE ... RETURN end.name AS name, rel.technology AS details
UNION ALL
MATCH (...) WHERE ... RETURN end.name AS name, rel.technology AS details
```

Преимущества: читаемость, проще отладка, сервис валидирует каждый фрагмент отдельно. Все подзапросы должны возвращать одинаковое число колонок с совместимыми типами.

---

## 3. Формат вывода: две колонки

Результат — **таблица с двумя колонками**: найденный объект и его описание.

```cypher
RETURN <объект> AS name, <описание> AS description
```

Примеры алиасов: `name`/`object`/`element` и `description`/`details`/`info`.