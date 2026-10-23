import React, { FC, useState } from 'react';

import { Button } from 'components/ui';

import { SourceCard, SourceSideBlock } from './components';
import { IImplementationSources, ImplementationSourceType } from './types';
import * as S from './units';
import { getImplementationSources } from './utils';

export const ImplementationSources: FC<IImplementationSources> = ({
    biStep,
    onOpenDiagram,
    onEditManual,
}) => {
    const [selectedSourceKey, setSelectedSourceKey] = useState<string | null>(null);

    const sources = getImplementationSources(biStep);

    const selectedSource =
        sources.find((source) => source.key === selectedSourceKey) ??
        (selectedSourceKey === 'manual'
            ? {
                  key: 'manual',
                  type: ImplementationSourceType.MANUAL as const,
                  name: 'Реализация, настроенная вручную',
                  relations: biStep.relations ?? [],
              }
            : null);

    return (
        <>
            <S.SourceList>
                {sources.map((source) => (
                    <SourceCard
                        key={source.key}
                        source={source}
                        biStepId={biStep.id}
                        onClick={() => setSelectedSourceKey(source.key)}
                    />
                ))}
                {!biStep.relations?.length && (
                    <Button
                        type="button"
                        variant="outlined"
                        fullWidth
                        onClick={() => onEditManual({ mode: 'initial' })}
                    >
                        Добавить реализацию вручную
                    </Button>
                )}
            </S.SourceList>
            <SourceSideBlock
                source={selectedSource}
                biStepCode={biStep.uniqueIdent}
                biStepId={biStep.id}
                onClose={() => setSelectedSourceKey(null)}
                onEditManual={onEditManual}
                onOpenDiagram={onOpenDiagram}
            />
        </>
    );
};
