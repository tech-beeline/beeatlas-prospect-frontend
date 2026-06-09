import React, { FC, useRef, useState } from 'react';

import { Divider } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IDropdownMenu } from './types';
import * as S from './units';

export const DropdownMenu: FC<IDropdownMenu> = ({ id, items, children, position = 'right' }) => {
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const [isMenuOpen, setMenuOpen] = useState(false);

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, menuButtonRef);

    const handleIconClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <S.Container>
            <div id={id} ref={menuButtonRef} onClick={handleIconClick}>
                {children ? children : <S.IconStyled iconName={Icons.MoreVert} />}
            </div>

            {isMenuOpen && (
                <S.MenuBlock ref={menuRef} position={position}>
                    {items.map((group, i) => (
                        <>
                            {group.map((item, j) => (
                                <S.MenuItem
                                    key={`${i}-${j}`}
                                    disabled={item.disabled}
                                    danegerous={item.dangerous}
                                    onClick={async () => {
                                        await item.onClick();
                                        setMenuOpen(false);
                                    }}
                                >
                                    <S.ItemIcon danegerous={item.dangerous} iconName={item.icon} />
                                    <S.MenuItemText>{item.title}</S.MenuItemText>
                                </S.MenuItem>
                            ))}
                            {i !== items.length - 1 && (
                                <S.DividerContainer>
                                    <Divider />
                                </S.DividerContainer>
                            )}
                        </>
                    ))}
                </S.MenuBlock>
            )}
        </S.Container>
    );
};
