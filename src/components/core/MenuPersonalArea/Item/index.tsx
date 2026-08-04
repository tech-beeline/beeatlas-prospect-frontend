import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BaseIcon } from 'components/core';
import { CustomRadarLogo, PivotArrow } from 'components/other';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = (props) => {
    const [isOpen, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes(props.url!)) {
            setOpen(true);
        }
    }, [location.pathname]);

    const handleClick = () => {
        if (!props.disabled) {
            setOpen(!isOpen);

            // TODO: сделать обязательным
            if (!props.subItems) {
                navigate(props.url!);
            }
        }
    };

    return (
        <>
            <S.Wrapper
                className="ItemWrapper"
                isActive={location.pathname?.includes(props.url!)}
                isSubItems={!!props.subItems}
                onClick={handleClick}
            >
                <S.LeftWrapper className="ItemLeftWrapper">
                    {props.isRadar ? (
                        <CustomRadarLogo isActive={location.pathname?.includes(props.url!)} />
                    ) : (
                        <BaseIcon iconName={props.iconName} />
                    )}

                    {props.title}
                </S.LeftWrapper>

                {props.subItems && (
                    <PivotArrow {...{ isOpen }} color={'var(--color-text-inactive)'} />
                )}
            </S.Wrapper>

            <S.ExpandStyled {...{ isOpen }}>
                {props.subItems && props.subItems.map((item) => item)}
            </S.ExpandStyled>
        </>
    );
};
