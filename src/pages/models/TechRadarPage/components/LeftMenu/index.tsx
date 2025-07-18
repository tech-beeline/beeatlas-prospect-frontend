import React, { FC, useEffect, useRef, useState } from 'react';

import emptyBox from './images/empty-box.png';

import { MenuElement } from './components';
import * as T from './types';
import * as S from './units';

export const LeftMenu: FC<T.ILeftMenu> = ({
    activeMenuItem,
    data,
    isZoomed,
    selectedTech,
    activeRing,
    hoveredTechId,
    setHoveredTechId,
}) => {
    const [isFirstOpen, setFirstOpen] = useState(false);
    const [isSecondOpen, setSecondOpen] = useState(false);
    const [isThirdOpen, setThirdOpen] = useState(false);
    const [isFourOpen, setFourOpen] = useState(false);

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
                        hoveredTechId={hoveredTechId}
                        hidden={isZoomed && activeMenuItem !== 1}
                        selectedTech={selectedTech}
                        setHoveredTechId={setHoveredTechId}
                    />

                    <MenuElement
                        title="Платформа и инфраструктура"
                        analyticsName="platform"
                        isOpen={isSecondOpen}
                        setOpen={setSecondOpen}
                        data={secondSector}
                        activeRing={activeRing}
                        hoveredTechId={hoveredTechId}
                        hidden={isZoomed && activeMenuItem !== 2}
                        selectedTech={selectedTech}
                        setHoveredTechId={setHoveredTechId}
                    />

                    <MenuElement
                        title="Управление данными"
                        analyticsName="data"
                        isOpen={isThirdOpen}
                        setOpen={setThirdOpen}
                        data={thirdSector}
                        activeRing={activeRing}
                        hoveredTechId={hoveredTechId}
                        hidden={isZoomed && activeMenuItem !== 3}
                        selectedTech={selectedTech}
                        setHoveredTechId={setHoveredTechId}
                    />

                    <MenuElement
                        title="Языки"
                        analyticsName="language"
                        isOpen={isFourOpen}
                        setOpen={setFourOpen}
                        data={fourthSector}
                        activeRing={activeRing}
                        hoveredTechId={hoveredTechId}
                        hidden={isZoomed && activeMenuItem !== 4}
                        selectedTech={selectedTech}
                        setHoveredTechId={setHoveredTechId}
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
