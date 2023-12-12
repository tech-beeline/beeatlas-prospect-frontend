import React, { FC, useState } from 'react';

import { PivotArrow } from 'components/other';

import { useFDMStore } from '../../store';
import { getItemIcon } from '../utils';

import { ITreeCard } from './types';
import * as S from './units';

export const TreeCard: FC<ITreeCard> = ({ isFullWidthCard, item }) => {
    const setActiveItem = useFDMStore((state) => state.setActiveItem);

    const [isOpen, setOpen] = useState(false);

    return (
        <S.Wrapper data-testid="TreeCard" isFullWidthCard={isFullWidthCard}>
            <S.InnerFlex>
                <div>
                    <S.TitleContainer
                        onClick={() => setActiveItem(item.id, item.level)}
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

                    {item.owner && (
                        <S.OwnerContainer>
                            <S.TitleSecond>Владелец</S.TitleSecond>
                            <S.Text>{item.owner}</S.Text>
                        </S.OwnerContainer>
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
                {item.children?.map((item: any, index: number) => (
                    <S.ChildrenLinkTitle
                        key={index}
                        onClick={() => setActiveItem(item.id, item.level)}
                        data-testid="TreeCardChildrenLinkTitle"
                    >
                        {item.name}
                    </S.ChildrenLinkTitle>
                ))}
            </S.ExpandStyled>
        </S.Wrapper>
    );
};
