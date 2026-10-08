import React, { FC, useState } from 'react';
import { useSideSheetStore } from 'features/cx/store';

import { Text } from 'components/core';
import { ClampedText } from 'components/interaction';
import { Icon } from 'components/ui';

import { SideSheetVariants } from 'pages/cx/CJPage/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { SourceSideBlock } from './components';
import { implementationSourceMeta } from './const';
import { IImplementationSources, ImplementationSource } from './types';
import * as S from './units';
import { getImplementationSources } from './utils';

export const ImplementationSources: FC<IImplementationSources> = ({ biStep, onOpenDiagram }) => {
    const [selectedSource, setSelectedSource] = useState<ImplementationSource | null>(null);
    const toggleSideSheet = useSideSheetStore((state) => state.toggleSideSheet);

    const sources = getImplementationSources(biStep);

    const handleEditManual = () => {
        setSelectedSource(null);
        toggleSideSheet(SideSheetVariants.EDIT_SCENARIO_BI, biStep.id);
    };

    if (sources.length === 0) {
        return (
            <S.EmptyContainer>
                <Text inactive variant="body3">
                    У шага сценария BI нет реализаций
                </Text>
            </S.EmptyContainer>
        );
    }

    return (
        <>
            <S.SourceList>
                {sources.map((source) => (
                    <S.SourceItem
                        key={source.key}
                        type="button"
                        onClick={() => setSelectedSource(source)}
                    >
                        <S.SourceText>
                            <Text variant="caption" inactive>
                                {implementationSourceMeta[source.type].label}
                            </Text>
                            <Text variant="subtitle3">
                                <ClampedText
                                    text={source.name}
                                    tooltipId={`source-${biStep.id}-${source.key}`}
                                    noArrow
                                    place="top"
                                    offset={8}
                                />
                            </Text>
                        </S.SourceText>
                        <Icon iconName={Icons.NavArrowRight} />
                    </S.SourceItem>
                ))}
            </S.SourceList>
            <SourceSideBlock
                source={selectedSource}
                biStepCode={biStep.uniqueIdent}
                onClose={() => setSelectedSource(null)}
                onEditManual={handleEditManual}
                onOpenDiagram={onOpenDiagram}
            />
        </>
    );
};
