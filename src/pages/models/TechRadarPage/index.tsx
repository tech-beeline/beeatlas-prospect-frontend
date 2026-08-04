import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetAllTechnologiesQuery } from 'api/queries/technologies';
import { ITech } from 'api/technologies/types';

import {
    ExportButton,
    Filters,
    LeftMenu,
    Legend,
    Radar,
    RingRadar,
    TechnologySideblock,
    TopMenu,
} from './components';
import * as C from './const';
import * as T from './types';
import * as S from './units';
import { itemFilterHandler, openTechInLeftMenu } from './utils';

export const TechRadarPage = () => {
    const [hoveredTechId, setHoveredTechId] = useState<number | null>(null);
    const [selectedTech, setSelectedTech] = useState<ITech | null>(null);
    const [params, setSearchParams] = useSearchParams();
    const [isFirstId, setIsFirstId] = useState(true);
    const id = params.get('id');

    const { data: techRadarData } = useGetAllTechnologiesQuery();

    const [search, setSearch] = useState('');
    const [filterValue, setFilterValue] = useState<string | null>(null);
    const [criticalValue, setCriticalValue] = useState(false);

    const filteredItems = (techRadarData ?? []).filter((item) =>
        itemFilterHandler(item, search, filterValue, criticalValue),
    );

    useEffect(() => {
        setHoveredTechId(null);
    }, [filterValue]);

    const [isSubMenu, setSubMenu] = useState(false);

    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const [activeRing, setActiveRing] = useState<T.TRing | null>(null);

    const [viewBox, setViewBox] = useState(C.defautltViewBox);

    /* говорит приближен ли квадрант */
    const [isZoomed, setZoomed] = useState(false);

    /* данные для расположения названий кругов */
    const [topTitlesPosition, setTopTitlesPosition] = useState(C.defautltTitlesTop);
    const [leftTitlesPosition, setLeftTitlesPosition] = useState(50);

    const [isElementSelected] = useState(false);

    useEffect(() => {
        if (id && techRadarData) {
            const tech = techRadarData.find((tech) => tech.id === Number(id));
            if (tech) {
                setSelectedTech(tech);
                setHoveredTechId(tech.id);

                // Для скролла при открытии страницы с заданным id
                if (isFirstId) {
                    openTechInLeftMenu(tech.id);
                    // setShowInMenu(true);
                    setIsFirstId(false);
                }
            }
        } else if (techRadarData) {
            setIsFirstId(false);
            setSelectedTech(null);
        } else {
            setSelectedTech(null);
        }
    }, [id, techRadarData]);

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
        setHoveredTechId(null);

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
        setHoveredTechId(null);

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
            <S.PageContainer>
                <S.Header>
                    <S.TitleWrapper>
                        <S.Title>Технорадар</S.Title>
                        <ExportButton />
                    </S.TitleWrapper>

                    <TopMenu {...{ activeMenuItem, setActiveMenuItem, isSubMenu }} />

                    <Filters
                        search={search}
                        filterValue={filterValue}
                        criticalValue={criticalValue}
                        activeMenuItem={activeMenuItem}
                        filteredItems={filteredItems}
                        setHoveredTechId={setHoveredTechId}
                        setActiveMenuItem={setActiveMenuItem}
                        setActiveRing={setActiveRing}
                        setSearch={setSearch}
                        setFilterValue={setFilterValue}
                        setCriticalValue={setCriticalValue}
                    />
                </S.Header>

                {techRadarData && techRadarData.length > 0 && (
                    <S.ContentWrapper>
                        <LeftMenu
                            data={filteredItems}
                            hoveredTechId={hoveredTechId}
                            setHoveredTechId={setHoveredTechId}
                            selectedTech={selectedTech}
                            activeRing={activeRing}
                            activeMenuItem={activeMenuItem}
                            isZoomed={isZoomed}
                        />

                        <S.RadarsContainer>
                            <Radar
                                data={techRadarData ?? []}
                                isActive={!activeRing}
                                hoveredTechId={hoveredTechId}
                                setHoveredTechId={setHoveredTechId}
                                viewBox={viewBox}
                                isZoomed={isZoomed}
                                topTitlesPosition={topTitlesPosition}
                                leftTitlesPosition={leftTitlesPosition}
                                handleRing={handleRing}
                                search={search}
                                filterValue={filterValue}
                                criticalValue={criticalValue}
                            />

                            <RingRadar
                                data={(techRadarData ?? []).filter((item) => item.ring.id === 4)}
                                isActive={activeMenuItem === 5}
                                color="#B6B7BF"
                                ring="hold"
                                handleRing={handleRing}
                                isElementSelected={isElementSelected}
                                search={search}
                                filterValue={filterValue}
                                criticalValue={criticalValue}
                                hoveredTechId={hoveredTechId}
                                setHoveredTechId={setHoveredTechId}
                            />

                            <RingRadar
                                data={(techRadarData ?? []).filter((item) => item.ring.id === 3)}
                                isActive={activeMenuItem === 6}
                                color="var(--color-palette-blue-300)"
                                ring="assess"
                                handleRing={handleRing}
                                isElementSelected={isElementSelected}
                                search={search}
                                filterValue={filterValue}
                                criticalValue={criticalValue}
                                hoveredTechId={hoveredTechId}
                                setHoveredTechId={setHoveredTechId}
                            />

                            <RingRadar
                                data={(techRadarData ?? []).filter((item) => item.ring.id === 2)}
                                isActive={activeMenuItem === 7}
                                color="var(--color-palette-amber-300)"
                                ring="trial"
                                handleRing={handleRing}
                                isElementSelected={isElementSelected}
                                search={search}
                                filterValue={filterValue}
                                criticalValue={criticalValue}
                                hoveredTechId={hoveredTechId}
                                setHoveredTechId={setHoveredTechId}
                            />

                            <RingRadar
                                data={(techRadarData ?? []).filter((item) => item.ring.id === 1)}
                                isActive={activeMenuItem === 8}
                                color="var(--color-chart-green-active)"
                                ring="adopt"
                                handleRing={handleRing}
                                isElementSelected={isElementSelected}
                                search={search}
                                filterValue={filterValue}
                                criticalValue={criticalValue}
                                hoveredTechId={hoveredTechId}
                                setHoveredTechId={setHoveredTechId}
                            />

                            <Legend />
                        </S.RadarsContainer>
                    </S.ContentWrapper>
                )}
            </S.PageContainer>
            <TechnologySideblock
                selectedTech={selectedTech}
                isOpen={!!selectedTech}
                onClose={() => {
                    setSearchParams({});
                }}
            />
        </S.PageWrapper>
    );
};
