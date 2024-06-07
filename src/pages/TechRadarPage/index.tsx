import React, { useEffect, useState } from 'react';

import { useGetAllTechnologiesQuery } from 'api/queries/technologies';

import { Filters, LeftMenu, Legend, Radar, RingRadar, TopMenu } from './components';
import * as C from './const';
import * as T from './types';
import * as S from './units';
import { itemFilterHandler } from './utils';

export const TechRadarPage = () => {
    const { data: techRadarData } = useGetAllTechnologiesQuery();

    const [search, setSearch] = useState('');
    const [filterValue, setFilterValue] = useState<string | null>(null);

    const filteredItems = (techRadarData ?? []).filter((item) =>
        itemFilterHandler(item, search, filterValue),
    );

    const [isSubMenu, setSubMenu] = useState(false);

    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const [activeRing, setActiveRing] = useState<T.TRing | null>(null);

    const [viewBox, setViewBox] = useState(C.defautltViewBox);

    const [hintText, setHintText] = useState('');

    /* говорит приближен ли квадрант */
    const [isZoomed, setZoomed] = useState(false);

    /* это надо чтобы поиск элемента в меню происходил только после клика по кружку на радаре */
    const [showInMenu, setShowInMenu] = useState(false);

    /* данные для расположения названий кругов */
    const [topTitlesPosition, setTopTitlesPosition] = useState(C.defautltTitlesTop);
    const [leftTitlesPosition, setLeftTitlesPosition] = useState(50);

    const [isElementSelected, setElementSelected] = useState(false);
    const [prevHintText, setPrevHintText] = useState('');

    useEffect(() => {
        if (showInMenu) {
            setPrevHintText(hintText);

            setElementSelected(true);
        }
    }, [showInMenu]);

    useEffect(() => {
        if (hintText !== prevHintText) {
            setElementSelected(false);
        }
    }, [hintText]);

    const clearFilters = () => {
        setViewBox(C.defautltViewBox);

        setZoomed(false);

        setSubMenu(false);

        setLeftTitlesPosition(50);

        setActiveMenuItem(0);

        setActiveRing(null);

        setTopTitlesPosition(C.defautltTitlesTop);
    };

    useEffect(() => {
        switch (activeRing) {
            case 'hold':
                setActiveMenuItem(5);
                break;

            case 'assess':
                setActiveMenuItem(6);
                break;

            case 'trial':
                setActiveMenuItem(7);
                break;

            case 'adopt':
                setActiveMenuItem(8);
                break;

            default:
                setActiveMenuItem(0);
        }
    }, [activeRing]);

    /* в зависимости от меню приближается нужный квадрант */
    useEffect(() => {
        if (activeMenuItem === 1) {
            setViewBox({ x: -45.65, y: -45, width: 45, height: 45 });

            setLeftTitlesPosition(100);

            setTopTitlesPosition({ hold: 0, assess: 155, trial: 310, adopt: 468 });

            setZoomed(true);
        } else if (activeMenuItem === 2) {
            setViewBox({ x: 0.65, y: -45, width: 45, height: 45 });

            setLeftTitlesPosition(0);

            setTopTitlesPosition({ hold: 0, assess: 155, trial: 310, adopt: 468 });

            setZoomed(true);
        } else if (activeMenuItem === 3) {
            setViewBox({ x: 0.65, y: 0, width: 45, height: 45 });

            setLeftTitlesPosition(0);

            setTopTitlesPosition({ hold: 698, assess: 543, trial: 387, adopt: 231 });

            setZoomed(true);
        } else if (activeMenuItem === 4) {
            setViewBox({ x: -45.65, y: 0, width: 45, height: 45 });

            setLeftTitlesPosition(100);

            setTopTitlesPosition({ hold: 698, assess: 543, trial: 387, adopt: 231 });

            setZoomed(true);
        } else if (activeMenuItem === 5) {
            setActiveRing('hold');
        } else if (activeMenuItem === 6) {
            setActiveRing('assess');
        } else if (activeMenuItem === 7) {
            setActiveRing('trial');
        } else if (activeMenuItem === 8) {
            setActiveRing('adopt');
        }

        if (activeMenuItem === 0) {
            clearFilters();
        }
    }, [activeMenuItem]);

    /* выбор определеноого круга */
    const handleRing = (ring: 'hold' | 'assess' | 'trial' | 'adopt') => {
        if (ring === activeRing) {
            setActiveRing(null);

            setSubMenu(false);
        } else {
            setActiveRing(ring);

            setSubMenu(true);

            setZoomed(false);
        }
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <S.TitleWrapper>
                    <S.Title>Технорадар</S.Title>
                </S.TitleWrapper>

                <TopMenu {...{ activeMenuItem, setActiveMenuItem, isSubMenu }} />

                <Filters
                    search={search}
                    filterValue={filterValue}
                    activeMenuItem={activeMenuItem}
                    filteredItems={filteredItems}
                    setActiveMenuItem={setActiveMenuItem}
                    setActiveRing={setActiveRing}
                    setHintText={setHintText}
                    setSearch={setSearch}
                    setFilterValue={setFilterValue}
                    setShowInMenu={setShowInMenu}
                />
            </S.Header>

            {techRadarData && techRadarData.length > 0 && (
                <S.ContentWrapper>
                    <LeftMenu
                        data={filteredItems}
                        {...{
                            hintText,
                            setHintText,
                            activeRing,
                            activeMenuItem,
                            isZoomed,
                            showInMenu,
                            setShowInMenu,
                        }}
                    />

                    <S.RadarsContainer>
                        <RingRadar
                            data={(techRadarData ?? []).filter((item) => item.ring.id === 4)}
                            isActive={activeMenuItem === 5}
                            color="#B6B7BF"
                            ring="hold"
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                                filterValue,
                            }}
                        />

                        <RingRadar
                            data={(techRadarData ?? []).filter((item) => item.ring.id === 3)}
                            isActive={activeMenuItem === 6}
                            color="var(--color-palette-blue-300)"
                            ring="assess"
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                                filterValue,
                            }}
                        />

                        <RingRadar
                            data={(techRadarData ?? []).filter((item) => item.ring.id === 2)}
                            isActive={activeMenuItem === 7}
                            color="var(--color-palette-amber-300)"
                            ring="trial"
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                                filterValue,
                            }}
                        />

                        <RingRadar
                            data={(techRadarData ?? []).filter((item) => item.ring.id === 1)}
                            isActive={activeMenuItem === 8}
                            color="var(--color-chart-green-active)"
                            ring="adopt"
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                                filterValue,
                            }}
                        />

                        <Radar
                            data={techRadarData ?? []}
                            isActive={!activeRing}
                            {...{
                                viewBox,
                                isZoomed,
                                topTitlesPosition,
                                leftTitlesPosition,
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                                filterValue,
                            }}
                        />

                        <Legend />
                    </S.RadarsContainer>
                </S.ContentWrapper>
            )}
        </S.PageWrapper>
    );
};
