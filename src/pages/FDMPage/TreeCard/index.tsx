import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';

import { PivotArrow } from 'components/other';

import { useIconOfItem } from 'hooks/useIconOfItem';

import * as S from './units';

export const TreeCard: FC<any> = observer((props) => {
    console.log('props.isFullWidthCard', props.isFullWidthCard);

    const [isOpen, setOpen] = useState(false);

    const icon = useIconOfItem(props.data.alias, props.data.stereotype);

    return (
        <S.Wrapper isFullWidthCard={props.isFullWidthCard}>
            <S.InnerFlex>
                <div>
                    <S.TitleContainer onClick={() => props.setActiveFDMItem(props.data)}>
                        {icon}

                        <div>
                            <S.Title>{props.data.name}</S.Title>

                            <S.TitleSecond>{props.data.alias}</S.TitleSecond>
                        </div>
                    </S.TitleContainer>

                    <S.Text dangerouslySetInnerHTML={{ __html: props.data.descr }} />

                    <div>
                        {props.data.owner && <S.TitleSecond>Владелец</S.TitleSecond>}

                        <S.Text>{props.data.owner || ''}</S.Text>
                    </div>
                </div>

                {props.data.children && (
                    <S.ChildrenExpandTitle onClick={() => setOpen(!isOpen)}>
                        Связанные возможности
                        <PivotArrow {...{ isOpen }} />
                    </S.ChildrenExpandTitle>
                )}
            </S.InnerFlex>

            <S.ExpandStyled {...{ isOpen }} isAutoHeight>
                {props.data.children?.map((item: any, index: number) => (
                    <S.Title key={index} onClick={() => props.setActiveFDMItem(item)}>
                        {item.name}
                    </S.Title>
                ))}
            </S.ExpandStyled>
        </S.Wrapper>
    );
});
