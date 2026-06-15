import React, { FC, useRef, useState } from 'react';

import { Icon } from 'components/ui';

import {
    useCreateCJStepMutation,
    useDeleteCJStepMutation,
    useUpdateCJStepMutation,
} from 'api/queries/cj';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IColumnMenu } from './types';
import * as S from './units';

export const ColumnMenu: FC<IColumnMenu> = ({
    cjId,
    stepId,
    stepName,
    stepDescription,
    tableDataLength,
    stepIndex,
    collapsedStepIds,
    setCollapsedStepIds,
    setOpenSideBlockName,
    setRenameIndex,
}) => {
    const { mutateAsync: deleteStep } = useDeleteCJStepMutation();
    const { mutateAsync: createStep } = useCreateCJStepMutation();
    const { mutateAsync: updateStep } = useUpdateCJStepMutation();

    const menuRef = useRef(null);
    const menuButtonRef = useRef<HTMLSpanElement | null>(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

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

        const buttonRect = menuButtonRef.current?.getBoundingClientRect();
        setMenuPosition({ x: buttonRect?.right ?? 0, y: buttonRect?.bottom ?? 0 });

        isMenuOpen && index === openMenuIndex ? hideMenuHandler() : setMenuOpen(true);
    };

    useOutsideClick(menuRef, isMenuOpen, hideMenuHandler, menuButtonRef);

    const handleIconClick = () => {
        openMenuHandler(stepIndex);

        setAddStepMenu(false);
        setMoveMenu(false);
    };

    const handleAddColumnClick = async (before: boolean) => {
        await createStep({
            cjId: String(cjId),
            data: { name: 'Название этапа', order: before ? stepIndex : stepIndex + 1 },
        });
        showSnackbar({ message: 'Этап добавлен' });
        hideMenuHandler();
    };

    const handleChangePositionClick = async (right: boolean) => {
        await updateStep({
            stepId: String(stepId),
            data: {
                name: stepName,
                description: stepDescription,
                order: right ? stepIndex + 1 : stepIndex - 1,
            },
        });
        showSnackbar({ message: 'Этап перемещён' });
        hideMenuHandler();
    };

    const handleDeleteStepClick = async () => {
        await deleteStep({ stepId: String(stepId) });
        setCollapsedStepIds(collapsedStepIds.filter((id) => id !== stepId));
        showSnackbar({ message: 'Этап удалён' });
        hideMenuHandler();
    };

    return (
        <>
            <Icon
                id={String(stepIndex)}
                iconName={Icons.MoreVert}
                style={{ cursor: 'pointer' }}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && openMenuIndex === stepIndex && (
                <S.MenuBlock ref={menuRef} top={menuPosition.y} left={menuPosition.x}>
                    {isAddStepMenu ? (
                        <>
                            <S.MenuItem onClick={() => handleAddColumnClick(true)}>
                                <Icon iconName={Icons.AddColumnLeft} />

                                <S.MenuItemText>Добавить этап до</S.MenuItemText>
                            </S.MenuItem>

                            <S.MenuItem onClick={() => handleAddColumnClick(false)}>
                                <Icon iconName={Icons.AddColumnRight} />

                                <S.MenuItemText>Добавить этап после</S.MenuItemText>
                            </S.MenuItem>
                        </>
                    ) : isMoveMenu ? (
                        <>
                            {stepIndex !== 0 && (
                                <S.MenuItem onClick={() => handleChangePositionClick(false)}>
                                    <Icon iconName={Icons.ArrowLeft} />

                                    <S.MenuItemText>Переместить влево</S.MenuItemText>
                                </S.MenuItem>
                            )}

                            {stepIndex !== tableDataLength - 1 && (
                                <S.MenuItem onClick={() => handleChangePositionClick(true)}>
                                    <Icon iconName={Icons.ArrowRight} />

                                    <S.MenuItemText>Переместить вправо</S.MenuItemText>
                                </S.MenuItem>
                            )}
                        </>
                    ) : (
                        <>
                            <S.MenuItem
                                onClick={() => {
                                    setOpenSideBlockName(true);
                                    setRenameIndex(stepIndex);
                                    hideMenuHandler();
                                }}
                            >
                                <Icon iconName={Icons.Edit} />

                                <S.MenuItemText>Изменить</S.MenuItemText>
                            </S.MenuItem>

                            <S.MenuItem
                                onClick={() => {
                                    setOpenSideBlockName(true);
                                    setRenameIndex(stepIndex);
                                    hideMenuHandler();
                                }}
                            >
                                <Icon iconName={Icons.Add} />

                                <S.MenuItemText>Добавить BI</S.MenuItemText>
                            </S.MenuItem>

                            <S.MenuItemStyled onClick={() => setAddStepMenu(true)}>
                                <S.MenuItemText>Добавить этап</S.MenuItemText>

                                <Icon iconName={Icons.NavArrowRight} />
                            </S.MenuItemStyled>

                            {tableDataLength > 1 && (
                                <>
                                    <S.MenuItemStyled onClick={() => setMoveMenu(true)}>
                                        <S.MenuItemText>Переместить</S.MenuItemText>

                                        <Icon iconName={Icons.NavArrowRight} />
                                    </S.MenuItemStyled>
                                    <S.MenuDivider />

                                    <S.MenuItem onClick={handleDeleteStepClick}>
                                        <S.DeleteIcon iconName={Icons.Delete} />

                                        <S.MenuItemRemoveText>Удалить этап</S.MenuItemRemoveText>
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
