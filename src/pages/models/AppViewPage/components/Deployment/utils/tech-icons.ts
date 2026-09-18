/**
 * Библиотека иконок технологий — перенесена из прототипа
 * (`experiments/beeline-diagrams/src/lib/tech-icons.ts`).
 *
 * Знаки взяты из simple-icons (CC0-1.0): путь в сетке 24×24 и фирменный hex —
 * именно фирменный цвет и делает знак узнаваемым. Данные лежат рядом, в
 * `tech-icons-data.ts`, а не в пакете: корпоративный Nexus проксирует npm без
 * simple-icons, и зависимость роняла сборку на `npm install`. В файле данных ровно
 * те 45 знаков, что нужны диаграмме, — это тот же allow-list, что был в импортах.
 *
 * Три знака нарисованы в обход набора:
 *
 * * redis — с версии 13 в simple-icons лежит знак 2024 года: тонкая «птичка»,
 *   которая в 14 px заголовка читается как случайная закорючка. Здесь оставлен
 *   классический знак из набора ≤ 12 (три слоя, как у стека).
 * * neo4j — знак из simple-icons залит сплошным контуром и в 14 px слипается
 *   в пятно. Здесь знак из devicon (MIT), его два пути склеены в один (у нас
 *   одна заливка — фирменный цвет технологии), а сетка 128×128.
 * * unknown — нейтральный глиф «технология не распознана».
 *
 * Технология в графе — свободный текст: «Spring, Java 17», «.NET Core, C#, Docker»,
 * «Lua, Tarantool 2», «JAVA», «PostgreSQL 14». Поэтому точного равенства мало,
 * а подстрочный поиск даёт ложные срабатывания — 'go' находится внутри 'django'
 * и 'mongo'. Разбираем строку на слова и ищем совпадение окнами от трёх слов
 * к одному: так 'apache kafka' выигрывает у одиночного 'apache'.
 *
 * Чего в наборе нет (Oracle, MS SQL Server, Tarantool, WebLogic, COBOL, HAProxy,
 * IIS, Windows, S3) — уходит на FALLBACK_ICON: показать «технология не распознана»
 * честнее, чем подставить чужой знак. Родственные замены внутри одного стека
 * сделаны явно: C# и ASP.NET считаются .NET, RedOS и Unix — Linux, а компоненты
 * VictoriaMetrics (vminsert / vmstorage / vmselect) — самой VictoriaMetrics.
 */
import { SIMPLE_ICON_SOURCES } from './tech-icons-data';

export interface TechIcon {
    /** Ключ, под которым иконка ходит по раскладке. */
    id: string;
    /** Название знака из simple-icons — справочное. */
    title: string;
    /**
     * Как называть технологию в подсказке. Обычно совпадает с названием знака,
     * но не всегда: у Java знак — OpenJDK, а у C# — .NET.
     */
    label: string;
    /** Путь в сетке `grid`×`grid`. */
    path: string;
    /** Сторона сетки, в которой нарисован путь: у simple-icons — 24. */
    grid: number;
    /** Фирменный цвет, уже с '#'. */
    hex: string;
}

/**
 * Знаки набора: id → иконка. Список id — и есть allow-list, и он же задаёт порядок
 * обхода в файле данных (от баз данных к инфраструктуре).
 */
const SIMPLE_ICON_IDS = [
    'postgresql',
    'mongodb',
    'clickhouse',
    'opensearch',
    'elasticsearch',
    'minio',
    'doris',
    'victoriametrics',
    'ceph',
    'kafka',
    'rabbitmq',
    'spark',
    'airflow',
    'java',
    'kotlin',
    'python',
    'go',
    'dotnet',
    'cplusplus',
    'c',
    'scala',
    'php',
    'javascript',
    'typescript',
    'lua',
    'spring',
    'springboot',
    'react',
    'angular',
    'vue',
    'nodejs',
    'quarkus',
    'fastapi',
    'docker',
    'kubernetes',
    'nginx',
    'tomcat',
    'linux',
    'ubuntu',
    'vmware',
    'openstack',
    'argo',
    'gitlab',
    'grafana',
    'prometheus',
];

