import React, { FC, useMemo } from 'react';

import { Text } from 'components/core';
import { Checkbox, Icon, Search } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { C4_COLORS } from '../../types';
import { PanelEdgeToggleButton } from '../../units';
import { mainLabel, nodeDisplayName } from '../../utils';

import { LEFT_PANEL_WIDTH } from './const';
import { LeftPanelProps } from './types';
import * as S from './units';
import { filterNodesByName, sortNodesByDisplayName } from './utils';

export const LeftPanel: FC<LeftPanelProps> = ({
    labels,
    typeVisibility,
    onTypeVisibilityChange,
    filterValue,
    onFilterChange,
    nodes,
    selectedNodeId,
    onNodeClick,
    onClose,
}) => {
    const displayedNodes = useMemo(() => sortNodesByDisplayName(nodes), [nodes]);
    const filteredDisplayedNodes = useMemo(
        () => filterNodesByName(displayedNodes, filterValue),
        [displayedNodes, filterValue],
    );

    return (
        <S.PanelShell width={LEFT_PANEL_WIDTH}>
            <S.BorderCollapseHit side="left">
                <PanelEdgeToggleButton
                    type="button"
                    $surface="leftPanel"
                    onClick={onClose}
                    aria-label="Скрыть панель"
                >
                    <Icon size="medium" iconName={Icons.NavArrowLeft} />
                </PanelEdgeToggleButton>
            </S.BorderCollapseHit>
            <S.SidePanel>
                <S.PanelCard>
                    <Text variant="h6">Типы</Text>
                    <S.TypeList>
                        {labels.map((label) => (
                            <Checkbox
                                key={label}
                                label={
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            paddingLeft: 8,
                                            color: C4_COLORS[label] || '#777',
                                            fontFamily: '"JetBrains Mono", monospace',
                                        }}
                                    >
                                        [{label}]
                                    </span>
                                }
                                type="indeterminate"
                                checked={typeVisibility[label]}
                                onChange={(event) =>
                                    onTypeVisibilityChange(label, event.target.checked)
                                }
                            />
                        ))}
                    </S.TypeList>
                </S.PanelCard>

                <Search
                    fullWidth
                    value={filterValue}
                    onChange={(event) => onFilterChange(event.target.value)}
                    placeholder="Фильтр по имени узла"
                    size="small"
                />
                <S.NodesWrap>
                    {filteredDisplayedNodes.map((node) => {
                        const label = mainLabel(node.labels);
                        const color = C4_COLORS[label] || '#777';

                        return (
                            <S.NodeButton
                                key={node.id}
                                type="button"
                                onClick={() => onNodeClick(node)}
                                selected={selectedNodeId === node.id}
                            >
                                <Text
                                    variant="body3"
                                    style={{ color, fontFamily: '"JetBrains Mono", monospace' }}
                                >
                                    [{label}]
                                </Text>
                                <Text variant="body1">{nodeDisplayName(node)}</Text>
                            </S.NodeButton>
                        );
                    })}
                </S.NodesWrap>
            </S.SidePanel>
        </S.PanelShell>
    );
};
