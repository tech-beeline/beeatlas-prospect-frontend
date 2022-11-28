import React, { FC, useState } from 'react';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { BaseIcon } from 'components/core';
import { PivotArrow } from 'components/other';

import { INestingMenuItem } from 'stores/GeneralStore';
import { theme } from 'styles';

import * as S from './units';

export const Item: FC<INestingMenuItem> = (props) => {
    const [isOpen, setOpen] = useState(false);

    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     if (location.pathname.includes(props.url!)) {
    //         setOpen(true);
    //     }
    // }, [location.pathname]);

    const showChildHandler = (e: any) => {
        e.stopPropagation();

        setOpen(!isOpen);
    };

    return (
        <>
            <S.Wrapper
                isActive={props.activeFDMItem.id === props.id}
                onClick={() => props.setActiveFDMItem(props)}
            >
                {!!props.children && props.children.length > 0 && (
                    <PivotArrow
                        onClick={showChildHandler}
                        position={props.activeFDMItem.id === props.id && 'right'}
                        color={theme.colors.textInactive}
                        {...{ isOpen }}
                    />
                )}

                <S.LeftWrapper>
                    {/* <BaseIcon iconName={props.iconName} /> */}

                    {props.name}
                </S.LeftWrapper>
            </S.Wrapper>

            <S.ExpandStyled {...{ isOpen }} isAutoHeight>
                {props.children &&
                    props.children.map((item, index) => (
                        <Item
                            key={index}
                            activeFDMItem={props.activeFDMItem}
                            setActiveFDMItem={props.setActiveFDMItem}
                            {...item}
                        >
                            {item.children}
                        </Item>
                    ))}
            </S.ExpandStyled>
        </>
    );
};
