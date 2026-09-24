/**
 * Адрес узла развёртывания — перенесено из прототипа
 * (`experiments/beeline-diagrams/src/lib/address.ts`).
 *
 * В графе адрес — не одно свойство, а десятки свободных, и они гуляют по регистру
 * и суффиксам: KIBANA пишет `ip`/`host`/`url`, SPN — `IP`/`Hostname`/`Hostname1`,
 * глобально встречаются `FQDN`/`fqdn`, `HostName`, `hostname1…14`, `IP_0`, `IP1…3`.
 * Поэтому Cypher отдаёт сырьё — пары «ключ, значение», — а отбор идёт здесь: так
 * правило видно и его можно проверить на синтетике.
 *
 * Порядок предпочтения: сначала то, что человек введёт в браузер или скопирует
 * (fqdn), затем имя хоста, и лишь потом сетевой адрес.
 *
 * **`url` — запасной вариант, а не адрес.** У 141 узла стенда он есть, и это адрес
 * приложения (`https://<ingress-хост>`) или строка подключения к БД. Пока url стоял
 * первым по приоритету, он вытеснял из полосы настоящий host/ip: узел показывал
 * адресом собственное имя со схемой. Но и вовсе без url узел остаётся без адреса
 * там, где url — его единственное адресное поле (в `EAFDMMART-DEV` таких 47 из 60):
 * это ингрессы, у которых host/ip нет вовсе. Поэтому url берётся **только тогда,
 * когда ничего другого не нашлось**.
 */
export const ADDRESS_KEYS = [
    'address',
    'fqdn',
    'hostname',
    'host',
    'endpoint',
    'ip',
    'external_ip',
    'public_ip',
    'local_ip',
    'ingress_ip',
    'sshalias',
    /** Отбирается отдельно, только если перечисленного выше нет. */
    'url',
] as const;

/** Ключ-запасной вариант: годится в адрес, лишь когда настоящего адреса нет. */
const FALLBACK_KEY = 'url';

/** Пара «ключ свойства, значение» в том виде, в каком её отдаёт Cypher. */
export type AddressPair = [string, string];

/** Ключ → база и числовой суффикс: `hostname12` → { hostname, 12 }, `IP_0` → { ip, 0 }. */
const splitKey = (key: string): { base: string; suffix: number } => {
    const lower = key.toLowerCase();
    const matched = /^([a-z_]*?)(\d+)$/.exec(lower);
    if (!matched) return { base: lower, suffix: 0 };
    // `ip_0` и `ip0` должны свестись к одной базе.
    return { base: matched[1]!.replace(/[_-]+$/, ''), suffix: Number(matched[2]) };
};

/** Позиция ключа в порядке предпочтения; -1 — ключ адресом не считается. */
const priority = (base: string): number => (ADDRESS_KEYS as readonly string[]).indexOf(base);

/** Сравнение значений и имён — без регистра и хвостовых пробелов. */
const same = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

/**
 * Адреса узла: не больше `max` значений, в порядке предпочтения ключей.
 *
 * Значение, совпадающее с именем узла, пропускается — оно уже показано в заголовке
 * рамки, и повторять его второй раз значит тратить место впустую. У 136 узлов KIBANA
 * имя узла и есть его hostname, поэтому правило не теоретическое. Если с именем
 * совпадают все значения, адреса у узла нет.
 */
export const pickAddresses = (
    pairs: AddressPair[] | undefined,
    nodeName: string,
    max = 2,
): string[] => {
    // Список может прийти и пустым, и отсутствующим (узел без адресных свойств) —
    // для селектора это одно и то же: адресов нет.
    const candidates = (pairs ?? [])
        .map(([key, value]) => {
            const { base, suffix } = splitKey(key);
            return { base, suffix, priority: priority(base), value };
        })
        .filter((candidate) => candidate.priority >= 0 && candidate.value.trim() !== '')
        // Порядок: предпочтение ключа, затем номер варианта, затем значение —
        // чтобы `hostname1` шёл перед `hostname2`, а результат не зависел от обхода графа.
        .sort(
            (a, b) =>
                a.priority - b.priority || a.suffix - b.suffix || a.value.localeCompare(b.value),
        );

    const take = (list: typeof candidates): string[] => {
        const picked: string[] = [];
        for (const candidate of list) {
            if (picked.length >= max) break;
            if (same(candidate.value, nodeName)) continue;
            if (picked.some((value) => same(value, candidate.value))) continue;
            picked.push(candidate.value.trim());
        }
        return picked;
    };

    // Настоящие адреса — всё, кроме url: имя хоста и сетевой адрес.
    const real = take(candidates.filter((candidate) => candidate.base !== FALLBACK_KEY));
    if (real.length > 0) return real;
    // Настоящих нет — тогда ссылка: у 47 узлов из 60 в `EAFDMMART-DEV` это
    // единственное адресное поле, и без него узел остался бы без адреса вовсе.
    return take(candidates.filter((candidate) => candidate.base === FALLBACK_KEY));
};

/** Строка адреса для полосы рамки и подсказки. */
export const addressLine = (addresses: string[]): string => addresses.join(' · ');
