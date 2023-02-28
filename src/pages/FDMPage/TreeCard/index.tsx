import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';

import { PivotArrow } from 'components/other';

import { useIconOfItem } from 'hooks/useIconOfItem';

import * as S from './units';

export const TreeCard: FC<any> = observer((props) => {
    const [isOpen, setOpen] = useState(false);

    const icon = useIconOfItem(props.data.alias, props.data.stereotype);

    return (
        <S.Wrapper className="TreeCardWrapper" isFullWidthCard={props.isFullWidthCard}>
            <S.InnerFlex className="TreeCardInnerFlex">
                <div>
                    <S.TitleContainer
                        className="TreeCardTitleContainer"
                        onClick={() => props.setActiveFDMItem(props.data)}
                    >
                        {icon}

                        <div>
                            <S.Title className="TreeCardTitle">{props.data.name}</S.Title>

                            <S.TitleSecond className="TreeCardTitleSecond">
                                {props.data.alias}
                            </S.TitleSecond>
                        </div>
                    </S.TitleContainer>

                    <S.Text
                        className="TreeCardText"
                        dangerouslySetInnerHTML={{ __html: props.data.descr }}
                    />

                    <div>
                        {props.data.owner && <S.TitleSecond>Владелец</S.TitleSecond>}

                        <S.Text className="TreeCardText">{props.data.owner || ''}</S.Text>
                    </div>
                </div>

                {props.data.children && (
                    <S.ChildrenExpandTitle
                        className="TreeCardChildrenExpandTitle"
                        onClick={() => setOpen(!isOpen)}
                    >
                        Связанные возможности
                        <PivotArrow {...{ isOpen }} />
                    </S.ChildrenExpandTitle>
                )}
            </S.InnerFlex>

            <S.ExpandStyled {...{ isOpen }} isAutoHeight>
                {props.data.children?.map((item: any, index: number) => (
                    <S.Title
                        className="TreeCardTitle"
                        key={index}
                        onClick={() => props.setActiveFDMItem(item)}
                    >
                        {item.name}
                    </S.Title>
                ))}
            </S.ExpandStyled>
        </S.Wrapper>
    );
});
