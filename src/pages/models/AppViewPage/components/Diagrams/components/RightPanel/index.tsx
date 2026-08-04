import React, { FC, useMemo } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Icon, TextField } from 'components/ui';
import { Chip } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { C4_COLORS } from '../../types';
import { PanelEdgeToggleButton } from '../../units';

import { RIGHT_PANEL_WIDTH, ROWS } from './const';
import { RightPanelProps } from './types';
import * as S from './units';
import { propertiesValueToText } from './utils';

export const RightPanel: FC<RightPanelProps> = ({
    selectedNode,
    onHide,
    selectedTags,
    newTag,
    onNewTagChange,
    onAddTag,
    onRemoveTag,
}) => {
    const mainLabel = selectedNode.labels[0];
    const nodeColor = C4_COLORS[mainLabel] || '#777';

    const nameLines =
        typeof selectedNode.name === 'string'
            ? selectedNode.name
                  .split('~')
                  .map((x) => x.trim())
                  .filter(Boolean)
            : [];
    const displayNameLines =
        nameLines.length > 0 ? nameLines : [formatNullableString(selectedNode.name)];

    const dedupedTags = useMemo(() => {
        const seen = new Set<string>();
        const out: string[] = [];
        selectedTags.forEach((t) => {
            const key = t.trim().toLowerCase();
            if (!key) return;
            if (seen.has(key)) return;
            seen.add(key);
            out.push(t.trim());
        });
        return out;
    }, [selectedTags]);

    return (
        <S.PanelShell width={RIGHT_PANEL_WIDTH}>
            <S.BorderCollapseHit side="right">
                <PanelEdgeToggleButton
                    type="button"
                    $surface="rightPanel"
                    onClick={onHide}
                    aria-label="Скрыть панель"
                >
                    <Icon size="medium" iconName={Icons.NavArrowRight} />
                </PanelEdgeToggleButton>
            </S.BorderCollapseHit>
            <S.Panel>
                <S.HeaderBlock>
                    <S.HeaderTop>
                        <S.TitleStack>
                            {displayNameLines.map((line, idx) => (
                                <Text key={`${idx}:${line}`} variant="h6">
                                    {formatNullableString(line)}
                                </Text>
                            ))}
                        </S.TitleStack>
                    </S.HeaderTop>
                    <S.TypeRow>
                        <S.TypeDot
                            style={{ '--node-type-color': nodeColor } as React.CSSProperties}
                        />
                        <S.TypeRowText>
                            <Text variant="body2">{formatNullableString(mainLabel)}</Text>
                        </S.TypeRowText>
                    </S.TypeRow>
                </S.HeaderBlock>

                <S.Body>
                    <S.PropertiesBlock>
                        {ROWS.map(({ label, getValue }) => (
                            <S.Row key={label}>
                                <Text inactive variant="body2">
                                    {label}
                                </Text>
                                <Text variant="body2">
                                    {formatNullableString(getValue(selectedNode) as string)}
                                </Text>
                            </S.Row>
                        ))}
                        {Object.entries(selectedNode.properties ?? {}).map(([key, value]) => (
                            <S.Row key={key}>
                                <Text inactive variant="body2">
                                    {key}
                                </Text>
                                <Text variant="body2">
                                    {formatNullableString(propertiesValueToText(value))}
                                </Text>
                            </S.Row>
                        ))}
                    </S.PropertiesBlock>

                    <S.TagsBlock>
                        <Text variant="body2">Теги</Text>

                        <S.TagControls>
                            <S.TagFieldWrap>
                                <TextField
                                    fullWidth
                                    value={newTag}
                                    size="small"
                                    placeholder="Новый тег"
                                    onChange={(e) => onNewTagChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            onAddTag();
                                        }
                                    }}
                                />
                            </S.TagFieldWrap>
                            <IconButton
                                size="small"
                                variant="outlined"
                                onClick={onAddTag}
                                disabled={!newTag.trim()}
                                iconName={Icons.Add}
                            />
                        </S.TagControls>

                        {dedupedTags.length ? (
                            <S.TagsList>
                                {dedupedTags.map((tag) => {
                                    const originalIndex = selectedTags.findIndex((t) => t === tag);
                                    return (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            endAdornment={
                                                <S.TagChipDelete
                                                    tabIndex={0}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onRemoveTag(originalIndex);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            onRemoveTag(originalIndex);
                                                        }
                                                    }}
                                                >
                                                    <Icon iconName={Icons.Close} size="small" />
                                                </S.TagChipDelete>
                                            }
                                        />
                                    );
                                })}
                            </S.TagsList>
                        ) : (
                            <S.TagsEmpty>
                                <Text inactive variant="body2">
                                    Тегов нет
                                </Text>
                            </S.TagsEmpty>
                        )}
                    </S.TagsBlock>
                </S.Body>
            </S.Panel>
        </S.PanelShell>
    );
};
