import React, { FC } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Button, IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { implementationSourceMeta } from '../../const';
import { ImplementationSourceType } from '../../types';

import { E2ECalls, ManualCalls, UseCaseCalls } from './components';
import { ISourceSideBlock } from './types';
import * as S from './units';

export const SourceSideBlock: FC<ISourceSideBlock> = ({
    source,
    biStepCode,
    biStepId,
    onClose,
    onEditManual,
    onOpenDiagram,
}) => {
    const isManual = source?.type === ImplementationSourceType.MANUAL;
    const hasManualCalls =
        source?.type === ImplementationSourceType.MANUAL && source.relations.length > 0;

    return (
        <SideBlock hasBackdrop isOpen={Boolean(source)} onClose={onClose} large>
            {source && (
                <S.Container>
                    <S.Content>
                        <S.Header>
                            <S.TitleWrapper>
                                <S.SideBlockTitle>
                                    {source.type === ImplementationSourceType.E2E
                                        ? `Шаг E2E-сценария (${source.e2e.source})`
                                        : implementationSourceMeta[source.type].label}
                                </S.SideBlockTitle>
                                {!isManual && (
                                    <Text variant="body3" inactive>
                                        Ручная настройка невозможна. Только чтение — изменить можно
                                        в источнике
                                    </Text>
                                )}
                            </S.TitleWrapper>
                            <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                        </S.Header>

                        {isManual && <Text variant="subtitle2">Вызовы</Text>}
                        {source.type === ImplementationSourceType.MANUAL && hasManualCalls && (
                            <ManualCalls
                                relations={source.relations}
                                biStepId={biStepId}
                                onEdit={(relationId) => onEditManual({ mode: 'edit', relationId })}
                                onOpenDiagram={onOpenDiagram}
                            />
                        )}
                        {isManual && !hasManualCalls && (
                            <Text variant="body3" inactive>
                                Ручных вызовов нет
                            </Text>
                        )}
                        {source.type === ImplementationSourceType.USE_CASE && (
                            <UseCaseCalls useCase={source.useCase} />
                        )}
                        {source.type === ImplementationSourceType.E2E && (
                            <E2ECalls e2e={source.e2e} biStepCode={biStepCode} />
                        )}
                    </S.Content>

                    {isManual && (
                        <S.ButtonContainer>
                            <Button type="button" variant="outlined" onClick={onClose}>
                                Закрыть
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => onEditManual({ mode: 'add' })}
                            >
                                Добавить вызов
                            </Button>
                        </S.ButtonContainer>
                    )}
                </S.Container>
            )}
        </SideBlock>
    );
};
