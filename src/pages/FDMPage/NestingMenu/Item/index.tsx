import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { BaseIcon } from 'components/core';
import { PivotArrow } from 'components/other';

import { INestingMenuItem } from 'stores/GeneralStore';
import { theme } from 'styles';

import * as S from './units';

export const Item: FC<INestingMenuItem> = observer((props) => {
    const [isOpen, setOpen] = useState(false);

    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     if (location.pathname.includes(props.url!)) {
    //         setOpen(true);
    //     }
    // }, [location.pathname]);

    // const children = props.itemChildren.length > 0 ? props.itemChildren : props.children;
    // let children = props.level > 2 ? props.itemChildren : props.children;

    const showChildHandler = (e: any) => {
        e.stopPropagation();

        setOpen(!isOpen);

        if (props.level === 3) {
            props.getItemChildren(props.id, props.level + 1);
        }
    };

    const activeItemAndGetChild = () => {
        props.setActiveFDMItem(props);
    };

    // useEffect(() => {
    //     // @ts-ignore
    //     props.setMenuConfig(menuData);
    // }, [props.itemChildren]);

    // TODO: test

    // useEffect(() => {
    //     console.log('children use', children);

    //     children = props.itemChildren;

    //     console.log('props', props);
    // }, [props.itemChildren]);

    return (
        <>
            {/* {console.log('children', props.itemChildren)} */}

            <S.Wrapper
                isActive={props.activeFDMItem.id === props.id}
                onClick={activeItemAndGetChild}
            >
                {/* {!!props.children && props.children.length > 0 && ( */}

                <PivotArrow
                    onClick={showChildHandler}
                    position={props.activeFDMItem.id === props.id && 'right'}
                    color={theme.colors.textInactive}
                    {...{ isOpen }}
                />
                {/* )} */}

                <S.LeftWrapper>
                    {/* <BaseIcon iconName={props.iconName} /> */}

                    {props.name}
                </S.LeftWrapper>
            </S.Wrapper>

            <S.ExpandStyled
                {...{ isOpen, setOpen }}
                menuId={props.id}
                treeExpandArray={props.treeExpandArray}
                isAutoHeight
            >
                {props.children?.map((item, index) => (
                    <Item
                        key={index}
                        activeFDMItem={props.activeFDMItem}
                        setActiveFDMItem={props.setActiveFDMItem}
                        treeExpandArray={props.treeExpandArray}
                        getItemChildren={props.getItemChildren}
                        // itemChildren={props.itemChildren}
                        {...item}
                    />
                ))}
            </S.ExpandStyled>
        </>
    );
});
