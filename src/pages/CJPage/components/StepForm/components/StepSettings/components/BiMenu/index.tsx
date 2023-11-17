import React, { FC, useRef, useState } from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useDeleteBIFromStepMutation, useUpdateCJStepBIsMutation } from 'api/queries/cj';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { IBiMenu } from './types';
import * as S from './units';

export const BiMenu: FC<IBiMenu> = ({ biId, stepId, index, totalLength }) => {
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const { mutateAsync: deleteBi } = useDeleteBIFromStepMutation();
    const { mutateAsync: updateBi } = useUpdateCJStepBIsMutation();

    const [isMenuOpen, setMenuOpen] = useState(false);

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, menuButtonRef);

    const handleIconClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleDeleteClick = async () => {
        deleteBi({ stepId: String(stepId), biId: String(biId) });
    };

    const handleMoveClick = async (up: boolean) => {
        await updateBi({
            stepId: String(stepId),
            data: { id_bi: biId, order: up ? index - 1 : index + 1 },
        });
        setMenuOpen(false);
    };

    return (
        <>
            <S.IconStyled
                id={String(biId) + index}
                iconName={Icons.MoreVert}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && (
                <S.MenuBlock ref={menuRef}>
                    <>
                        {index !== 0 && totalLength > 1 && (
                            <S.MenuItem onClick={() => handleMoveClick(true)}>
                                <Icon iconName={Icons.ArrowUp} />

                                <S.MenuItemText>Переместить выше</S.MenuItemText>
                            </S.MenuItem>
                        )}

                        {index !== totalLength - 1 && totalLength > 1 && (
                            <S.MenuItem onClick={() => handleMoveClick(false)}>
                                <Icon iconName={Icons.ArrowDown} />

                                <S.MenuItemText>Переместить ниже</S.MenuItemText>
                            </S.MenuItem>
                        )}

                        {totalLength > 1 && <S.MenuDivider />}

                        <S.MenuItem onClick={handleDeleteClick}>
                            <S.DeleteIcon iconName={Icons.Delete} />

                            <S.MenuItemRemoveText>Удалить</S.MenuItemRemoveText>
                        </S.MenuItem>
                    </>
                </S.MenuBlock>
            )}
        </>
    );
};
