import React, { useRef, useState } from 'react';

import type { DonutChartProps, DonutSectionProps } from './types';
import * as S from './units';
import {
    buildDonutSectionPath,
    classNames,
    getChartColor,
    getProgressValueSum,
    normalizeValues,
} from './utils';

const DonutSection = ({
    item,
    radius,
    startAngle,
    endAngle,
    onMouseMove,
    onMouseLeave,
}: DonutSectionProps) => {
    const { color, label } = item;
    const [isHovered, setHovered] = useState(false);
    const sectionRef = useRef<SVGPathElement>(null);

    return (
        <path
            ref={sectionRef}
            onMouseMove={(event) => {
                setHovered(true);
                onMouseMove?.(event, item, sectionRef);
            }}
            onMouseLeave={(event) => {
                setHovered(false);
                onMouseLeave?.(event, item, sectionRef);
            }}
            d={buildDonutSectionPath(radius, startAngle, endAngle)}
            fill={getChartColor(color, isHovered)}
            data-testid={`donut-section-${label}`}
        />
    );
};

export const DonutChart = ({
    values,
    height = 200,
    width = 200,
    maxValue = 100,
    innerElement,
    onMouseMove,
    onMouseLeave,
    innerRadius,
    className,
}: DonutChartProps) => {
    const calculatedValues = normalizeValues(values, maxValue);
    const radius = Math.min(width, height) / 2;
    let cumulativeValue = 0;

    return (
        <S.DonutChartRoot
            className={classNames('progressbar__donutchart', className)}
            data-testid="progressbar"
            role="progressbar"
            aria-valuemax={maxValue}
            aria-valuemin={0}
            aria-valuenow={getProgressValueSum(calculatedValues)}
        >
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <S.DonutBackgroundCircle
                    className="progressbar__donutchart__backgroundcircle"
                    cx={radius}
                    cy={radius}
                    r={radius}
                />
                {calculatedValues.map((item, index) => {
                    const startAngle = (cumulativeValue / 100) * 360;
                    cumulativeValue += item.value;
                    const endAngle = (cumulativeValue / 100) * 360;

                    return (
                        <DonutSection
                            key={index}
                            item={item}
                            radius={radius}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                        />
                    );
                })}
                {innerRadius !== undefined && (
                    <S.DonutInnerCircle
                        className="progressbar__donutchart__innerRadius"
                        cx={radius}
                        cy={radius}
                        r={innerRadius}
                    />
                )}
            </svg>
            {innerElement && (
                <S.DonutInnerElement className="progressbar__donutchart__innerElement">
                    {innerElement}
                </S.DonutInnerElement>
            )}
        </S.DonutChartRoot>
    );
};

DonutChart.displayName = 'DonutChart';
