/**
 * Окружение узла развёртывания — по ближайшему предку.
 *
 * В графе окружение привязывается ребром `(Environment)-[:Child]->(DeploymentNode)`
 * к **любому** узлу дерева, а не только к корню: на стенде живых привязок на внутренних
 * узлах в разы больше, чем на корнях. Поэтому «окружение корня» — не свойство дерева,
 * а упрощение, которое ломается, как только граница окружения проходит внутри дерева:
 * у `FDMSHOWCASEAPP` корень один и он DEV, но 58 из 120 узлов его поддерева привязаны
 * к PROD, и граница проходит по узлу внутри дерева.
 *
 * Правило одно: узел принадлежит окружениям, привязанным **к нему самому**, а если
 * своих привязок нет — окружениям ближайшего предка с привязками. Узел, над которым
 * привязок нет вовсе, не принадлежит ничему и в выбор окружения не попадает —
 * в режиме «все окружения» он, как и раньше, виден.
 *
 * Считается это в TS, а не в Cypher: «ближайший предок» через переменный путь читался
 * бы куда хуже, а дерево на систему небольшое (сотни узлов).
 */

/** Минимум, который нужен от узла дерева: своя привязка и родитель. */
export interface IEnvNode {
    id: string;
    parentId: string | null;
    /** Окружения, привязанные к самому узлу живым ребром (колонка `ownEnvs`). */
    ownEnvs: string[];
}

export interface IEnvResolution<T extends IEnvNode> {
    /** Все окружения дерева, по алфавиту — они же варианты в селекторе. */
    names: string[];
    /** Окружения узла: свои, иначе унаследованные от ближайшего предка. */
    envsOf: Map<string, string[]>;
    /**
     * Узлы выбранного окружения и корни его вида — те, чей родитель в окружение
     * не входит. Именно их оборачивает рамка окружения: у вида по окружению корней
     * может быть несколько, и они не совпадают с корнями дерева.
     */
    select: (env: string) => { nodes: T[]; rootIds: string[] };
}

export const resolveEnvironments = <T extends IEnvNode>(nodes: T[]): IEnvResolution<T> => {
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const memo = new Map<string, string[]>();

    /** Окружения ближайшего предка (или самого узла), у которого есть привязки. */
    const resolve = (id: string): string[] => {
        const cached = memo.get(id);
        if (cached) return cached;

        const walked: string[] = [];
        let found: string[] = [];
        let current: string | null = id;

        while (current) {
            const hit = memo.get(current);
            if (hit) {
                found = hit;
                break;
            }

            const node: T | undefined = byId.get(current);
            if (!node) break;

            walked.push(current);
            if (node.ownEnvs.length > 0) {
                found = [...new Set(node.ownEnvs)].sort((a, b) => a.localeCompare(b));
                break;
            }
            // Граф — дерево, но защита от цикла дешевле, чем зависший рендер.
            if (node.parentId !== null && walked.includes(node.parentId)) break;
            current = node.parentId;
        }

        walked.forEach((walkedId) => memo.set(walkedId, found));
        return found;
    };

    const envsOf = new Map<string, string[]>();
    nodes.forEach((node) => envsOf.set(node.id, resolve(node.id)));

    const names = [...new Set(nodes.flatMap((node) => envsOf.get(node.id) ?? []))].sort((a, b) =>
        a.localeCompare(b),
    );

    const select = (env: string): { nodes: T[]; rootIds: string[] } => {
        const kept = nodes.filter((node) => (envsOf.get(node.id) ?? []).includes(env));
        const keptIds = new Set(kept.map((node) => node.id));
        // Родитель может остаться за границей окружения — тогда узел сам становится
        // корнем вида. parentId при этом не переписываем: раскладка и так считает
        // корнем всё, чьего родителя нет во входе.
        const rootIds = kept
            .filter((node) => !node.parentId || !keptIds.has(node.parentId))
            .map((node) => node.id);
        return { nodes: kept, rootIds };
    };

    return { names, envsOf, select };
};
