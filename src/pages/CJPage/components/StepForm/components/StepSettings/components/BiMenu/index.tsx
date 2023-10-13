import React, { FC, useRef, useState } from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { IBiMenu } from './types';
import * as S from './units';

export const BiMenu: FC<IBiMenu> = ({ bi, index, totalLength, removeBi, moveBi }) => {
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
                id={String(bi.id) + index}
                iconName={Icons.MoreVert}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && (
                <S.MenuBlock ref={menuRef}>
                    <>
                        {index !== 0 && totalLength > 1 && (
                            <S.MenuItem onClick={() => moveBi(index, true)}>
                                <Icon iconName={Icons.ArrowUp} />

                                <S.MenuItemText>Переместить выше</S.MenuItemText>
                            </S.MenuItem>
                        )}

                        {index !== totalLength - 1 && totalLength > 1 && (
                            <S.MenuItem onClick={() => moveBi(index, false)}>
                                <Icon iconName={Icons.ArrowDown} />

                                <S.MenuItemText>Переместить ниже</S.MenuItemText>
                            </S.MenuItem>
                        )}

                        {totalLength > 1 && <S.MenuDivider />}

                        <S.MenuItem onClick={() => removeBi(bi.id)}>
                            <S.DeleteIcon iconName={Icons.Delete} />

                            <S.MenuItemRemoveText>Удалить</S.MenuItemRemoveText>
                        </S.MenuItem>
                    </>
                </S.MenuBlock>
            )}
        </>
    );
};
