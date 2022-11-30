import React, { FC, useState } from 'react';
import { Icons } from '@beeline/lk-ui';

import { PivotArrow } from 'components/other';

import { INestingMenuItem } from 'stores/GeneralStore';
import { theme } from 'styles';

import * as S from './units';

export const Item: FC<INestingMenuItem> = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [isShownArrow] = useState(
        (!!props.children && props.children.length > 0) || props.level > 2,
    );

    const showChildHandler = (e: Event) => {
        e.stopPropagation();

        setOpen(!isOpen);

        // TODO: поменять условие
        if (props.level === 3 && !isOpen) {
            props.getItemChildren(props.id, props.level + 1);
        }
    };

    const activeItemAndGetChild = () => {
        props.setActiveFDMItem(props);
    };

    const iconItemHandler = () => {
        let icon = Icons.Folder;
        let type = '';
        const aliasType = props.alias?.split('.')[0];

        switch (true) {
            case aliasType === 'GRP':
                icon = Icons.Folder;
                break;

            case aliasType === 'DMN':
                icon = Icons.PagesMultipleEmpty;
                break;

            case props.stereotype === 'TECHNICAL':
                icon = Icons.Reports;
                type = 'info';
                break;

            case props.stereotype === 'BUSINESS':
                icon = Icons.Reports;
                type = 'warning';
                break;

            default:
                icon = Icons.Folder;
        }

        // @ts-ignore
        return <S.IconStyled iconName={icon} type={type} />;
    };

    return (
        <>
            <S.Wrapper
                isActive={props.activeFDMItem.id === props.id}
                onClick={activeItemAndGetChild}
            >
                {isShownArrow && (
                    <PivotArrow
                        onClick={showChildHandler}
                        position={props.activeFDMItem.id === props.id && 'right'}
                        color={theme.colors.textInactive}
                        {...{ isOpen }}
                    />
                )}

                <S.LeftWrapper>
                    {iconItemHandler()}

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
                        isItemChildren={props.isItemChildren}
                        {...item}
                    />
                ))}
            </S.ExpandStyled>
        </>
    );
};
