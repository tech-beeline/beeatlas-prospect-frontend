import React, { FC, useRef, useState } from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { IColumnMenu } from './types';
import * as S from './units';

export const ColumnMenu: FC<IColumnMenu> = ({
    tableDataLength,
    rowIndex,
    addNewColumn,
    removeColumn,
    changePositionOfColumn,
    setOpenSideBlockName,
    setRenameIndex,
    openBiForm,
}) => {
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const [openMenuIndex, setOpenMenuIndex] = useState(0);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isAddStepMenu, setAddStepMenu] = useState(false);
    const [isMoveMenu, setMoveMenu] = useState(false);

    const hideMenuHandler = () => {
        setMenuOpen(false);
        setAddStepMenu(false);
        setMoveMenu(false);
    };

    const openMenuHandler = (index: number) => {
        setOpenMenuIndex(index);

        isMenuOpen && index === openMenuIndex ? hideMenuHandler() : setMenuOpen(true);
    };

    useOutsideClick(menuRef, isMenuOpen, hideMenuHandler, menuButtonRef);

    // console.log(rowIndex, menuRef, isMenuOpen);

    const handleIconClick = () => {
        openMenuHandler(rowIndex);

        setAddStepMenu(false);
        setMoveMenu(false);
    };

    const handleAddColumnClick = (before: boolean) => {
        addNewColumn(before ? rowIndex : rowIndex + 1);
        hideMenuHandler();
    };

    const handleChangePositionClick = (right: boolean) => {
        changePositionOfColumn(rowIndex, right);
        hideMenuHandler();
    };

    const handleRmoveColumnClick = () => {
        removeColumn(rowIndex);
        hideMenuHandler();
    };

    return (
        <>
            <Icon
                id={String(rowIndex)}
                iconName={Icons.MoreVert}
                style={{ cursor: 'pointer' }}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && openMenuIndex === rowIndex && (
                <S.MenuBlock ref={menuRef}>
                    {isAddStepMenu ? (
                        <>
                            <S.MenuItem onClick={() => handleAddColumnClick(true)}>
                                <Icon iconName={Icons.AddColumnLeft} />

                                <S.MenuItemText>Добавить шаг до</S.MenuItemText>
                            </S.MenuItem>

                            <S.MenuItem onClick={() => handleAddColumnClick(false)}>
                                <Icon iconName={Icons.AddColumnRight} />

                                <S.MenuItemText>Добавить шаг после</S.MenuItemText>
                            </S.MenuItem>
                        </>
                    ) : isMoveMenu ? (
                        <>
                            {rowIndex !== 0 && (
                                <S.MenuItem onClick={() => handleChangePositionClick(false)}>
                                    <Icon iconName={Icons.ArrowLeft} />

                                    <S.MenuItemText>Переместить шаг влево</S.MenuItemText>
                                </S.MenuItem>
                            )}

                            {rowIndex !== tableDataLength - 1 && (
                                <S.MenuItem onClick={() => handleChangePositionClick(true)}>
                                    <Icon iconName={Icons.ArrowRight} />

                                    <S.MenuItemText>Переместить шаг вправо</S.MenuItemText>
                                </S.MenuItem>
                            )}
                        </>
                    ) : (
                        <>
                            <S.MenuItem
                                onClick={() => {
                                    setOpenSideBlockName(true);
                                    setRenameIndex(rowIndex);
                                    hideMenuHandler();
                                }}
                            >
                                <Icon iconName={Icons.Edit} />

                                <S.MenuItemText>Изменить название</S.MenuItemText>
                            </S.MenuItem>

                            <S.MenuItem
                                onClick={() => {
                                    openBiForm();
                                    setRenameIndex(rowIndex);
                                    hideMenuHandler();
                                }}
                            >
                                <Icon iconName={Icons.Add} />

                                <S.MenuItemText>Добавить BI</S.MenuItemText>
                            </S.MenuItem>

                            <S.MenuItemStyled onClick={() => setAddStepMenu(true)}>
                                <S.MenuItemText>Добавить шаг</S.MenuItemText>

                                <Icon iconName={Icons.NavArrowRight} />
                            </S.MenuItemStyled>

                            {tableDataLength > 1 && (
                                <>
                                    <S.MenuItemStyled onClick={() => setMoveMenu(true)}>
                                        <S.MenuItemText>Переместить</S.MenuItemText>

                                        <Icon iconName={Icons.NavArrowRight} />
                                    </S.MenuItemStyled>
                                    <S.MenuDivider />

                                    <S.MenuItem onClick={handleRmoveColumnClick}>
                                        {/* заменить на нужную */}
                                        {/* <CrossSVG /> */}

                                        <S.MenuItemRemoveText>Удалить шаг</S.MenuItemRemoveText>
                                    </S.MenuItem>
                                </>
                            )}
                        </>
                    )}
                </S.MenuBlock>
            )}
        </>
    );
};
