import React, { FC, useState } from 'react';

import { IconButton } from 'components/ui';
import { Button, Search, Skeleton } from 'components/ui';

import { useGetBICollectionQuery } from 'api/queries/bi';
import { useDebounce } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { Stage } from '../../types';
import * as S from '../../units';

import { EmptySearch } from './components';
import { IBiSelect } from './types';

export const BiSelect: FC<IBiSelect> = ({ setStage, setSelectedBiId, selectedBiIds, onClose }) => {
    const [search, setSearch] = useState('');
    const [selectedTab] = useState(0);

    const debouncedSearch = useDebounce(search);

    const { data, isLoading } = useGetBICollectionQuery({ search: debouncedSearch });

    const filteredData = (data ?? []).filter((bi) => !selectedBiIds.includes(bi.id));

    const productSearchBis = filteredData.filter((bi) => !bi.communal);
    const communalSearchBis = filteredData.filter((bi) => bi.communal);

    return (
        <S.FlexContainer>
            <S.Content hasButtons>
                <S.FlexWrapper>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(Stage.SETTINGS)}
                        />
                        <S.SideBlockTitle>Выбор BI для этапа</S.SideBlockTitle>
                    </S.TitleFlexWrapper>

                    <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                </S.FlexWrapper>

                {/* <S.TabsContainer>
                    <S.TabsStyled selectedTabIndex={selectedTab} onChange={setSeletedTab}>
                        <Tab label="Продуктовые" />
                        <Tab label="Коммунальные" />
                    </S.TabsStyled>
                </S.TabsContainer>*/}

                <S.TextFieldContainer>
                    <Search
                        fullWidth
                        placeholder="Номер или название"
                        value={search}
                        maxLength={400}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                    />
                </S.TextFieldContainer>

                <S.BIContainer>
                    {selectedTab === 0 &&
                        productSearchBis.map((bi, index) => (
                            <S.BIFlexWrapper data-testid={`${index}ProductBI`} key={bi.id}>
                                <div>
                                    <S.Body2>{bi.name}</S.Body2>
                                    <S.Body3>{bi.uniqueIdent}</S.Body3>
                                </div>
                                <IconButton
                                    iconName={Icons.NavArrowRight}
                                    size="large"
                                    onClick={() => {
                                        setSelectedBiId(bi.id);
                                        setStage(Stage.BIVIEW);
                                    }}
                                />
                            </S.BIFlexWrapper>
                        ))}

                    {selectedTab === 1 &&
                        communalSearchBis.map((bi, index) => (
                            <S.BIFlexWrapper data-testid={`${index}CommunalBI`} key={bi.id}>
                                <div>
                                    <S.Body2>{bi.name}</S.Body2>
                                    <S.Body3>{bi.uniqueIdent}</S.Body3>
                                </div>
                                <IconButton
                                    iconName={Icons.NavArrowRight}
                                    size="large"
                                    onClick={() => {
                                        setSelectedBiId(bi.id);
                                        setStage(Stage.BIVIEW);
                                    }}
                                />
                            </S.BIFlexWrapper>
                        ))}

                    {isLoading && (
                        <S.SkeletonContainer>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} height={40} radius={10} />
                            ))}
                        </S.SkeletonContainer>
                    )}

                    {!isLoading &&
                        ((selectedTab === 0 && productSearchBis.length === 0) ||
                            (selectedTab === 1 && communalSearchBis.length === 0)) && (
                            <EmptySearch />
                        )}
                </S.BIContainer>
            </S.Content>

            <S.ButtonsContainer>
                <Button onClick={() => setStage(Stage.BICREATE)} variant="contained">
                    Создать BI
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