/** Иконка набора по id: сетка у simple-icons всегда 24×24. */
const simpleIcon = (id: string): TechIcon => {
    const source = SIMPLE_ICON_SOURCES[id];
    return {
        id,
        title: source.title,
        label: source.label,
        path: source.path,
        grid: 24,
        hex: source.hex,
    };
};

/** Классический знак Redis (simple-icons 12, CC0-1.0): три слоя стека. */
const REDIS_PATH =
    'M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.121 2.077-.208-1.61-.613.426-1.017-1.578.519zm6.905 2.077L13.76 6.182l3.292 1.298.353-.146 3.293-1.298zm-10.51.312a2.97 1.153 0 0 0-2.97 1.152 2.97 1.153 0 0 0 2.97 1.153 2.97 1.153 0 0 0 2.97-1.153 2.97 1.153 0 0 0-2.97-1.152zM24 6.805s-8.983 4.278-10.395 4.953c-1.226.561-1.901.561-3.261.094C8.318 11.022 0 7.241 0 7.241v1.038c0 .24.332.499.966.8 1.277.613 8.34 3.677 9.45 4.206 1.112.53 1.9.54 3.313-.197 1.412-.738 8.049-3.905 9.326-4.57.654-.342.945-.602.945-.84zm-10.042.602L8.39 8.26l3.884 1.61zM24 10.637s-8.983 4.279-10.395 4.954c-1.226.56-1.901.56-3.261.093C8.318 14.854 0 11.074 0 11.074v1.038c0 .238.332.498.966.8 1.277.612 8.34 3.676 9.45 4.205 1.112.53 1.9.54 3.313-.197 1.412-.737 8.049-3.905 9.326-4.57.654-.332.945-.602.945-.84zm0 3.842l-10.395 4.954c-1.226.56-1.901.56-3.261.094C8.318 18.696 0 14.916 0 14.916v1.038c0 .239.332.499.966.8 1.277.613 8.34 3.676 9.45 4.206 1.112.53 1.9.54 3.313-.198 1.412-.737 8.049-3.904 9.326-4.569.654-.343.945-.613.945-.841z';

/** Знак Neo4j из devicon (MIT): два пути набора склеены в один — заливка у нас одна. */
const NEO4J_PATH =
    'M63.333 32.567c-5.2.866-9.566 3-12.833 6.266-3.867 3.867-5.833 8.5-6.5 15.367-.3 3.133-.467 15.467-.2 15.467.067 0 .7-.234 1.4-.534 1.633-.7 5.167-.7 7-.033l1.4.5.167-8.033c.166-8.567.366-9.867 1.966-13.067 1.1-2.133 3.767-4.633 6.034-5.667 2.6-1.2 6.4-1.666 9.333-1.2 6.267 1.034 10 4.434 11.567 10.5.633 2.434.666 3.7.666 17.1v14.434H93.4L93.233 67.9c-.1-14.9-.166-15.9-.866-18.567-1.9-7.4-6.5-12.766-12.934-15.2-3.433-1.3-6.7-1.8-11.2-1.766-2.233.033-4.433.133-4.9.2z ' +
    'M22.733 57.2c-2.866 1.433-4.4 4-4.4 7.467 0 1.1.2 2.5.467 3.133.633 1.567 2.433 3.467 4 4.3 1.9 1 5.5 1 7.367.033l1.366-.7 4.267 2.9 4.267 2.934V81.7L35.8 84.633l-4.3 2.934-1.1-.667c-1.6-.933-4.7-1.133-6.6-.4-2 .767-4.067 2.6-4.833 4.333-.834 1.767-.834 5.234 0 7 .7 1.567 2.333 3.3 3.8 4.067.6.3 2.033.6 3.233.7 2.8.2 5.167-.733 6.867-2.733 1.366-1.6 2.266-4.4 2.033-6.334l-.167-1.366 4.3-2.9 4.3-2.9 1.534.7c2.333 1 5.8.766 8-.567 2.4-1.5 3.6-3.633 3.733-6.633.1-2.1 0-2.567-.833-4.2-2.167-4.134-7-5.7-11.134-3.634l-1.233.6-4.233-2.9-4.234-2.9-.1-2.333c-.066-2.8-.866-4.6-2.833-6.233-2.5-2.134-6.233-2.567-9.267-1.067z';

