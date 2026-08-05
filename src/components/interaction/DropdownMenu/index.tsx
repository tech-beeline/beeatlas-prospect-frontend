import React, { FC, Fragment, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Divider } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IDropdownMenu } from './types';
import * as S from './units';

const getMenuPosition = (triggerRect: DOMRect, position: 'right' | 'left') => ({
    top: triggerRect.bottom,
    left: position === 'right' ? triggerRect.right - S.MENU_WIDTH : triggerRect.left,
});

export const DropdownMenu: FC<IDropdownMenu> = ({
    id,
    items,
    children,
    position = 'right',
    usePortal = false,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useOutsideClick(menuRef, isMenuOpen, setMenuOpen, menuButtonRef);

    useLayoutEffect(() => {
        if (!usePortal || !isMenuOpen || !menuButtonRef.current) {
            return undefined;
        }

        const updatePosition = () => {
            if (!menuButtonRef.current) {
                return;
            }

            setMenuPosition(
                getMenuPosition(menuButtonRef.current.getBoundingClientRect(), position),
            );
        };

        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isMenuOpen, position, usePortal]);

    const handleIconClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const menuContent = items.map((group, i) => (
        <Fragment key={i}>
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
        </Fragment>
    ));

    const menu = usePortal ? (
        createPortal(
            <S.MenuBlockPortal
                ref={menuRef}
                style={{ top: menuPosition.top, left: menuPosition.left }}
            >
                {menuContent}
            </S.MenuBlockPortal>,
            document.body,
        )
    ) : (
        <S.MenuBlock ref={menuRef} position={position}>
            {menuContent}
        </S.MenuBlock>
    );

    return (
        <S.Container>
            <div id={id} ref={menuButtonRef} onClick={handleIconClick}>
                {children ? children : <S.IconStyled iconName={Icons.MoreVert} />}
            </div>

            {isMenuOpen && menu}
        </S.Container>
    );
};
