/**
 * Cypher-запросы вкладки «Развёртывание» — перенесены из прототипа
 * (`experiments/beeline-diagrams/src/api/cypher.ts`).
 *
 * Собраны по образцу `Diagrams/utils/cypherBuilders.ts`: значения подставляются
 * экранированными (`escapeCypherString`), тег графа — предикатом `graphTagPredicate`,
 * комментариев и кириллицы в тексте нет вовсе. Последнее не стилистика: запрос уходит
 * заголовком `CYPHER-QUERY` (`api/graph/index.ts#getCypherQuery`), а тот схлопывает
 * переводы строк в пробел — `//` съел бы весь остаток запроса — и заменяет не-ASCII
 * на `?`, то есть русский комментарий превратился бы в мусор.
 *
 * Модель дерева — та же, что у диаграммы развёртывания в сервисе
 * (`DiagramService.recursiveConstructDnCiIn`): вложенность идёт по `:Child`, живые
 * рёбра версионируются (`endVersion IS NULL`), а окружение привязывается ребром
 * `(Environment)-[:Child]->(DeploymentNode)` к **любому** узлу дерева, не только
 * к корню. Поэтому привязки отдаются отдельной колонкой вместе с узлом, а «ближайший
 * предок» считается уже в TS (см. `environments.ts`).
 */

import type { GraphTag } from '../../Diagrams/types';
import { escapeCypherString, graphTagPredicate } from '../../Diagrams/utils';

import { ADDRESS_KEYS } from './address';

/**
 * Условие «это тот самый продукт». В графе у системы три имени: `cmdb` (код),
 * `name` (отображаемое) и `external_name`. Страница передаёт в `?cmdb=` алиас,
 * а движок диаграмм ищет по имени с запасным вариантом по алиасу — здесь оба
 * варианта перебираются одним условием, потому что промахнуться мимо любого
 * из трёх дешевле, чем не показать развёртывание вовсе.
 */
const productPredicate = (values: string[]): string => {
    const names = [...new Set(values.filter((value) => value.trim().length > 0))];
    if (names.length === 0) return 'false';

    return names
        .flatMap((name) => {
            const quoted = escapeCypherString(name);
            return [
                `toLower(coalesce(ss.cmdb, '')) = toLower('${quoted}')`,
                `toLower(coalesce(ss.name, '')) = toLower('${quoted}')`,
                `toLower(coalesce(ss.external_name, '')) = toLower('${quoted}')`,
            ];
        })
        .join(' OR ');
};

/**
 * Список адресных ключей — литералом. Параметров в заголовочном методе нет,
 * поэтому список подставляется текстом; ключи — наши же константы, экранировать
 * в них нечего.
 */
const addressKeysLiteral = (): string => `[${ADDRESS_KEYS.map((key) => `'${key}'`).join(', ')}]`;

/**
 * Дерево `DeploymentNode` продукта целиком — без фильтра по окружению: окружение
 * выбирается в селекторе, и ходить из-за этого в граф второй раз незачем.
 *
 * `parentId` ищется по `DeploymentNode`-родителю: у корневого узла продукта родитель —
 * сама `SoftwareSystem`, и для диаграммы он корневой. `ownEnvs` — имена окружений,
 * привязанных живым ребром к самому узлу (сырьё для правила «ближайший предок»).
 * `addressPairs` — свободные адресные свойства, отбор из них делает `pickAddresses`.
 */
export const buildDeploymentNodesQuery = (values: string[], tag: GraphTag): string => {
    return `
MATCH (ss:SoftwareSystem)
WHERE (${productPredicate(values)}) AND ${graphTagPredicate('ss', tag)}

MATCH ssPath = (ss)-[:Child*0..]->(dn:DeploymentNode)
WHERE dn.endVersion IS NULL
  AND all(rel IN relationships(ssPath) WHERE rel.endVersion IS NULL)

RETURN DISTINCT
  coalesce(dn.structurizr_dsl_identifier, toString(id(dn))) AS id,
  coalesce(dn.originalName, dn.name) AS name,
  [(p:DeploymentNode)-[pc:Child]->(dn) WHERE pc.endVersion IS NULL
   | coalesce(p.structurizr_dsl_identifier, toString(id(p)))][0] AS parentId,
  [(e:Environment)-[ec:Child]->(dn)
   WHERE ec.endVersion IS NULL AND e.name IS NOT NULL AND e.name <> '' | e.name] AS ownEnvs,
  toLower(coalesce(dn.type, '')) AS type,
  dn.technology AS technology,
  [k IN keys(dn)
   WHERE toLower(k) IN ${addressKeysLiteral()}
      OR toLower(k) STARTS WITH 'hostname'
      OR toLower(k) STARTS WITH 'ip'
   | [k, toString(dn[k])]] AS addressPairs
ORDER BY name, id
`.trim();
};

