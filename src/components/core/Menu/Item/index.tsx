import React, { FC, useState } from 'react';

import { BaseIcon } from 'components/core';
import { Expand, PivotArrow } from 'components/other';

import { theme } from 'styles';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = (props) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <S.Wrapper
                isActive={props.url?.includes(location.pathname)}
                onClick={() => setOpen(!isOpen)}
            >
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
