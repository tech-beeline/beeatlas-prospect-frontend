import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { ButtonGroup, Skeleton } from 'components/ui';

import { useSnackbarStore } from 'widgets/Snackbar';

import { DEPLOYMENT_ENV_PARAM } from '../../const';
import { C4_COLORS } from '../Diagrams/types';

import { DeploymentCanvas } from './components';
import { ALL_ENVIRONMENTS, ALL_ENVIRONMENTS_LABEL } from './const';
import { useDeploymentGraph } from './hooks';
import type { IDeployment } from './types';
import * as S from './units';
import {
    buildDeploymentLayout,
    buildDeploymentSvgString,
    copyByBoxId,
    deploymentSvgFileName,
    dimmedBySelection,
    downloadSvgFile,
    isInsideSubtree,
    linksByInstanceId,
    readDeploymentExportPalette,
    rolesBySelection,
} from './utils';

/**
 * Вкладка «Развёртывание»: на каких deployment-окружениях развёрнут продукт
 * и что в них находится.
 *
 * Вид один и тот же на любой выбор — дерево рамок `DeploymentNode` с карточками
 * `ContainerInstance` внутри; меняется только отбор. Окружений у продукта может быть
 * несколько (у `FDMSHOWCASEAPP` — DEV и PROD), и они не совпадают с корнями дерева:
 * граница окружения проходит ВНУТРИ дерева, поэтому «все окружения» — не сумма видов,
 * а дерево целиком (см. `utils/environments.ts`).
 *
 * Выбранное окружение живёт в URL рядом с вкладкой (`?tab=DEPLOYMENT&cmdb=…&env=…`),
 * чтобы на вид можно было дать ссылку. Выделение и схлопывание — состояние компонента,
 * как и в прототипе: вместе с вкладкой они и размонтируются.
 */
