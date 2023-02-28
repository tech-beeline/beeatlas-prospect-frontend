import React, { FC, useState } from 'react';
import { Icons } from '@beeline/lk-ui';

import { PivotArrow } from 'components/other';

import { INestingMenuItem } from 'stores/GeneralStore';
import { theme } from 'styles';

import * as S from './units';

export const Item: FC<INestingMenuItem> = (props) => {
    const isTypeDMN = props.alias?.split('.')[0] === 'DMN';

    const [isOpen, setOpen] = useState(false);
    const [isShownArrow, setShownArrow] = useState(
        (!!props.children && props.children.length > 0) || props.level === 3 || isTypeDMN,
    );

    const showChildHandler = async (e: Event) => {
        e.stopPropagation();

        setOpen(!isOpen);

        // TODO: поменять условие
        if ((props.level === 3 || isTypeDMN) && !isOpen) {
            const res = await props.getItemChildren(props.id, props.level + 1);

            // @ts-ignore
            if (res.length === 0 && isTypeDMN) {
                setShownArrow(false);
            }
        }
    };

    const activeItemAndGetChild = () => {
        // if (props.level === 3) {
        //     props.getItemChildren(props.id, props.level + 1);
        // }

        // TODO: сюда и кладем activeFDMItem (ни на что не влияет сейчас, но стоит убрать)
        props.setActiveFDMItem(props);
    };

    // TODO: useMemo
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
                className="ItemWrapper"
                isActive={props.activeFDMItem.id === props.id}
                onClick={activeItemAndGetChild}
            >
                <PivotArrow
                    onClick={showChildHandler}
                    position={props.activeFDMItem.id === props.id && 'right'}
                    color={isShownArrow ? theme.colors.textInactive : 'transparent'}
                    {...{ isOpen }}
                />

                <S.LeftWrapper className="ItemLeftWrapper">
                    {iconItemHandler()}

                    <S.Name className="ItemName">{props.name}</S.Name>
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
