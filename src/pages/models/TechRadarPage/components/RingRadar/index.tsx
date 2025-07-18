import React, { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import { sendAnalytics } from 'features/analytics';

import { ITech } from 'api/technologies/types';
import * as STYLE from 'pages/models/TechRadarPage/units';
import * as UTILS from 'pages/models/TechRadarPage/utils';

import { Lines } from '../Lines';
import { QuadrantTitles } from '../QuadrantTitles';
import { RingTitles } from '../RingTitles';

import * as T from './types';

export const RingRadar: FC<T.IRingRadar> = ({
    color,
    data,
    filterValue,
    criticalValue,
    handleRing,
    hoveredTechId,
    isActive,
    ring,
    search,
    setHoveredTechId,
}) => {
    const lastClickedTechId = useRef<number | null>(null);

    /* реф для запуска симуляции с помощью D3 */
    const svgRef = useRef<SVGSVGElement>(null);

    /* данные для отрисовки точек дополненые координатами и нкобходимыми функциями */
    const formatedData = data
        .filter(
            (item) =>
                item.sector.order >= 0 &&
                item.sector.order <= 3 &&
                item.ring.order >= 0 &&
                item.ring.order <= 3,
        )
        .map((item) => {
            const itemSegment = UTILS.segment(item.sector.order, item.ring.order, true);
            const coords = itemSegment.random();

            return {
                ...item,
                isNewTech: Math.abs(dayjs(item.createdDate).diff(new Date(), 'days')) <= 30,
                isUpdatedTech:
                    Math.abs(dayjs(item.lastModifiedDate).diff(new Date(), 'days')) <= 30,
                segment: itemSegment,
                x: coords.x,
                y: coords.y,
                visible: UTILS.itemFilterHandler(item, search, filterValue, criticalValue),
            };
        });

    /* тут запускается симуляция D3 для избежания пересечений между точками */
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const blips = svg.selectAll('.point').data(formatedData);

        const ticked = () => {
            blips.attr('transform', (d: any) => {
                return UTILS.translate(d.segment.clipx(d), d.segment.clipy(d));
            });
        };

        d3.forceSimulation()
            .nodes(formatedData)
            .velocityDecay(0.2)
            .force('collision', d3.forceCollide().radius(1.3).strength(1))
            .on('tick', ticked);
    }, []);

    useEffect(() => {
        const tooltip = document.getElementById('general-tooltip');

        if (hoveredTechId) {
            const target = document.getElementById(`radar-element-${hoveredTechId}`);
            if (tooltip && target) {
                tooltip.innerHTML = target.dataset.title ?? '';
                tooltip.style.display = 'block';
                tooltip.style.opacity = '1';
                tooltip.style.left =
                    target.getBoundingClientRect().x -
                    tooltip.clientWidth / 2 +
                    target.getBoundingClientRect().width / 2 +
                    'px';
                tooltip.style.top = target.getBoundingClientRect().y - 29 + 'px';
            }
        } else {
            if (tooltip) {
                tooltip.style.display = 'none';
                tooltip.style.opacity = '0';
            }
        }
    }, [hoveredTechId]);

    const handleMouseEnter = (id: number) => {
        setHoveredTechId(id);
    };

    const handleMouseLeave = (id: number) => {
        if (id !== lastClickedTechId.current) {
            setHoveredTechId(null);
        }
    };

    const handleTechClick = (tech: ITech) => {
        lastClickedTechId.current = tech.id;
        UTILS.openTechInLeftMenu(tech.id);
        sendAnalytics(['techradar', 'click', tech.label]);
    };

    return (
        <STYLE.RadarWrapper isActive={isActive}>
            <RingTitles type={ring} handleRing={handleRing} />

            <svg ref={svgRef} viewBox="-45 -45 90 90">
                <QuadrantTitles />

                <g>
                    <Lines />

                    <circle cx={0} cy={0} r={45} stroke={color} strokeWidth="0.2" fill="none" />

                    {formatedData.map((point, i) => {
                        return point.isNewTech ? (
                            <STYLE.CircleStyled
                                id={isActive ? `radar-element-${point.id}` : ''}
                                data-title={point.label}
                                className="point"
                                key={i}
                                cx={0}
                                cy={0}
                                r={1}
                                isVisible={point.visible}
                                fill="var(--color-background-base)"
                                strokeWidth={0.2}
                                stroke={color}
                                onMouseEnter={() => handleMouseEnter(point.id)}
                                onMouseLeave={() => handleMouseLeave(point.id)}
                                onClick={() => handleTechClick(point)}
                            />
                        ) : point.isUpdatedTech ? (
                            <STYLE.PolygonStyled
                                id={isActive ? `radar-element-${point.id}` : ''}
                                data-title={point.label}
                                className="point"
                                key={i}
                                points="-0.8,0.8 0,-0.6 0.8,0.8"
                                strokeLinejoin="round"
                                strokeWidth={0.2}
                                stroke={color}
                                fill={color}
                                isVisible={point.visible}
                                onMouseEnter={() => handleMouseEnter(point.id)}
                                onMouseLeave={() => handleMouseLeave(point.id)}
                                onClick={() => handleTechClick(point)}
                            />
                        ) : (
                            <STYLE.CircleStyled
                                id={isActive ? `radar-element-${point.id}` : ''}
                                data-title={point.label}
                                className="point"
                                key={i}
                                cx={0}
                                cy={0}
                                r={1}
                                isVisible={point.visible}
                                fill={color}
                                onMouseEnter={() => handleMouseEnter(point.id)}
                                onMouseLeave={() => handleMouseLeave(point.id)}
                                onClick={() => handleTechClick(point)}
                            />
                        );
                    })}
                </g>
            </svg>

            {isActive && <STYLE.TooltipContainerNew id="general-tooltip" />}
        </STYLE.RadarWrapper>
    );
};
