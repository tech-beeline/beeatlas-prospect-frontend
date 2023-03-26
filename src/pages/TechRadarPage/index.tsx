import React, { useEffect, useState } from 'react';

import { Adopt, Assess, Hold, LeftMenu, Radar, TopMenu, Trial } from './components';
import * as C from './const';
import * as T from './types';
import * as S from './units';

export const TechRadarPage = () => {
    const [isSubMenu, setSubMenu] = useState(false);

    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const [activeRing, setActiveRing] = useState<T.TRing | null>(null);

    const [viewBox, setViewBox] = useState(C.defautltViewBox);

    const [hintText, setHintText] = useState('');

    /* говорит приближенли квадрант */
    const [isZoomed, setZoomed] = useState(false);

    /* это надо чтобы поиск элемента в меню происходил только после клика по кружку на радаре */
    const [showInMenu, setShowInMenu] = useState(false);

    /* данные для расположения названий кругов */
    const [topTitlesPosition, setTopTitlesPosition] = useState(C.defautltTitlesTop);
    const [leftTitlesPosition, setLeftTitlesPosition] = useState(50);

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

                    <S.SubTitle>(версия от 10.2022)</S.SubTitle>

                    {/* <S.SelectIcon /> */}
                </S.TitleWrapper>

                <TopMenu {...{ activeMenuItem, setActiveMenuItem, isSubMenu }} />
            </S.Header>

            <S.ContentWrapper>
                <LeftMenu
                    data={C.testData}
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
                    data={C.testData.filter((item) => item.ring === 3)}
                    isActive={activeRing === 'hold'}
                    {...{ handleRing, hintText, setHintText, setShowInMenu }}
                />

                <Assess
                    data={C.testData.filter((item) => item.ring === 2)}
                    isActive={activeRing === 'assess'}
                    {...{ handleRing, hintText, setHintText, setShowInMenu }}
                />

                <Trial
                    data={C.testData.filter((item) => item.ring === 1)}
                    isActive={activeRing === 'trial'}
                    {...{ handleRing, hintText, setHintText, setShowInMenu }}
                />

                <Adopt
                    data={C.testData.filter((item) => item.ring === 0)}
                    isActive={activeRing === 'adopt'}
                    {...{ handleRing, hintText, setHintText, setShowInMenu }}
                />

                <Radar
                    data={C.testData}
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
                    }}
                />
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
