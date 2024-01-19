import React, { FC, useState } from 'react';
import { Button, IconButton, Search } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useGetBICollectionQuery } from 'api/queries/bi';
import { useDebounce } from 'hooks';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiSelect } from './types';

export const BiSelect: FC<IBiSelect> = ({ setStage, setSelectedBiId, selectedBiIds, onClose }) => {
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounce(search);

    const { data } = useGetBICollectionQuery({ search: debouncedSearch });

    const filteredData = (data ?? []).filter((bi) => !selectedBiIds.includes(bi.id));

    const productSearchBis = filteredData.filter((bi) => !bi.communal);
    const communalSearchBis = filteredData.filter((bi) => bi.communal);

    return (
        <>
            <S.FlexWrapper>
                <S.TitleFlexWrapper>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() => setStage(Stage.SETTINGS)}
                    />
                    <S.SideBlockTitle>Выбор BI для шага</S.SideBlockTitle>
                </S.TitleFlexWrapper>

                <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
            </S.FlexWrapper>

            <S.TextFieldContainer>
                <Search
                    fullWidth
                    placeholder="Введите название BI"
                    value={search}
                    maxLength={400}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch('')}
                />
            </S.TextFieldContainer>

            <S.SubtitleFlexWrapper2>
                <S.SelectSubtitle>Продуктовые</S.SelectSubtitle>

                <Button onClick={() => setStage(Stage.BICREATE)} variant="plain">
                    Создать BI
                </Button>
            </S.SubtitleFlexWrapper2>

            {productSearchBis.map((bi, index) => (
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
            <S.SubtitleFlexWrapper2>
                <S.SelectSubtitle>Коммунальные</S.SelectSubtitle>
            </S.SubtitleFlexWrapper2>

            {communalSearchBis.map((bi, index) => (
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
        </>
    );
};
