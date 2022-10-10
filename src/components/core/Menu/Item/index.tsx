import React, { FC, useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { BaseIcon } from 'components/core';
import { Expand } from 'components/other';
import { PivotArrow } from 'components/other';

import { theme } from 'styles';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = (props) => {
    const [isOpen, setOpen] = useState(false);

    // const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!isOpen);

        // TODO: сделать обязательным
        // navigate(props.url!);
    };

    return (
        <>
            <S.Wrapper isActive={location.pathname?.includes(props.url!)} onClick={handleClick}>
                <S.LeftWrapper>
                    <BaseIcon iconName={props.iconName} />

                    {props.title}
                </S.LeftWrapper>

                {props.subItems && <PivotArrow {...{ isOpen }} color={theme.colors.textInactive} />}
            </S.Wrapper>

            <Expand {...{ isOpen }}>{props.subItems && props.subItems.map((item) => item)}</Expand>
        </>
    );
};
