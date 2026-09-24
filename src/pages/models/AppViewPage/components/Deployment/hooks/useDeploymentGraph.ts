/**
 * Данные вкладки «Развёртывание»: окружения продукта, его дерево и связи экземпляров.
 *
 * Все три запроса уходят один раз на продукт — **без** выбранного окружения.
 * Окружение отбирается уже в TS (`resolveEnvironments`), поэтому переключение селектора
 * не ходит в граф: и список окружений, и принадлежность каждого узла считаются
 * из одного ответа.
 *
 * Осознанное отличие от вкладки «Диаграммы»: там состояние графа живёт в контроллере
 * с историей переходов и пинами, потому что диаграмма интерактивна (проваливание в узел,
 * кратчайшие пути). Здесь у диаграммы один вид на продукт, а состояние — это выбранное
 * окружение и схлопнутые узлы.
 */

import { useEffect, useMemo, useState } from 'react';

import { useGetCypherQuery } from 'api/queries/graph';
import { useGetProductInfoByCmdbQuery } from 'api/queries/product';

import { DEPLOYMENT_GRAPH_TAG } from '../const';
import type { IDeployment, IDeploymentInstance, IDeploymentLink, IDeploymentNode } from '../types';
import {
    type IEnvResolution,
    buildDeploymentInstancesQuery,
    buildDeploymentLinksQuery,
    buildDeploymentNodesQuery,
    parseDeploymentInstances,
    parseDeploymentLinks,
    parseDeploymentNodes,
    resolveEnvironments,
} from '../utils';

export interface IUseDeploymentGraphResult {
    /** Окружения дерева и отбор по ним — тот же модуль, что и в прототипе. */
    resolution: IEnvResolution<IDeploymentNode>;
    nodes: IDeploymentNode[];
    instances: IDeploymentInstance[];
    /** Связи экземпляров: из них считаются приглушение и фигуры связи. */
    links: IDeploymentLink[];
    isLoading: boolean;
    error: string | null;
}

export const useDeploymentGraph = ({ cmdb }: IDeployment): IUseDeploymentGraphResult => {
    const [nodes, setNodes] = useState<IDeploymentNode[]>([]);
    const [instances, setInstances] = useState<IDeploymentInstance[]>([]);
    const [links, setLinks] = useState<IDeploymentLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { mutateAsync: executeCypher } = useGetCypherQuery();

    // Тот же запрос, что делает страница для заголовка: react-query отдаёт его из кэша,
    // лишнего обращения к продукт-сервису не происходит.
    const { data: product, isLoading: isLoadingProduct } = useGetProductInfoByCmdbQuery(cmdb);

    // Продукт ищем по имени и по алиасу: в `?cmdb=` страница кладёт alias, а в графе
    // у системы три имени — `cmdb`, `name` и `external_name`, и совпадать с alias
    // может любое из них.
    const values = useMemo(
        () =>
            [...new Set([product?.name, product?.alias, cmdb])].filter(
                (value): value is string => !!value && value.trim().length > 0,
            ),
        [product?.name, product?.alias, cmdb],
    );
    const valuesKey = values.join('|');

    useEffect(() => {
        if (isLoadingProduct || valuesKey.length === 0) return;

        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [nodeRows, instanceRows, linkRows] = await Promise.all([
                    executeCypher(buildDeploymentNodesQuery(values, DEPLOYMENT_GRAPH_TAG)),
                    executeCypher(buildDeploymentInstancesQuery(values, DEPLOYMENT_GRAPH_TAG)),
                    executeCypher(buildDeploymentLinksQuery(values, DEPLOYMENT_GRAPH_TAG)),
                ]);

                if (cancelled) return;
                setNodes(parseDeploymentNodes(nodeRows));
                setInstances(parseDeploymentInstances(instanceRows));
                setLinks(parseDeploymentLinks(linkRows));
            } catch (e) {
                if (cancelled) return;
                setError(
                    e instanceof Error ? e.message : 'Ошибка загрузки диаграммы развёртывания',
                );
                setNodes([]);
                setInstances([]);
                setLinks([]);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        void load();

        return () => {
            cancelled = true;
        };
        // Зависимость — ключ массива значений: сам массив пересобирается на каждом рендере.
    }, [executeCypher, isLoadingProduct, valuesKey]);

    const resolution = useMemo(() => resolveEnvironments(nodes), [nodes]);

    return {
        resolution,
        nodes,
        instances,
        links,
        isLoading: isLoadingProduct || isLoading,
        error,
    };
};
