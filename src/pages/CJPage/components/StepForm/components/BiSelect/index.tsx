import React, { FC, useEffect, useState } from 'react';
import { Button, IconButton, Search } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useMockBItore } from 'pages/CJPage/mocks';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiSelect } from './types';

export const BiSelect: FC<IBiSelect> = ({ setStage, setSelectedBiId }) => {
    const { bis } = useMockBItore();

    console.log(bis);

    const [search, setSearch] = useState('');

    const [filteredBis, setFilteredBis] = useState(bis);

    useEffect(() => {
        setFilteredBis(bis.filter((bi) => bi.name.includes(search)));
    }, [search]);

    const productSearchBis = filteredBis.filter((bi) => !bi.communal);
    const communalSearchBis = filteredBis.filter((bi) => bi.communal);

    return (
        <>
            <S.TitleFlexWrapper>
                <IconButton
                    iconName={Icons.ArrowLeft}
                    size="large"
                    onClick={() => setStage(Stage.SETTINGS)}
                />
                <S.SideBlockTitle>Выбор BI для шага</S.SideBlockTitle>
            </S.TitleFlexWrapper>

            <S.TextFieldContainer>
                <Search
                    placeholder="Номер или название"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch('')}
                    fullWidth
                />
            </S.TextFieldContainer>

            <S.SubtitleFlexWrapper2>
                <S.Subtitle>Продуктовые</S.Subtitle>

                <Button onClick={() => setStage(Stage.BICREATE)} variant="plain">
                    Создать BI
                </Button>
            </S.SubtitleFlexWrapper2>

            {productSearchBis.map((bi) => (
                <S.BIFlexWrapper key={bi.id}>
                    <div>
                        <S.Body2>{bi.name}</S.Body2>
                        <S.Body3>Номер BI</S.Body3>
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
                <S.Subtitle>Коммунальные</S.Subtitle>
            </S.SubtitleFlexWrapper2>

            {communalSearchBis.map((bi) => (
                <S.BIFlexWrapper key={bi.id}>
                    <div>
                        <S.Body2>{bi.name}</S.Body2>
                        <S.Body3>Номер BI</S.Body3>
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