export const Deployment: FC<IDeployment> = ({ cmdb }) => {
    const { resolution, nodes, instances, links, isLoading, error } = useDeploymentGraph({ cmdb });
    const [params, setParams] = useSearchParams();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [selected, setSelected] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());

    const paramEnv = params.get(DEPLOYMENT_ENV_PARAM);
    const environments = resolution.names;

    /**
     * Пустой параметр и незнакомое значение — это «окружение по умолчанию»: первое
     * в списке. Именно поэтому `?env=` в ссылке необязателен, а `env=ALL` — отдельное
     * значение: «все окружения» это выбор пользователя, а не отсутствие выбора.
     */
    const selectedEnv = useMemo(() => {
        if (paramEnv === ALL_ENVIRONMENTS) return null;
        if (paramEnv && environments.includes(paramEnv)) return paramEnv;
        return environments[0] ?? null;
    }, [environments, paramEnv]);

    const view = useMemo(() => {
        if (selectedEnv === null) return { nodes, instances };

        const { nodes: envNodes } = resolution.select(selectedEnv);
        const envNodeIds = new Set(envNodes.map((node) => node.id));
        // Экземпляр показывается вместе со своим узлом: карточка без рамки потеряла бы
        // место в дереве, а на диаграмме развёртывания место и есть содержание.
        const envInstances = instances.filter(
            (instance) => instance.parentId !== null && envNodeIds.has(instance.parentId),
        );

        return { nodes: envNodes, instances: envInstances };
    }, [instances, nodes, resolution, selectedEnv]);

    // Раскладка пересчитывается на смену окружения, данных и схлопывания — и НЕ зависит
    // от выделения: координаты при выделении не меняются, меняются прозрачность и фигуры.
    const layout = useMemo(
        () =>
            buildDeploymentLayout({
                environment: selectedEnv,
                nodes: view.nodes,
                instances: view.instances,
                collapsed,
            }),
        [collapsed, selectedEnv, view],
    );

    const linksById = useMemo(() => linksByInstanceId(links), [links]);
    const dimmed = useMemo(
        () => dimmedBySelection(layout.boxes, linksById, selected),
        [layout, linksById, selected],
    );
    const roles = useMemo(
        () => rolesBySelection(layout.boxes, links, selected),
        [layout, links, selected],
    );
    const copyById = useMemo(() => copyByBoxId(layout.boxes), [layout]);

    // Фигуры связи красятся цветом выделенного элемента, а не карточки: выемка отвечает
    // на вопрос «кто её зовёт» и обязана читаться одной обводкой с кольцом выделенной.
    const shapeColor = selected === null ? undefined : C4_COLORS.ContainerInstance;

    /**
     * Клик по элементу и выделяет, и копирует — одним действием, как в прототипе.
     * Копировать нечего (у карточки нет url и у узла нет адреса) — выделение всё равно
     * ставится, а подсказки нет: «скопировано» на пустом месте хуже молчания.
     */
    const onSelect = useCallback(
        (id: string) => {
            setSelected(id);
            const text = copyById.get(id);
            if (!text) return;
            void navigator.clipboard
                .writeText(text)
                .then(() => showSnackbar({ message: 'Ссылка скопирована' }))
                .catch(() => showSnackbar({ message: 'Не удалось скопировать' }));
        },
        [copyById, showSnackbar],
    );

    const onToggle = useCallback(
        (id: string) => {
            const willCollapse = !collapsed.has(id);
            setCollapsed((prev) => {
                const next = new Set(prev);
                if (willCollapse) next.add(id);
                else next.delete(id);
                return next;
            });
            // Выделение под схлопнутым узлом снимается: иначе оно осталось бы
            // на элементе, которого больше нет на полотне.
            if (
                willCollapse &&
                selected !== null &&
                isInsideSubtree(selected, id, nodes, instances)
            ) {
                setSelected(null);
            }
        },
        [collapsed, instances, nodes, selected],
    );

    // Escape снимает выделение — как в прототипе, слушатель на окне.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelected(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    /**
     * Выгрузка диаграммы в SVG. Краски берутся из токенов в момент клика, поэтому
     * в файле оказывается та тема, в которой диаграмма открыта; схлопнутые узлы
     * попадают в файл ровно так, как они стоят на полотне.
     *
     * Имя файла собирается из продукта и окружения: без них выгрузки разных продуктов
     * в одной папке не различить.
     */
    const onExportSvg = useCallback(() => {
        try {
            const svg = buildDeploymentSvgString(layout, readDeploymentExportPalette());
            downloadSvgFile(svg, deploymentSvgFileName(cmdb ?? '', selectedEnv));
            showSnackbar({ message: 'Диаграмма сохранена' });
        } catch {
            // Ронять вкладку из-за выгрузки нельзя: диаграмма важнее файла.
            showSnackbar({ message: 'Не удалось сохранить диаграмму' });
        }
    }, [cmdb, layout, selectedEnv, showSnackbar]);

    const onEnvSelect = (env: string) => {
        setParams({
            tab: params.get('tab') ?? '',
            cmdb: cmdb ?? '',
            [DEPLOYMENT_ENV_PARAM]: env,
        });
    };

    if (isLoading) {
        return <Skeleton height={480} style={{ width: '100%' }} radius={12} />;
    }

    if (error) {
        return (
            <S.StateContainer>
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Развёртывание не загрузилось"
                    text={error}
                />
            </S.StateContainer>
        );
    }

    if (nodes.length === 0) {
        return (
            <S.StateContainer>
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Развёртывание не описано"
                    text="У продукта нет узлов развёртывания в графе"
                />
            </S.StateContainer>
        );
    }

    return (
        <S.Container>
            <S.Toolbar>
                <ButtonGroup
                    alwaysSelected
                    size="small"
                    options={[
                        { label: ALL_ENVIRONMENTS_LABEL, id: ALL_ENVIRONMENTS },
                        ...environments.map((env) => ({ label: env, id: env })),
                    ]}
                    selectedOption={{ id: selectedEnv ?? ALL_ENVIRONMENTS }}
                    onChange={(option) => onEnvSelect(String(option.id))}
                />
            </S.Toolbar>
            <S.CanvasContainer>
                <DeploymentCanvas
                    layout={layout}
                    selected={selected}
                    dimmed={dimmed}
                    roles={roles}
                    shapeColor={shapeColor}
                    onSelect={onSelect}
                    onToggle={onToggle}
                    onClearSelection={() => setSelected(null)}
                    onExportSvg={onExportSvg}
                />
            </S.CanvasContainer>
        </S.Container>
    );
};
