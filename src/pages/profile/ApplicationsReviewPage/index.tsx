import React, { FC, useEffect, useState } from 'react';
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
import { Pagination, Skeleton, Tab, Tabs } from 'components/ui';

import { useGetArchitectApplicationsQuery } from 'api/queries/applications';

import { APPLICATIONS_PER_PAGE, availableStatusAliasesForTab, TABS } from './const';
import * as S from './units';

export const ApplicationsReviewPage: FC = () => {
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * APPLICATIONS_PER_PAGE;
    const endIndex = page * APPLICATIONS_PER_PAGE;

    const [tabVariant, setTabVariant] = useState(TabVariant.AWAITING_EXECUTOR);
    const [sortingVariant, setSortingVariant] = useState<SortingVariant>(SortingVariant.DESC);
    const [search, setSearch] = useState('');

    const { data: allApplicationsData, isLoading: isLoadingArchitectApplications } =
        useGetArchitectApplicationsQuery({
            enabled: true,
        });

    useEffect(() => {
        setPage(1);
    }, [allApplicationsData]);

    const architectApplicationsData =
        tabVariant === TabVariant.AWAITING_EXECUTOR
            ? allApplicationsData?.nobody
            : allApplicationsData?.executor;

    const awaitingExecutorApplicationsCount = allApplicationsData?.nobody?.length;

    const awaitingDesicionApplicationsCount = allApplicationsData?.executor?.filter((application) =>
        availableStatusAliasesForTab[TabVariant.AWAITING_DECISION].includes(
            application.status.alias,
        ),
    ).length;

    const historyApplicationsCount = allApplicationsData?.executor?.filter((application) =>
        availableStatusAliasesForTab[TabVariant.HISTORY].includes(application.status.alias),
    ).length;

    const tabVariantToCount: Record<string, number | undefined> = {
        [TabVariant.AWAITING_EXECUTOR]: awaitingExecutorApplicationsCount,
        [TabVariant.AWAITING_DECISION]: awaitingDesicionApplicationsCount,
        [TabVariant.HISTORY]: historyApplicationsCount,
    };

    const applicationsSorted = (architectApplicationsData ?? []).sort((a, b) =>
        sortingVariant === SortingVariant.ASC
            ? // @ts-ignore
              new Date(a.createDate) - new Date(b.createDate)
            : // @ts-ignore
              new Date(b.createDate) - new Date(a.createDate),
    );

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

    const isEmpty = !isLoadingArchitectApplications && applicationsFiltered.length === 0;

    const pagesCount = Math.ceil((tabVariantToCount[tabVariant] ?? 0) / APPLICATIONS_PER_PAGE);

    return (
        <S.PageWrapper>
            <S.Container>
                <Text variant="h4">Согласование заявок</Text>

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

                {isLoadingArchitectApplications &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={100} radius={12} />
                    ))}

                {applicationsFiltered.map((application) => (
                    <ApplicationCard review key={application.id} application={application} />
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
