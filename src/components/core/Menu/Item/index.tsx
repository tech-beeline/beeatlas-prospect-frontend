import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BaseIcon } from 'components/core';
import { PivotArrow } from 'components/other';

import { theme } from 'styles';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = (props) => {
    const [isOpen, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!isOpen);

        // TODO: сделать обязательным
        if (!props.subItems) {
            navigate(props.url!);
        }
    };

    return (
        <>
            <S.Wrapper
                isActive={location.pathname?.includes(props.url!)}
                isSubItems={!!props.subItems}
                onClick={handleClick}
            >
                <S.LeftWrapper>
                    <BaseIcon iconName={props.iconName} />

                    {props.title}
                </S.LeftWrapper>

                {props.subItems && <PivotArrow {...{ isOpen }} color={theme.colors.textInactive} />}
            </S.Wrapper>

            <S.ExpandStyled {...{ isOpen }}>
                {props.subItems && props.subItems.map((item) => item)}
            </S.ExpandStyled>
        </>
    );
};
