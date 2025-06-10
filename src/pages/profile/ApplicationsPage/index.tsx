import React, { FC, useState } from 'react';
import { Banner, Pagination, Search, Skeleton, Tab, Tabs } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import {
    ApplicationCard,
    SortingButton,
    SortingVariant,
    tabVaraintToNotFoundTextMap,
    TabVariant,
} from 'features/applications';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetApplicationsQuery } from 'api/queries/applications';

import { APPLICATIONS_PER_PAGE, availableStatusIdsForTab, TABS } from './const';
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

    const applicationsFiltered = applicationsSorted
        .filter((applcation) => availableStatusIdsForTab[tabVariant].includes(applcation.status.id))
        .filter(
            (application) =>
                application.name.toLowerCase().includes(search.toLowerCase()) ||
                String(application.id).includes(search),
        )
        .slice(startIndex, endIndex);

    const isEmpty = !isLoadingApplications && applicationsFiltered.length === 0;

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

                {isLoadingApplications &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={100} radius={12} />
                    ))}

                {applicationsFiltered.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                ))}

                {/* {Array.from({ length: 15 }).map((_, i) => ( */}
                {/*     <ApplicationCard key={i} /> */}
                {/* ))} */}

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
