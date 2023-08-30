import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { useMountEffect } from 'hooks';
import { useRootStore } from 'stores/initStore';

import { Adopt, Assess, Hold, LeftMenu, Radar, TopMenu, Trial } from './components';
import * as C from './const';
import * as T from './types';
import * as S from './units';

export const TechRadarPage = observer(() => {
    const {
        generalStore: { techRadarData, getTechRadar },
    } = useRootStore();

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

    useMountEffect(() => {
        getTechRadar();
    });

    // useEffect(() => {
    //     console.log('techRadarData', techRadarData);
    // }, [techRadarData]);

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

                    <S.SubTitle>(версия от 08.2023)</S.SubTitle>
                </S.TitleWrapper>

                <TopMenu {...{ activeMenuItem, setActiveMenuItem, isSubMenu }} />
            </S.Header>

            {techRadarData.length > 0 && (
                <S.ContentWrapper>
                    <LeftMenu
                        data={techRadarData}
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

                    <Hold
                        data={techRadarData.filter((item) => item.ring === 3)}
                        isActive={activeRing === 'hold'}
                        {...{ handleRing, hintText, setHintText, setShowInMenu, isElementSelected }}
                    />

                    <Assess
                        data={techRadarData.filter((item) => item.ring === 2)}
                        isActive={activeRing === 'assess'}
                        {...{ handleRing, hintText, setHintText, setShowInMenu, isElementSelected }}
                    />

                    <Trial
                        data={techRadarData.filter((item) => item.ring === 1)}
                        isActive={activeRing === 'trial'}
                        {...{ handleRing, hintText, setHintText, setShowInMenu, isElementSelected }}
                    />

                    <Adopt
                        data={techRadarData.filter((item) => item.ring === 0)}
                        isActive={activeRing === 'adopt'}
                        {...{ handleRing, hintText, setHintText, setShowInMenu, isElementSelected }}
                    />

                    <Radar
                        data={techRadarData}
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
                        }}
                    />
                </S.ContentWrapper>
            )}
        </S.PageWrapper>
    );
});