/** Иконки по id. Порядок — от баз данных к инфраструктуре. */
export const TECH_ICONS: Record<string, TechIcon> = {
    ...Object.fromEntries(SIMPLE_ICON_IDS.map((id) => [id, simpleIcon(id)])),
    // Два знака нарисованы в обход набора — почему именно, сказано в шапке файла.
    redis: {
        id: 'redis',
        title: 'Redis',
        label: 'Redis',
        path: REDIS_PATH,
        grid: 24,
        hex: '#DC382D',
    },
    neo4j: {
        id: 'neo4j',
        title: 'Neo4j',
        label: 'Neo4j',
        path: NEO4J_PATH,
        grid: 128,
        hex: '#018BFF',
    },
    // Третий знак не из набора: «технология не распознана». Чип: ножки
    // по сторонам и корпус с окном кристалла; контуры обходят в противоположных
    // направлениях, поэтому окно вырезается обычным правилом nonzero.
    unknown: {
        id: 'unknown',
        title: 'технология не распознана',
        label: 'технология не распознана',
        path:
            'M7 3h2v4H7zM11 3h2v4h-2zM15 3h2v4h-2zM7 17h2v4H7zM11 17h2v4h-2zM15 17h2v4h-2z' +
            'M3 7h4v2H3zM3 11h4v2H3zM3 15h4v2H3zM17 7h4v2h-4zM17 11h4v2h-4zM17 15h4v2h-4z' +
            'M6 6h12v12H6zM9 9v6h6V9z',
        grid: 24,
        // Цвет нейтрального глифа — приглушённый текст портала, а не фирменный.
        hex: 'currentColor',
    },
};

export const FALLBACK_ICON = TECH_ICONS.unknown!;

/**
 * Фразы → id иконки. Ключ — нормализованные слова через пробел, поэтому
 * многословные ключи обязательны: без них «.NET Core», «Spring Boot», «k8s pod»
 * развалились бы на бессмысленные токены.
 *
 * Шумовые слова (pod, cluster, namespace, server, service, db, ee, web, api, zone,
 * vm, topic, replicaset, standby, baremetal) в таблицу не входят — они просто
 * не дают совпадения. Отсутствующие технологии (oracle, mssql, tarantool, weblogic,
 * cobol) тоже дают null: иконки для них нет.
 */
