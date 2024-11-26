import React, { FC, useRef, useState } from 'react';
import { Divider } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { IDropdownMenu } from './types';
import * as S from './units';

export const DropdownMenu: FC<IDropdownMenu> = ({ id, items }) => {
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const [isMenuOpen, setMenuOpen] = useState(false);

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, menuButtonRef);

    const handleIconClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <S.Container>
            <S.IconStyled
                id={id}
                iconName={Icons.MoreVert}
                ref={menuButtonRef}
                onClick={handleIconClick}
            />

            {isMenuOpen && (
                <S.MenuBlock ref={menuRef}>
                    {items.map((group, i) => (
                        <>
                            {group.map((item) => (
                                <S.MenuItem
                                    key={i}
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
