import React, { useEffect, useState } from 'react';

import { useGetTechradarDataQuery } from 'api/queries/techradar';

import { Adopt, Assess, Filters, Hold, LeftMenu, Radar, TopMenu, Trial } from './components';
import * as C from './const';
import * as T from './types';
import * as S from './units';

export const TechRadarPage = () => {
    const { data: techRadarData } = useGetTechradarDataQuery();

    const [search, setSearch] = useState('');

    // @TODO: Генерировать типы
    const techRadarContent: T.IData[] = (techRadarData?.content as T.IData[]) ?? [];

    const filteredItems = techRadarContent.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
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
            setViewBox({ x: -45, y: -45, width: 45, height: 45 });

            setLeftTitlesPosition(100);

            setTopTitlesPosition({ hold: 0, assess: 155, trial: 310, adopt: 468 });

            setZoomed(true);
        } else if (activeMenuItem === 2) {
            setViewBox({ x: 0, y: -45, width: 45, height: 45 });

            setLeftTitlesPosition(0);

            setTopTitlesPosition({ hold: 0, assess: 155, trial: 310, adopt: 468 });

            setZoomed(true);
        } else if (activeMenuItem === 3) {
            setViewBox({ x: 0, y: 0, width: 45, height: 45 });

            setLeftTitlesPosition(0);

            setTopTitlesPosition({ hold: 698, assess: 543, trial: 387, adopt: 231 });

            setZoomed(true);
        } else if (activeMenuItem === 4) {
            setViewBox({ x: -45, y: 0, width: 45, height: 45 });

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

                    {techRadarData && <S.SubTitle>{techRadarData.descr}</S.SubTitle>}
                </S.TitleWrapper>

                <TopMenu {...{ activeMenuItem, setActiveMenuItem, isSubMenu }} />

                <Filters
                    search={search}
                    activeMenuItem={activeMenuItem}
                    filteredItems={filteredItems}
                    setActiveMenuItem={setActiveMenuItem}
                    setActiveRing={setActiveRing}
                    setHintText={setHintText}
                    setSearch={setSearch}
                    setShowInMenu={setShowInMenu}
                />
            </S.Header>

            {techRadarContent.length > 0 && (
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
                        <Hold
                            data={techRadarContent.filter((item) => item.ring === 3)}
                            isActive={activeMenuItem === 5}
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                            }}
                        />

                        <Assess
                            data={techRadarContent.filter((item) => item.ring === 2)}
                            isActive={activeMenuItem === 6}
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                            }}
                        />

                        <Trial
                            data={techRadarContent.filter((item) => item.ring === 1)}
                            isActive={activeMenuItem === 7}
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                            }}
                        />

                        <Adopt
                            data={techRadarContent.filter((item) => item.ring === 0)}
                            isActive={activeMenuItem === 8}
                            {...{
                                handleRing,
                                hintText,
                                setHintText,
                                setShowInMenu,
                                isElementSelected,
                                search,
                            }}
                        />

                        <Radar
                            data={techRadarContent}
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
                            }}
                        />
                    </S.RadarsContainer>
                </S.ContentWrapper>
            )}
        </S.PageWrapper>
    );
};
