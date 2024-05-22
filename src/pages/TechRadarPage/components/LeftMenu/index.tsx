import React, { FC, useEffect, useRef, useState } from 'react';
import { unescape } from 'lodash';

import emptyBox from './images/empty-box.png';

import { MenuElement } from './components';
import * as T from './types';
import * as S from './units';

export const LeftMenu: FC<T.ILeftMenu> = (props) => {
    const [isFirstOpen, setFirstOpen] = useState(false);
    const [isSecondOpen, setSecondOpen] = useState(false);
    const [isThirdOpen, setThirdOpen] = useState(false);
    const [isFourOpen, setFourOpen] = useState(false);

    const [isHoverInMenu, setHoverInMenu] = useState(false);

    const firstSector = props.data.filter((item) => item.sector.id === 1);
    const secondSector = props.data.filter((item) => item.sector.id === 2);
    const thirdSector = props.data.filter((item) => item.sector.id === 3);
    const fourthSector = props.data.filter((item) => item.sector.id === 4);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.activeMenuItem === 1) {
            setFirstOpen(true);
        }
        if (props.activeMenuItem === 2) {
            setSecondOpen(true);
        }
        if (props.activeMenuItem === 3) {
            setThirdOpen(true);
        }
        if (props.activeMenuItem === 4) {
            setFourOpen(true);
        }
        if (props.activeMenuItem === 0) {
            setFirstOpen(false);
            setSecondOpen(false);
            setThirdOpen(false);
            setFourOpen(false);
        }
    }, [props.activeMenuItem]);

    useEffect(() => {
        if (menuRef.current && menuRef.current.children.length && !isHoverInMenu) {
            const menuBlocks = Array.from(menuRef.current.getElementsByClassName('menuBlock'));
            const menuItems = Array.from(menuRef.current.getElementsByClassName('menuItem'));

            const selectedElement = menuItems.find(
                (item) => unescape(item.innerHTML) === props.hintText,
            );

            if (!!selectedElement && props.showInMenu) {
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

                        props.setShowInMenu(false);
                    },

                    450,
                );
            }
        }
    }, [menuRef, props.hintText, props.showInMenu]);

    return (
        <S.Wrapper ref={menuRef} withScroll>
            {props.data.length > 0 && (
                <>
                    <MenuElement
                        title="Фреймворки и инструменты"
                        analyticsName="framework"
                        isOpen={isFirstOpen}
                        setOpen={setFirstOpen}
                        data={firstSector}
                        activeRing={props.activeRing}
                        hintText={props.hintText}
                        setHintText={props.setHintText}
                        hidden={props.isZoomed && props.activeMenuItem !== 1}
                        {...{ setHoverInMenu }}
                    />

                    <MenuElement
                        title="Платформа и инфраструктура"
                        analyticsName="platform"
                        isOpen={isSecondOpen}
                        setOpen={setSecondOpen}
                        data={secondSector}
                        activeRing={props.activeRing}
                        hintText={props.hintText}
                        setHintText={props.setHintText}
                        hidden={props.isZoomed && props.activeMenuItem !== 2}
                        {...{ setHoverInMenu }}
                    />

                    <MenuElement
                        title="Управление данными"
                        analyticsName="data"
                        isOpen={isThirdOpen}
                        setOpen={setThirdOpen}
                        data={thirdSector}
                        activeRing={props.activeRing}
                        hintText={props.hintText}
                        setHintText={props.setHintText}
                        hidden={props.isZoomed && props.activeMenuItem !== 3}
                        {...{ setHoverInMenu }}
                    />

                    <MenuElement
                        title="Языки"
                        analyticsName="language"
                        isOpen={isFourOpen}
                        setOpen={setFourOpen}
                        data={fourthSector}
                        activeRing={props.activeRing}
                        hintText={props.hintText}
                        setHintText={props.setHintText}
                        hidden={props.isZoomed && props.activeMenuItem !== 4}
                        {...{ setHoverInMenu }}
                    />
                </>
            )}

            {props.data.length === 0 && (
                <S.NoData>
                    <S.NoDataImage src={emptyBox} />
                    <S.NoDataTitle>Нет результатов, подходящих под параметры поиска</S.NoDataTitle>
                    <S.NoDataDescription>Попробуйте изменить запрос</S.NoDataDescription>
                </S.NoData>
            )}
        </S.Wrapper>
    );
};
