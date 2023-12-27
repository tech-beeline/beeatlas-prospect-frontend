import React, { FC, useEffect, useRef, useState } from 'react';
import { Popper } from 'react-popper';
import { animated, easings, useSpring } from 'react-spring';
import * as d3 from 'd3';
import { sendAnalytics } from 'features/analytics';

import { IData } from 'pages/TechRadarPage/types';
import * as STYLE from 'pages/TechRadarPage/units';
import * as UTILS from 'pages/TechRadarPage/utils';

import { Lines } from '../Lines';
import { QuadrantTitles } from '../QuadrantTitles';
import { RingTitles } from '../RingTitles';

import * as T from './types';

export const Radar: FC<T.IRadar> = (props) => {
    /* данные для расположения тултивов внутри свг */
    const [referenceElement, setReferenceElement] = useState<SVGCircleElement | null>(null);
    const refs = useRef<React.RefObject<SVGCircleElement>[]>([]);

    /* реф для запуска симуляции с помощью D3 */
    const svgRef = useRef<SVGSVGElement>(null);

    /* данные для отрисовки точек дополненые координатами и нкобходимыми функциями */
    const formatedData = props.data.map((item) => {
        const itemSegment = UTILS.segment(item.quadrant, item.ring);
        const coords = itemSegment.random();

        return {
            ...item,
            segment: itemSegment,
            x: coords.x,
            y: coords.y,
            visible: UTILS.itemFilterHandler(item, props.search, props.filterValue),
        };
    });

    const spring = useSpring({
        viewBox: `${props.viewBox.x} ${props.viewBox.y} ${props.viewBox.width} ${props.viewBox.height}`,
        config: { duration: 400, easing: easings.easeInOutQuad },
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

        d3.forceSimulation<IData>()
            .nodes(formatedData)
            /* скорость распределения шариков чем выше тем медленее, макс = 1 */
            .velocityDecay(0.5)
            /* 1.3 это расстояние между точками */
            .force('collision', d3.forceCollide().radius(1.3).strength(1))
            .on('tick', ticked);
    }, []);

    useEffect(() => {
        if (refs.current) {
            const activeItemIndex = formatedData.findIndex((item) => item.label === props.hintText);

            activeItemIndex >= 0 && setReferenceElement(refs.current[activeItemIndex].current);
        }
    }, [props.hintText]);

    /* показывает тултип */
    const onHintShow = (label: string) => {
        props.setHintText(label);
    };

    /* скрывает тултип */
    // const onHintHide = () => {
    //     props.setHintText('');
    // };

    const onHintHide = () => {
        !props.isElementSelected && props.setHintText('');
    };

    return (
        <STYLE.RadarWrapper isActive={props.isActive}>
            <RingTitles
                topTitlesPosition={props.topTitlesPosition}
                leftTitlesPosition={props.leftTitlesPosition}
                handleRing={props.handleRing}
            />

            <animated.svg ref={svgRef} viewBox={spring.viewBox}>
                <QuadrantTitles isZoomed={props.isZoomed} />

                <g>
                    <Lines />

                    <circle
                        cx={0}
                        cy={0}
                        r={15}
                        stroke={'var(--color-chart-green-active)'}
                        strokeWidth="0.2"
                        fill="none"
                    />
                    <circle
                        cx={0}
                        cy={0}
                        r={25}
                        stroke={'var(--color-chart-red-active)'}
                        strokeWidth="0.2"
                        fill="none"
                    />
                    <circle
                        cx={0}
                        cy={0}
                        r={35}
                        stroke={'var(--color-chart-blue-active)'}
                        strokeWidth="0.2"
                        fill="none"
                    />
                    <circle
                        cx={0}
                        cy={0}
                        r={45}
                        stroke={'var(--color-chart-grey-active)'}
                        strokeWidth="0.2"
                        fill="none"
                    />
                </g>

                {formatedData.map((point, i) => {
                    refs.current[i] = useRef(null);

                    return (
                        <STYLE.CircleStyled
                            className="point"
                            key={i}
                            cx={0}
                            cy={0}
                            r={1}
                            isVisible={point.visible}
                            fill={UTILS.getColor(point.ring)}
                            ref={refs.current[i]}
                            onMouseEnter={() => onHintShow(point.label)}
                            onMouseLeave={onHintHide}
                            onClick={() => {
                                props.setShowInMenu(true);
                                sendAnalytics(['techradar', 'click', point.label]);
                            }}
                        />
                    );
                })}
            </animated.svg>

            {referenceElement && (
                <Popper
                    placement="top"
                    modifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 5],
                            },
                        },
                    ]}
                    referenceElement={referenceElement}
                >
                    {({ ref, style, placement }) => (
                        <STYLE.TooltipContainer
                            ref={ref}
                            style={style}
                            data-placement={placement}
                            isVisibleHint={!!props.hintText}
                        >
                            <STYLE.HintText>{props.hintText}</STYLE.HintText>
                        </STYLE.TooltipContainer>
                    )}
                </Popper>
            )}
        </STYLE.RadarWrapper>
    );
};
