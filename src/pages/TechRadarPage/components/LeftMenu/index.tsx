import React, { FC, useEffect, useRef, useState } from 'react';

import { MenuElement } from './MenuElement';
import * as T from './types';
import * as S from './units';

export const LeftMenu: FC<T.ILeftMenu> = (props) => {
    const [isFirstOpen, setFirstOpen] = useState(false);
    const [isSecondOpen, setSecondOpen] = useState(false);
    const [isThirdOpen, setThirdOpen] = useState(false);
    const [isFourOpen, setFourOpen] = useState(false);

    const [isHoverInMenu, setHoverInMenu] = useState(false);

    const firstQuadrant = props.data.filter((item) => item.quadrant === 0);
    const secondQuadrant = props.data.filter((item) => item.quadrant === 1);
    const thirdQuadrant = props.data.filter((item) => item.quadrant === 2);
    const fourQuadrant = props.data.filter((item) => item.quadrant === 3);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuRef.current && menuRef.current.children.length && !isHoverInMenu) {
            const menuBlocks = Array.from(menuRef.current.getElementsByClassName('menuBlock'));
            const menuItems = Array.from(menuRef.current.getElementsByClassName('menuItem'));

            const selectedElement = menuItems.find((item) => item.innerHTML === props.hintText);

            if (!!selectedElement && props.showInMenu) {
                const parentElement = selectedElement.closest('.menuBlock');

                const activeBlockIndex = !!parentElement
                    ? menuBlocks.findIndex((item) => item.isEqualNode(parentElement))
                    : null;

                if (menuBlocks.length === 4) {
                    switch (activeBlockIndex) {
                        case 0:
                            setFirstOpen(true);
                            setSecondOpen(false);
                            setThirdOpen(false);
                            setFourOpen(false);
                            break;

                        case 1:
                            setSecondOpen(true);
                            setFirstOpen(false);
                            setThirdOpen(false);
                            setFourOpen(false);
                            break;

                        case 2:
                            setThirdOpen(true);
                            setFirstOpen(false);
                            setSecondOpen(false);
                            setFourOpen(false);
                            break;

                        case 3:
                            setFourOpen(true);
                            setFirstOpen(false);
                            setSecondOpen(false);
                            setThirdOpen(false);
                            break;
                    }
                } else {
                    setFirstOpen(true);
                    setSecondOpen(true);
                    setThirdOpen(true);
                    setFourOpen(true);
                }

                setTimeout(
                    () => {
                        selectedElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });

                        props.setShowInMenu(false);
                    },

                    450,
                );
            }
        }
    }, [menuRef, props.hintText, props.showInMenu]);

    return (
        <S.Wrapper ref={menuRef} withScroll>
            {(props.isZoomed ? props.activeMenuItem === 1 : true) && (
                <MenuElement
                    title="Техники и принципы"
                    isOpen={isFirstOpen}
                    setOpen={setFirstOpen}
                    data={firstQuadrant}
                    activeRing={props.activeRing}
                    hintText={props.hintText}
                    setHintText={props.setHintText}
                    {...{ setHoverInMenu }}
                />
            )}

            {(props.isZoomed ? props.activeMenuItem === 2 : true) && (
                <MenuElement
                    title="Языки и фреймворки"
                    isOpen={isSecondOpen}
                    setOpen={setSecondOpen}
                    data={secondQuadrant}
                    activeRing={props.activeRing}
                    hintText={props.hintText}
                    setHintText={props.setHintText}
                    {...{ setHoverInMenu }}
                />
            )}

            {(props.isZoomed ? props.activeMenuItem === 3 : true) && (
                <MenuElement
                    title="Инструменты"
                    isOpen={isThirdOpen}
                    setOpen={setThirdOpen}
                    data={thirdQuadrant}
                    activeRing={props.activeRing}
                    hintText={props.hintText}
                    setHintText={props.setHintText}
                    {...{ setHoverInMenu }}
                />
            )}

            {(props.isZoomed ? props.activeMenuItem === 4 : true) && (
                <MenuElement
                    title="Платформы и инфракструктура"
                    isOpen={isFourOpen}
                    setOpen={setFourOpen}
                    data={fourQuadrant}
                    activeRing={props.activeRing}
                    hintText={props.hintText}
                    setHintText={props.setHintText}
                    {...{ setHoverInMenu }}
                />
            )}
        </S.Wrapper>
    );
};
