import React, { FC, useEffect, useRef, useState } from 'react';
import { Popper } from 'react-popper';
import * as d3 from 'd3';

import { IData } from 'pages/TechRadarPage/types';
import * as STYLE from 'pages/TechRadarPage/units';
import * as UTILS from 'pages/TechRadarPage/utils';

import { Lines } from '../Lines';
import { QuadrantTitles } from '../QuadrantTitles';
import { RingTitles } from '../RingTitles';

import * as T from './types';

export const Hold: FC<T.IHold> = (props) => {
    /* данные для расположения тултивов внутри свг */
    const [referenceElement, setReferenceElement] = useState<SVGCircleElement | null>(null);
    const refs = useRef<React.RefObject<SVGCircleElement>[]>([]);

    /* реф для запуска симуляции с помощью D3 */
    const svgRef = useRef<SVGSVGElement>(null);

    /* данные для отрисовки точек дополненые координатами и нкобходимыми функциями */
    const formatedData = props.data.map((item) => {
        const itemSegment = UTILS.segment(item.quadrant, item.ring, true);
        const coords = itemSegment.random();

        return {
            ...item,
            segment: itemSegment,
            x: coords.x,
            y: coords.y,
            visible: UTILS.itemFilterHandler(item, props.search, props.filterValue),
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

        d3.forceSimulation<IData>()
            .nodes(formatedData)
            .velocityDecay(0.2)
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
            <RingTitles type="hold" handleRing={props.handleRing} />

            <svg ref={svgRef} viewBox="-45 -45 90 90">
                <QuadrantTitles />

                <g>
                    <Lines />

                    <circle cx={0} cy={0} r={45} stroke="#B6B7BF" strokeWidth="0.2" fill="none" />

                    {formatedData.map((point, i) => {
                        refs.current[i] = useRef(null);

                        return (
                            <STYLE.CircleStyled
                                isVisible={point.visible}
                                className="point"
                                key={i}
                                cx={0}
                                cy={0}
                                r={1}
                                fill="#B6B7BF"
                                ref={refs.current[i]}
                                onMouseEnter={() => onHintShow(point.label)}
                                onMouseLeave={onHintHide}
                                onClick={() => props.setShowInMenu(true)}
                            />
                        );
                    })}
                </g>
            </svg>

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
