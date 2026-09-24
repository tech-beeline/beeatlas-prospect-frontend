/**
 * Русское склонение для строки счётчиков схлопнутого узла — перенесено из прототипа
 * (`experiments/beeline-diagrams/src/lib/plural.ts`). Нужно ровно в одном месте,
 * но вынесено отдельно: строка на экране должна читаться человеком, а не «12 узлов ·
 * 0 контейнеров».
 */

const FORMS: Record<string, [string, string, string]> = {
    узлы: ['узел', 'узла', 'узлов'],
    контейнеры: ['контейнер', 'контейнера', 'контейнеров'],
};

/** Слово в нужной форме: `plural(2, 'узлы')` → «узла». */
export const plural = (n: number, kind: keyof typeof FORMS | string): string => {
    const forms = FORMS[kind as string] ?? ['', '', ''];
    const abs = Math.abs(n) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return forms[2];
    if (last > 1 && last < 5) return forms[1];
    if (last === 1) return forms[0];
    return forms[2];
};

/**
 * Строка счётчиков схлопнутого узла: «12 узлов · 40 контейнеров».
 *
 * Нулевая часть опускается: «0 контейнеров» ничего не сообщает, а место занимает.
 * Узел схлопывается только когда под ним есть вложенные узлы, поэтому первая
 * часть есть всегда.
 */
export const collapseCountsText = (nestedNodes: number, nestedContainers: number): string => {
    const parts: string[] = [];
    if (nestedNodes > 0) parts.push(`${nestedNodes} ${plural(nestedNodes, 'узлы')}`);
    if (nestedContainers > 0)
        parts.push(`${nestedContainers} ${plural(nestedContainers, 'контейнеры')}`);
    return parts.join(' · ');
};
