import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BreadCrumbsItem } from 'features/maps';

import { Text } from 'components/core';
import { Breadcrumbs, ButtonGroup, Tab, Tabs } from 'components/ui';

import * as R from 'router/const';

import { Changes, Diagram, DiagramTable } from './components';
import { DisplayOptions, TABS, TabVariants } from './const';
import * as S from './units';

export const AppViewArchitecrurePage = () => {
    const [displayOption, setDisplayOption] = useState(DisplayOptions.CHANGES);
    const [tabVariant, setTabVariant] = useState<TabVariants>(TabVariants.CONTEXT_DIAGRAM);

    const [params] = useSearchParams();
    const versionsParam = params.get('v');
    const versionIds = versionsParam?.split(',') ?? [];

    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <Breadcrumbs>
                <BreadCrumbsItem
                    name="Каталог приложений"
                    index={1}
                    id={1}
                    onClick={() => {
                        navigate(`${R.MODELS_PATH}${R.APPS_PATH}`);
                    }}
                />
                <BreadCrumbsItem
                    name="B2C digital retail delivery catalog"
                    index={2}
                    id={2}
                    onClick={() => {
                        navigate(
                            `${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=ARCHITECTURE_CHANGES`,
                        );
                    }}
                />
                <BreadCrumbsItem name="" index={3} id={3} />
            </Breadcrumbs>
            <S.TitleContainer>
                <Text variant="h4">
                    {versionIds.length === 1 ? `Версия №${versionIds[0]}` : 'Сравнение версий'}
                </Text>
                {versionIds.length === 1 && (
                    <Text inactive variant="h4">
                        от 23.09.2024, 00:00
                    </Text>
                )}
            </S.TitleContainer>
            {versionIds.length === 2 && (
                <S.VersionsCard>
                    <div>
                        <Text variant="body2">Текущая версия №7</Text>
                        <Text inactive variant="body3">
                            от 23.09.2024, 00:00
                        </Text>
                    </div>
                    <S.Divider />
                    <div>
                        <Text variant="body2">Версия №6</Text>
                        <Text inactive variant="body3">
                            от 23.09.2024, 00:00
                        </Text>
                    </div>
                </S.VersionsCard>
            )}
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

            <S.ContentContainer>
                {versionIds.length === 1 && (
                    <>
                        {tabVariant === TabVariants.CONTEXT_DIAGRAM && <Diagram />}
                        {tabVariant === TabVariants.CONTAINER_DIAGRAM && <></>}
                        {tabVariant === TabVariants.DEPLOYMENT_DIAGRAM && <DiagramTable />}
                    </>
                )}
                {versionIds.length === 2 && (
                    <>
                        <ButtonGroup
                            alwaysSelected
                            selectedOption={{ id: displayOption }}
                            size="small"
                            options={[
                                {
                                    id: DisplayOptions.CHANGES,
                                    label: 'Изменения',
                                },
                                {
                                    id: DisplayOptions.DIAGRAM,
                                    label: 'Изменения на диаграмме',
                                },
                            ]}
                            onChange={(option) => setDisplayOption(option.id as DisplayOptions)}
                        />
                        {tabVariant === TabVariants.CONTEXT_DIAGRAM && <Changes />}
                    </>
                )}
            </S.ContentContainer>
        </S.PageWrapper>
    );
};
