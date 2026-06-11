import React, { FC, useRef, useState } from 'react';

import { Divider } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IDropdownMenuControlled } from './types';
import * as S from './units';

export const DropdownMenuControlled: FC<IDropdownMenuControlled> = ({
    id,
    items,
    onOpen,
    onClose,
}) => {
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const [isMenuOpen, setMenuOpen] = useState(false);

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, menuButtonRef);

    const handleIconClick = () => {
        const newIsOpen = !isMenuOpen;
        setMenuOpen(newIsOpen);
        if (newIsOpen) {
            onOpen?.();
        } else {
            onClose?.();
        }
    };

    const handleMenuItemClick = async (onClickHandler: () => Promise<unknown> | void) => {
        await onClickHandler();
        setMenuOpen(false);
        onClose?.();
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
                            {group.map((item, j) => (
                                <S.MenuItem
                                    key={`${i}-${j}`}
                                    disabled={item.disabled}
                                    danegerous={item.dangerous}
                                    onClick={() => handleMenuItemClick(item.onClick)}
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
