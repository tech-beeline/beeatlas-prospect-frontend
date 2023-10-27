import React, { FC, useRef, useState } from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { ICjMenu } from './types';
import * as S from './units';

export const CjMenu: FC<ICjMenu> = ({ cj, onEditClick, onDeleteClick }) => {
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const [isMenuOpen, setMenuOpen] = useState(false);

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, menuButtonRef);

    const handleIconClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <S.IconStyled
                id={String(cj.id)}
                iconName={Icons.MoreVert}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && (
                <S.MenuBlock ref={menuRef}>
                    <>
                        <S.MenuItem
                            onClick={() => {
                                onEditClick();
                                setMenuOpen(false);
                            }}
                        >
                            <Icon iconName={Icons.Edit} />

                            <S.MenuItemText>Редактировать</S.MenuItemText>
                        </S.MenuItem>

                        <S.MenuDivider />

                        <S.MenuItem
                            onClick={() => {
                                onDeleteClick();
                                setMenuOpen(false);
                            }}
                        >
                            <S.DeleteIcon iconName={Icons.Delete} />

                            <S.MenuItemRemoveText>Удалить</S.MenuItemRemoveText>
                        </S.MenuItem>
                    </>
                </S.MenuBlock>
            )}
        </>
    );
};
