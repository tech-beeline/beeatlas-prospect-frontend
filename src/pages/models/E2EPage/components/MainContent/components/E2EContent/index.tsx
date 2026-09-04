import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdditionalPageContext } from 'features/ai-context/hooks';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Button, Icon, Skeleton, Tab, Tabs } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';
import { useGetE2EPlantUmlFileVersionsQuery } from 'api/queries/staging-service';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { CallsContent, EditE2ESideblock, HistoryTable, RelatedCJs } from './components';
import { TABS, TabVariants } from './const';
import { IE2EContent } from './types';
import * as S from './units';

export const E2EContent: FC<IE2EContent> = ({ activeBiStep }) => {
    const [tabVariant, setTabVariant] = useState<TabVariants>(TabVariants.CALLS);
    const navigate = useNavigate();

    const { modalOpened, openModal, closeModal } = useModal();

    const { data: plantUmlVersions, isLoading: isPlantUmlVersionsLoading } =
        useGetE2EPlantUmlFileVersionsQuery(activeBiStep.id);
    const showImportSuccess = Boolean(plantUmlVersions?.length);

    useAdditionalPageContext('e2eContentTab', tabVariant);

    const { data, isLoading } = useGetSequenceCallsByIdQuery(activeBiStep.code);

    return (
        <>
            <S.TitleContainer>
                <Text variant="h4">{activeBiStep.name}</Text>
                <S.ButtonContainer>
                    <Button
                        size="small"
                        startIcon={<Icon iconName={Icons.Edit} />}
                        data-tooltip-id="edit-button"
                        onClick={openModal}
                    />
                    <TooltipContainer noArrow id="edit-button" place={'top-end' as any}>
                        Редактировать название
                    </TooltipContainer>
                    <Button
                        size="small"
                        startIcon={<Icon iconName={Icons.Import} />}
                        data-tooltip-id="import-button"
                        onClick={() =>
                            navigate({
                                pathname: `${R.MODELS_PATH}${R.E2E_PATH}${R.IMPORT_PATH}`,
                                search: new URLSearchParams({
                                    id: String(activeBiStep.id),
                                    code: activeBiStep.code,
                                }).toString(),
                            })
                        }
                    />
                    <TooltipContainer noArrow id="import-button" place={'top-end' as any}>
                        Импортировать PlantUML
                    </TooltipContainer>
                </S.ButtonContainer>
            </S.TitleContainer>
            <S.TabsContainer>
                <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.id === tabVariant)}>
                    {TABS.map((tab) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            value={tab.id}
                            onClick={() => setTabVariant(tab.id)}
                        />
                    ))}
                </Tabs>
            </S.TabsContainer>
            {isPlantUmlVersionsLoading && tabVariant === TabVariants.CALLS && (
                <Skeleton height={420} radius={12} />
            )}
            {!isPlantUmlVersionsLoading && showImportSuccess && tabVariant === TabVariants.CALLS && (
                <S.ImportSuccess>
                    <NotFoundBlock
                        setMinSize={false}
                        smallImage
                        imageVariant={ImageVariants.CHECK}
                        title="Данные загружены"
                        text="PlantUML импортирован. Отчёт можно посмотреть в истории загрузок"
                    />
                </S.ImportSuccess>
            )}
            {!isPlantUmlVersionsLoading &&
                !showImportSuccess &&
                tabVariant === TabVariants.CALLS && (
                    <CallsContent data={data} isLoading={isLoading} />
                )}
            {tabVariant === TabVariants.RELATED_CJS && (
                <RelatedCJs biStepCode={activeBiStep.biStepCode} />
            )}
            {tabVariant === TabVariants.HISTORY && (
                <HistoryTable
                    versions={plantUmlVersions ?? []}
                    isLoading={isPlantUmlVersionsLoading}
                    e2eCode={activeBiStep.code}
                />
            )}
            <EditE2ESideblock data={data} isOpen={modalOpened} onClose={closeModal} />
        </>
    );
};
