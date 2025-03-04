import React, { FC, useState } from 'react';
import { Pagination, Search, Tab, Tabs } from '@beeline/design-system-react';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { ApplicationCard, SortingButton } from './components';
import {
    REVIEWER_TABS,
    SortingVariant,
    tabVaraintToNotFoundTextMap,
    TabVariant,
    USER_TABS,
} from './const';
import { IApplicationsPage } from './types';
import * as S from './units';

const isEmpty = false;

export const ApplicationsPage: FC<IApplicationsPage> = ({ review }) => {
    const [page, setPage] = useState(1);
    const [tabVariant, setTabVariant] = useState(
        review ? TabVariant.AWAITING_EXECUTOR : TabVariant.ACTIVE,
    );
    const [sortingVariant, setSortingVariant] = useState<SortingVariant>(SortingVariant.DESC);
    const [search, setSearch] = useState('');

    return (
        <S.PageWrapper>
            <S.Container>
                <Text variant="h4">{review ? 'Согласование заявок' : 'Мои заявки'}</Text>

                <S.TabsContainer>
                    <Tabs
                        selectedTabIndex={(review ? REVIEWER_TABS : USER_TABS).findIndex(
                            (tab) => tab.value === tabVariant,
                        )}
                    >
                        {(review ? REVIEWER_TABS : USER_TABS).map((tab) => (
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
                            placeholder="Введите название, номер заявки или домен"
                            size="small"
                        />
                    </S.SearchContainer>

                    <SortingButton
                        sortingVariant={sortingVariant}
                        setSortingVariant={setSortingVariant}
                    />
                </S.FiltersContainer>

                {Array.from({ length: 15 }).map((_, i) => (
                    <ApplicationCard key={i} />
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

                <S.PaginationContainer>
                    <Pagination collapsed count={15} page={page} onChange={setPage} />
                </S.PaginationContainer>
            </S.Container>
        </S.PageWrapper>
    );
};
