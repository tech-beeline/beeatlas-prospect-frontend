import React, { FC, useEffect, useRef, useState } from 'react';
import { unescape } from 'lodash';

import emptyBox from './images/empty-box.png';

import { MenuElement } from './components';
import * as T from './types';
import * as S from './units';

export const LeftMenu: FC<T.ILeftMenu> = ({
    activeMenuItem,
    data,
    hintText,
    isZoomed,
    selectedTech,
    setHintText,
    setSelectedTech,
    setShowInMenu,
    showInMenu,
    activeRing,
}) => {
    const [isFirstOpen, setFirstOpen] = useState(false);
    const [isSecondOpen, setSecondOpen] = useState(false);
    const [isThirdOpen, setThirdOpen] = useState(false);
    const [isFourOpen, setFourOpen] = useState(false);

    const [isHoverInMenu, setHoverInMenu] = useState(false);

    const firstSector = data.filter((item) => item.sector.id === 1);
    const secondSector = data.filter((item) => item.sector.id === 2);
    const thirdSector = data.filter((item) => item.sector.id === 3);
    const fourthSector = data.filter((item) => item.sector.id === 4);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeMenuItem === 1) {
            setFirstOpen(true);
        }
        if (activeMenuItem === 2) {
            setSecondOpen(true);
        }
        if (activeMenuItem === 3) {
            setThirdOpen(true);
        }
        if (activeMenuItem === 4) {
            setFourOpen(true);
        }
        if (activeMenuItem === 0) {
            setFirstOpen(false);
            setSecondOpen(false);
            setThirdOpen(false);
            setFourOpen(false);
        }
    }, [activeMenuItem]);

    useEffect(() => {
        if (menuRef.current && menuRef.current.children.length && !isHoverInMenu) {
            const menuBlocks = Array.from(menuRef.current.getElementsByClassName('menuBlock'));
            const menuItems = Array.from(menuRef.current.getElementsByClassName('menuItem'));

            const selectedElement = menuItems.find((item) => unescape(item.innerHTML) === hintText);

            if (!!selectedElement && showInMenu) {
                const parentElement = selectedElement.closest('.menuBlock');

                const activeBlockIndex = !!parentElement
                    ? menuBlocks.findIndex((item) => item.isEqualNode(parentElement))
                    : null;

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

                setTimeout(
                    () => {
                        selectedElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });

                        setShowInMenu(false);
                    },

                    450,
                );
            }
        }
    }, [menuRef, hintText, showInMenu]);

    return (
        <S.Wrapper ref={menuRef} withScroll>
            {data.length > 0 && (
                <>
                    <MenuElement
                        title="Фреймворки и инструменты"
                        analyticsName="framework"
                        isOpen={isFirstOpen}
                        setOpen={setFirstOpen}
                        data={firstSector}
                        activeRing={activeRing}
                        hintText={hintText}
                        setHintText={setHintText}
                        hidden={isZoomed && activeMenuItem !== 1}
                        selectedTech={selectedTech}
                        setSelectedTech={setSelectedTech}
                        setHoverInMenu={setHoverInMenu}
                    />

                    <MenuElement
                        title="Платформа и инфраструктура"
                        analyticsName="platform"
                        isOpen={isSecondOpen}
                        setOpen={setSecondOpen}
                        data={secondSector}
                        activeRing={activeRing}
                        hintText={hintText}
                        setHintText={setHintText}
                        hidden={isZoomed && activeMenuItem !== 2}
                        selectedTech={selectedTech}
                        setSelectedTech={setSelectedTech}
                        setHoverInMenu={setHoverInMenu}
                    />

                    <MenuElement
                        title="Управление данными"
                        analyticsName="data"
                        isOpen={isThirdOpen}
                        setOpen={setThirdOpen}
                        data={thirdSector}
                        activeRing={activeRing}
                        hintText={hintText}
                        setHintText={setHintText}
                        hidden={isZoomed && activeMenuItem !== 3}
                        selectedTech={selectedTech}
                        setSelectedTech={setSelectedTech}
                        setHoverInMenu={setHoverInMenu}
                    />

                    <MenuElement
                        title="Языки"
                        analyticsName="language"
                        isOpen={isFourOpen}
                        setOpen={setFourOpen}
                        data={fourthSector}
                        activeRing={activeRing}
                        hintText={hintText}
                        setHintText={setHintText}
                        hidden={isZoomed && activeMenuItem !== 4}
                        selectedTech={selectedTech}
                        setSelectedTech={setSelectedTech}
                        setHoverInMenu={setHoverInMenu}
                    />
                </>
            )}

            {data.length === 0 && (
                <S.NoData>
                    <S.NoDataImage src={emptyBox} />
                    <S.NoDataTitle>Нет результатов, подходящих под параметры поиска</S.NoDataTitle>
                    <S.NoDataDescription>Попробуйте изменить запрос</S.NoDataDescription>
                </S.NoData>
            )}
        </S.Wrapper>
    );
};