const ALIASES: Record<string, string> = {
    // Данные и хранилища
    postgresql: 'postgresql',
    postgres: 'postgresql',
    postgre: 'postgresql',
    redis: 'redis',
    mongodb: 'mongodb',
    mongo: 'mongodb',
    clickhouse: 'clickhouse',
    opensearch: 'opensearch',
    elasticsearch: 'elasticsearch',
    elastic: 'elasticsearch',
    neo4j: 'neo4j',
    minio: 'minio',
    doris: 'doris',
    'apache doris': 'doris',
    victoriametrics: 'victoriametrics',
    vminsert: 'victoriametrics',
    vmstorage: 'victoriametrics',
    vmselect: 'victoriametrics',
    ceph: 'ceph',

    // Брокеры и обработка
    kafka: 'kafka',
    'apache kafka': 'kafka',
    rabbitmq: 'rabbitmq',
    rabbit: 'rabbitmq',
    spark: 'spark',
    'apache spark': 'spark',
    airflow: 'airflow',
    'apache airflow': 'airflow',

    // Языки и рантаймы
    java: 'java',
    jvm: 'java',
    openjdk: 'java',
    kotlin: 'kotlin',
    python: 'python',
    go: 'go',
    golang: 'go',
    'c#': 'dotnet',
    '.net': 'dotnet',
    net: 'dotnet',
    dotnet: 'dotnet',
    'net core': 'dotnet',
    'net.core': 'dotnet',
    'asp.net': 'dotnet',
    'c++': 'cplusplus',
    cpp: 'cplusplus',
    c: 'c',
    scala: 'scala',
    php: 'php',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    lua: 'lua',

    // Фреймворки
    'spring boot': 'springboot',
    springboot: 'springboot',
    spring: 'spring',
    react: 'react',
    angular: 'angular',
    vue: 'vue',
    vue3: 'vue',
    'vue.js': 'vue',
    node: 'nodejs',
    'node.js': 'nodejs',
    nodejs: 'nodejs',
    quarkus: 'quarkus',
    fastapi: 'fastapi',

    // Платформа и инфраструктура
    docker: 'docker',
    kubernetes: 'kubernetes',
    k8s: 'kubernetes',
    pod: 'kubernetes',
    nginx: 'nginx',
    tomcat: 'tomcat',
    'apache tomcat': 'tomcat',
    linux: 'linux',
    unix: 'linux',
    // RedOS — отечественный дистрибутив Linux; своего знака в simple-icons нет.
    redos: 'linux',
    ubuntu: 'ubuntu',
    vmware: 'vmware',
    vsphere: 'vmware',
    openstack: 'openstack',
    argo: 'argo',
    argocd: 'argo',
    gitlab: 'gitlab',
    grafana: 'grafana',
    prometheus: 'prometheus',
};

/** Версии, счётчики и прочие токены, которые не могут быть технологией. */
const isNoise = (token: string): boolean => /^\d/.test(token) || /^v\.?\d/.test(token);

/**
 * Строка технологии → слова, готовые к поиску по таблице. Разделители списков
 * и путей («/», «,», «;», скобки, «+», «:») становятся пробелами, у слова срезается
 * ведущая и хвостовая пунктуация — но не «#» и не внутренняя точка, иначе «c#»,
 * «node.js» и «asp.net» перестали бы опознаваться.
 */
const tokenize = (raw: string): string[] =>
    raw
        .toLowerCase()
        .replace(/[/,;()[\]{}|+&:]/g, ' ')
        .split(/\s+/)
        .map((token) => token.replace(/^[.\-_~]+/, '').replace(/[.\-_~]+$/, ''))
        .filter((token) => token.length > 0 && !isNoise(token));

/** Самое длинное осмысленное название технологии — три слова («apache kafka»). */
const MAX_PHRASE_WORDS = 3;

/**
 * Технология из графа → иконка. null, если ничего не опознали: решение
 * о нейтральном глифе принимает вызывающий код.
 */
export const matchTechnology = (raw: string | null | undefined): TechIcon | null => {
    if (!raw) return null;
    const words = tokenize(raw);

    // От длинных окон к коротким: «apache kafka» должно выиграть у «apache».
    for (let size = MAX_PHRASE_WORDS; size >= 1; size -= 1) {
        for (let i = 0; i + size <= words.length; i += 1) {
            const id = ALIASES[words.slice(i, i + size).join(' ')];
            if (id) return TECH_ICONS[id] ?? null;
        }
    }
    return null;
};

/**
 * Иконка для подписи: распознанная, нейтральный глиф для нераспознанной и null,
 * если технологии нет вовсе — пустой слот не рисуется.
 */
export const resolveTechnology = (raw: string | null | undefined): TechIcon | null => {
    if (!raw || raw.trim() === '') return null;
    return matchTechnology(raw) ?? FALLBACK_ICON;
};

/** Иконка по id из раскладки. */
export const iconById = (id: string): TechIcon | undefined => TECH_ICONS[id];
