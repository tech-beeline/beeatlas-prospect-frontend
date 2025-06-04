import React, { FC, useState } from 'react';
import { Pagination, Search, Skeleton, Tab, Tabs } from '@beeline/design-system-react';
import {
    ApplicationCard,
    SortingButton,
    SortingVariant,
    tabVaraintToNotFoundTextMap,
    TabVariant,
} from 'features/applications';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetArchitectApplicationsQuery } from 'api/queries/applications';

import { APPLICATIONS_PER_PAGE, availableStatusIdsForTab, TABS } from './const';
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

    const architectApplicationsData =
        tabVariant === TabVariant.AWAITING_EXECUTOR
            ? allApplicationsData?.nobody
            : allApplicationsData?.executor;

    const applicationsSorted = (architectApplicationsData ?? []).sort((a, b) =>
        sortingVariant === SortingVariant.ASC
            ? // @ts-ignore
              new Date(a.createDate) - new Date(b.createDate)
            : // @ts-ignore
              new Date(b.createDate) - new Date(a.createDate),
    );

    const applicationsFiltered = applicationsSorted
        .filter((application) =>
            availableStatusIdsForTab[tabVariant].includes(application.status.id),
        )
        .filter(
            (application) =>
                application.name.toLowerCase().includes(search.toLowerCase()) ||
                String(application.id).includes(search),
        )
        .slice(startIndex, endIndex);

    const isEmpty = !isLoadingArchitectApplications && applicationsFiltered.length === 0;

    return (
        <S.PageWrapper>
            <S.Container>
                <Text variant="h4">Согласование заявок</Text>

                <S.TabsContainer>
                    <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.value === tabVariant)}>
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                label={tab.label}
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

                {applicationsFiltered.length > APPLICATIONS_PER_PAGE && (
                    <S.PaginationContainer>
                        <Pagination
                            collapsed
                            count={Math.ceil(applicationsFiltered.length / APPLICATIONS_PER_PAGE)}
                            page={page}
                            onChange={setPage}
                        />
                    </S.PaginationContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
