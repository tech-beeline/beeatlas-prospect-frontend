import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@beeline/design-system-react';

import { PivotArrow } from 'components/other';

import { useGetTechCapabilityProductsQuery } from 'api/queries/fdm';
import { useFDMStore } from 'pages/FDMPage/store';
import { Item, ItemTypes } from 'pages/FDMPage/store/types';

import { getItemIcon } from '../utils';

import { ITreeCard } from './types';
import * as S from './units';

export const TreeCard: FC<ITreeCard> = ({ isFullWidthCard, item }) => {
    const [, setParams] = useSearchParams();

    const { getСhildrenСapabilities } = useFDMStore();

    const { data: products, isLoading: isLoadingProducts } = useGetTechCapabilityProductsQuery(
        '1',
        item.type === ItemTypes.TECH,
    );

    const [isOpen, setOpen] = useState(false);

    const handleTitleClick = (clickedItem: Item) => {
        setParams(
            new URLSearchParams({
                id: String(clickedItem.id),
                type: clickedItem.type,
            }),
        );
    };

    const handleRelatedCapabilitiesClick = async () => {
        if (!isOpen) {
            await getСhildrenСapabilities(item.id);
        }
        setOpen(!isOpen);
    };

    return (
        <S.Wrapper data-testid="TreeCard" isFullWidthCard={isFullWidthCard}>
            <S.InnerFlex>
                <div>
                    <S.TitleContainer
                        onClick={() => handleTitleClick(item)}
                        data-testid="TreeCardTitleContainer"
                    >
                        {getItemIcon(item)}

                        <div>
                            <S.Title data-testid="TreeCardTitle">{item.name}</S.Title>

                            <S.TitleSecond>{item.code}</S.TitleSecond>
                        </div>
                    </S.TitleContainer>

                    <S.Text
                        dangerouslySetInnerHTML={{ __html: item.description }}
                        data-testid="TreeCardDescription"
                    />

                    {/* {item.domain_ref && (
                        <S.MarginContainer>
                            <S.TitleSecond>Домен</S.TitleSecond>
                            <Link
                                title={item.domain_ref?.name}
                                url={`/models/fdm?id=${item.domain_ref?.id}&domainId=${item.domain_ref?.id}`}
                            />
                        </S.MarginContainer>
                    )} */}

                    {item.type === ItemTypes.TECH && (
                        <S.MarginContainer>
                            <S.TitleSecond>ТС Реализована в продукте</S.TitleSecond>
                            <S.ChipsContainer>
                                {isLoadingProducts && (
                                    <Skeleton height={32} radius={30} width={123} />
                                )}
                                {products &&
                                    products.length > 0 &&
                                    products.map((product) => (
                                        <S.ChipStyled key={product.eaGuid} label={product.name} />
                                    ))}
                                {products && products.length === 0 && (
                                    <S.ChipStyled label="Нет продуктов" />
                                )}
                            </S.ChipsContainer>
                        </S.MarginContainer>
                    )}

                    {item.author && (
                        <S.MarginContainer>
                            <S.TitleSecond>Владелец</S.TitleSecond>
                            <S.Text>{item.author}</S.Text>
                        </S.MarginContainer>
                    )}
                </div>

                {item.type === ItemTypes.BUSINESS && (
                    <S.ChildrenExpandTitle
                        onClick={handleRelatedCapabilitiesClick}
                        data-testid="TreeCardChildrenExpandTitle"
                    >
                        Связанные возможности
                        <PivotArrow position={isOpen && 'top'} />
                    </S.ChildrenExpandTitle>
                )}
            </S.InnerFlex>

            <S.ExpandStyled isOpen={isOpen} isAutoHeight>
                {item.children?.map((item: Item, index: number) => (
                    <S.ChildrenLinkTitle
                        key={index}
                        onClick={() => handleTitleClick(item)}
                        data-testid="TreeCardChildrenLinkTitle"
                    >
                        {item.name}
                    </S.ChildrenLinkTitle>
                ))}
                {item.children.length === 0 && <S.TextInactive>Возможностей нет</S.TextInactive>}
            </S.ExpandStyled>
        </S.Wrapper>
    );
};