/**
 * Экземпляры контейнеров продукта целого дерева, тоже без фильтра по окружению.
 *
 * Технология, url и id контейнера лежат на `Container`, а не на его экземпляре,
 * и достаются через `:Deploy`. Контейнер выбирается детерминированно
 * (`head(collect(c))` по сортировке): у одного экземпляра их может быть два,
 * и без сортировки карточка получила бы то одно значение, то другое.
 *
 * `containerId` — ключ счётчика «×N»: имя для счёта не годится, в графе есть
 * системы, где одно видимое имя носят два разных `Container`.
 */
export const buildDeploymentInstancesQuery = (values: string[], tag: GraphTag): string => {
    return `
MATCH (ss:SoftwareSystem)
WHERE (${productPredicate(values)}) AND ${graphTagPredicate('ss', tag)}

MATCH ciPath = (ss)-[:Child*0..]->(dn:DeploymentNode)-[:Child]->(ci:ContainerInstance)
WHERE dn.endVersion IS NULL AND ci.endVersion IS NULL
  AND all(rel IN relationships(ciPath) WHERE rel.endVersion IS NULL)

OPTIONAL MATCH (c:Container)-[cd:Deploy]->(ci)
WHERE cd.endVersion IS NULL

WITH ci, dn, c
ORDER BY coalesce(c.structurizr_dsl_identifier, c.name, '')
WITH ci, dn, head(collect(c)) AS c

RETURN DISTINCT
  coalesce(ci.structurizr_dsl_identifier, toString(id(ci))) AS id,
  ci.name AS name,
  coalesce(dn.structurizr_dsl_identifier, toString(id(dn))) AS parentId,
  coalesce(split(c.name, '~')[0], split(ci.name, '~')[0]) AS containerName,
  coalesce(c.technology, ci.technology) AS technology,
  coalesce(c.url, ci.url) AS url,
  coalesce(c.structurizr_dsl_identifier, toString(id(c))) AS containerId
ORDER BY name, id
`.trim();
};

/**
 * Связи между экземплярами контейнеров — источник приглушения и фигур связи.
 *
 * Уровень именно `ContainerInstance`, а не `Container`: карточкой нарисован
 * экземпляр, и вопрос «кто с кем связан» задаётся его id. Выбор не косметический —
 * у части систем связей уровня `Container` внутри дерева нет вовсе: у KIBANA их 0
 * против 681 связи у экземпляров.
 *
 * Связь направленная (`-[r:Relationship]->`): `from` — вызывающий, `to` — вызываемый.
 * По ней карточка получает фигуру — выемку, если её зовёт выделенный, или выпуклость,
 * если она зовёт выделенного. Приглушение направления не смотрит: оно симметризует
 * пары, поэтому «кто кого зовёт» решает форму карточки, но не то, что гаснет.
 */
export const buildDeploymentLinksQuery = (values: string[], tag: GraphTag): string => {
    return `
MATCH (ss:SoftwareSystem)
WHERE (${productPredicate(values)}) AND ${graphTagPredicate('ss', tag)}

MATCH ciPath = (ss)-[:Child*0..]->(dn:DeploymentNode)-[:Child]->(ci:ContainerInstance)
WHERE dn.endVersion IS NULL AND ci.endVersion IS NULL
  AND all(rel IN relationships(ciPath) WHERE rel.endVersion IS NULL)
WITH collect(DISTINCT ci) AS instances

MATCH (a:ContainerInstance)-[r:Relationship]->(b:ContainerInstance)
WHERE a IN instances AND b IN instances
  AND a.endVersion IS NULL AND b.endVersion IS NULL
  AND r.endVersion IS NULL

RETURN DISTINCT
  coalesce(a.structurizr_dsl_identifier, toString(id(a))) AS from,
  coalesce(b.structurizr_dsl_identifier, toString(id(b))) AS to
`.trim();
};
