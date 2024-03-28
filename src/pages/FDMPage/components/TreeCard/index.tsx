import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@beeline/design-system-react';

import { Link, PivotArrow } from 'components/other';

import { useGetTechCapabilityProductsQuery } from 'api/queries/fdm';
import { checkForDomainType } from 'pages/FDMPage/helpers';
import { Item } from 'pages/FDMPage/store/types';

import { getItemIcon } from '../utils';

import { ITreeCard } from './types';
import * as S from './units';

export const TreeCard: FC<ITreeCard> = ({ isFullWidthCard, item }) => {
    const [, setParams] = useSearchParams();
    const isTypeDMN = checkForDomainType(item);

    const { data: products, isLoading: isLoadingProducts } = useGetTechCapabilityProductsQuery(
        item?.guid,
        item?.stereotype === 'TECHNICAL',
    );

    const [isOpen, setOpen] = useState(false);

    const handleTitleClick = (clickedItem: Item) => {
        let itemDomain = {};
        if (clickedItem.domain_ref) {
            itemDomain = { domainId: String(clickedItem.domain_ref.id) };
        }
        if (isTypeDMN) {
            itemDomain = { domainId: String(clickedItem.id) };
        }
        setParams(
            new URLSearchParams({
                ...itemDomain,
                level: String(clickedItem.level),
                id: String(clickedItem.id),
            }),
        );
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

                            <S.TitleSecond>{item.alias}</S.TitleSecond>
                        </div>
                    </S.TitleContainer>

                    <S.Text
                        dangerouslySetInnerHTML={{ __html: item.descr }}
                        data-testid="TreeCardDescription"
                    />

                    {item.domain_ref && (
                        <S.MarginContainer>
                            <S.TitleSecond>Домен</S.TitleSecond>
                            <Link
                                title={item.domain_ref?.name}
                                url={`/models/fdm?id=${item.domain_ref?.id}&domainId=${item.domain_ref?.id}`}
                            />
                        </S.MarginContainer>
                    )}

                    {item.stereotype === 'TECHNICAL' && (
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

                    {item.owner && (
                        <S.MarginContainer>
                            <S.TitleSecond>Владелец</S.TitleSecond>
                            <S.Text>{item.owner}</S.Text>
                        </S.MarginContainer>
                    )}
                </div>

                {item.children && item.children.length > 0 && (
                    <S.ChildrenExpandTitle
                        onClick={() => setOpen(!isOpen)}
                        data-testid="TreeCardChildrenExpandTitle"
                    >
                        Связанные возможности
                        <PivotArrow position={isOpen && 'top'} />
                    </S.ChildrenExpandTitle>
                )}
            </S.InnerFlex>

            <S.ExpandStyled {...{ isOpen }} isAutoHeight>
                {item.children?.map((item: Item, index: number) => (
                    <S.ChildrenLinkTitle
                        key={index}
                        onClick={() => handleTitleClick(item)}
                        data-testid="TreeCardChildrenLinkTitle"
                    >
                        {item.name}
                    </S.ChildrenLinkTitle>
                ))}
            </S.ExpandStyled>
        </S.Wrapper>
    );
};
