import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Badge, Checkbox, IconButton } from 'components/ui';

import { ICatalogBusinessCapability, ICatalogTechnicalCapability } from 'api/queries/projects';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from '../../units';

const getRelevanceSemantic = (relevance: number) => {
    if (relevance < 50) return 'danger' as const;
    if (relevance < 80) return 'warning' as const;

    return 'success' as const;
};

interface ICatalogMatchGroupProps {
    businessCapability: ICatalogBusinessCapability;
    candidateId: string;
    selectedCapabilities: ICatalogTechnicalCapability[];
    manuallyAdded?: boolean;
    onSelect: (capability: ICatalogTechnicalCapability) => void;
}

export const CatalogMatchGroup: FC<ICatalogMatchGroupProps> = ({
    businessCapability,
    candidateId,
    selectedCapabilities,
    manuallyAdded = false,
    onSelect,
}) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <S.MatchGroup>
            <S.MatchGroupHeader>
                <div>
                    <S.MathGroupHeaderTitle>
                        <Text variant="h6">{businessCapability.name}</Text>
                        <Badge semantic={getRelevanceSemantic(businessCapability.relevance)}>
                            {businessCapability.relevance}%
                        </Badge>
                        <Text inactive variant="body3">
                            TC ({businessCapability.technicalCapabilities.length})
                        </Text>
                    </S.MathGroupHeaderTitle>
                    <Text inactive variant="body3">
                        {businessCapability.code}
                    </Text>
                </div>
                <IconButton
                    aria-expanded={expanded}
                    aria-label={
                        expanded ? 'Скрыть Technical Capability' : 'Показать Technical Capability'
                    }
                    iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                    size="large"
                    onClick={() => setExpanded((value) => !value)}
                />
            </S.MatchGroupHeader>
            {expanded && (
                <S.CatalogOptions>
                    {businessCapability.technicalCapabilities.map((capability) => {
                        const selected = selectedCapabilities.some(
                            ({ code }) => code === capability.code,
                        );

                        return (
                            <S.CatalogOption key={capability.id} $selected={selected}>
                                <S.CatalogOptionTitleContainer>
                                    <Checkbox
                                        checked={selected}
                                        name={`candidate-${candidateId}`}
                                        onChange={() => onSelect(capability)}
                                    />

                                    <div>
                                        <S.CatalogOptionTitle>
                                            <Text variant="h6">{capability.name}</Text>
                                            {manuallyAdded && (
                                                <Badge semantic="success" type="secondary">
                                                    Переиспользование
                                                </Badge>
                                            )}
                                            <Badge
                                                semantic={getRelevanceSemantic(
                                                    capability.relevance,
                                                )}
                                            >
                                                {capability.relevance}%
                                            </Badge>
                                        </S.CatalogOptionTitle>
                                        <Text inactive variant="body3">
                                            {capability.code}
                                        </Text>
                                    </div>
                                </S.CatalogOptionTitleContainer>
                                <Text inactive variant="body3">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: capability.description }}
                                    />
                                </Text>
                                <S.Systems>
                                    {capability.systems.map((system) => (
                                        <S.Tag key={system}>
                                            <Text variant="body3">{system}</Text>
                                        </S.Tag>
                                    ))}
                                </S.Systems>
                            </S.CatalogOption>
                        );
                    })}
                </S.CatalogOptions>
            )}
        </S.MatchGroup>
    );
};
