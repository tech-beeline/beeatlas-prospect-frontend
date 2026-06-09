import React, { FC, useState } from 'react';
import {
    ApplicationCard,
    SortingButton,
    SortingVariant,
    tabVaraintToNotFoundTextMap,
    TabVariant,
} from 'features/applications';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Search } from 'components/ui';
import { Banner, Pagination, Skeleton, Tab, Tabs } from 'components/ui';

import { useGetApplicationsQuery } from 'api/queries/applications';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { APPLICATIONS_PER_PAGE, availableStatusAliasesForTab, TABS } from './const';
import * as S from './units';

export const ApplicationsPage: FC = () => {
    const [showBanner, setShowBanner] = useState(true);

    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * APPLICATIONS_PER_PAGE;
    const endIndex = page * APPLICATIONS_PER_PAGE;

    const [tabVariant, setTabVariant] = useState(TabVariant.ACTIVE);
    const [sortingVariant, setSortingVariant] = useState<SortingVariant>(SortingVariant.DESC);
    const [search, setSearch] = useState('');

    const { data: applicationsData, isLoading: isLoadingApplications } = useGetApplicationsQuery({
        enabled: true,
    });

    const applicationsSorted = (applicationsData ?? []).sort((a, b) =>
        sortingVariant === SortingVariant.ASC
            ? // @ts-ignore
              new Date(a.createDate) - new Date(b.createDate)
            : // @ts-ignore
              new Date(b.createDate) - new Date(a.createDate),
    );

    const activeApplicationsCount = applicationsData?.filter((application) =>
        availableStatusAliasesForTab[TabVariant.ACTIVE].includes(application.status.alias),
    ).length;

    const reviewedApplicationsCount = applicationsData?.filter((application) =>
        availableStatusAliasesForTab[TabVariant.REVIEWED].includes(application.status.alias),
    ).length;

    const tabVariantToCount: Record<string, number | undefined> = {
        [TabVariant.ACTIVE]: activeApplicationsCount,
        [TabVariant.REVIEWED]: reviewedApplicationsCount,
    };

    const applicationsFiltered = applicationsSorted
        .filter((application) =>
            availableStatusAliasesForTab[tabVariant].includes(application.status.alias),
        )
        .filter(
            (application) =>
                application.name.toLowerCase().includes(search.toLowerCase()) ||
                String(application.id).includes(search),
        )
        .slice(startIndex, endIndex);

    const isEmpty = !isLoadingApplications && applicationsFiltered.length === 0;

    const pagesCount = Math.ceil((tabVariantToCount[tabVariant] ?? 0) / APPLICATIONS_PER_PAGE);

    return (
        <S.PageWrapper>
            <S.Container>
                <Text variant="h4">Мои заявки</Text>

                {showBanner && (
                    <Banner
                        iconName={Icons.InfoCircled}
                        title="Обработка заявки происходит в два этапа. Сначала назначается исполнитель — этот процесс занимает до 3 рабочих дней с момента подачи заявки. После того как заявка будет принята в работу, решение по ней будет принято в течение 2 рабочих дней"
                        color="info"
                        onClose={() => setShowBanner(false)}
                    />
                )}

                <S.TabsContainer>
                    <Tabs
                        key={JSON.stringify(tabVariantToCount)}
                        selectedTabIndex={TABS.findIndex((tab) => tab.value === tabVariant)}
                    >
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                label={
                                    tab.label +
                                    (tabVariantToCount[tab.value]
                                        ? ` (${tabVariantToCount[tab.value]})`
                                        : '')
                                }
                                value={tab.value}
                                onClick={(v) => setTabVariant(v)}
                            />
                        ))}
                    </Tabs>
                </S.TabsContainer>

                <S.FiltersContainer>
                    <S.SearchContainer>
                        <Search
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClear={() => setSearch('')}
                            placeholder="Введите название или номер заявки"
                            size="small"
                        />
                    </S.SearchContainer>

                    <SortingButton
                        sortingVariant={sortingVariant}
                        setSortingVariant={setSortingVariant}
                    />
                </S.FiltersContainer>

                {isLoadingApplications &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={100} radius={12} />
                    ))}

                {applicationsFiltered.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                ))}

                {isEmpty && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Заявок нет"
                            text={tabVaraintToNotFoundTextMap[tabVariant]}
                        />
                    </S.NotFoundContainer>
                )}

                {pagesCount > 1 && (
                    <S.PaginationContainer>
                        <Pagination collapsed count={pagesCount} page={page} onChange={setPage} />
                    </S.PaginationContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
