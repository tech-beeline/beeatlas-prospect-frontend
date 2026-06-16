import React, { useRef, useState } from 'react';

import type { BarChartPieceProps, BarChartProps } from './types';
import * as S from './units';
import { classNames, getChartColor, getProgressValueSum, normalizeValues } from './utils';

const ChartPiece = ({ piece, onMouseMove, onMouseLeave }: BarChartPieceProps) => {
    const { value, color } = piece;
    const [isHovered, setHovered] = useState(false);
    const pieceRef = useRef<HTMLDivElement>(null);

    return (
        <S.BarChartPiece
            ref={pieceRef}
            onMouseMove={(event) => {
                setHovered(true);
                onMouseMove?.(event, piece, pieceRef);
            }}
            onMouseLeave={(event) => {
                setHovered(false);
                onMouseLeave?.(event, piece, pieceRef);
            }}
            className={classNames('progressbar__barchart__chartpiece')}
            style={{
                backgroundColor: getChartColor(color, isHovered),
                width: `${value}%`,
            }}
            data-testid={`bar-piece-${piece.label || 'unknown'}`}
        />
    );
};

export const BarChart = ({
    values,
    height,
    width,
    maxValue = 100,
    onMouseLeave,
    onMouseMove,
    className,
}: BarChartProps) => {
    const calculatedValues = normalizeValues(values, maxValue);

    return (
        <S.BarChartRoot
            className={classNames('progressbar__barchart', className)}
            $width={width}
            $height={height}
            data-testid="progressbar"
            role="progressbar"
            aria-valuemax={maxValue}
            aria-valuemin={0}
            aria-valuenow={getProgressValueSum(calculatedValues)}
        >
            {calculatedValues.map((item, index) => (
                <ChartPiece
                    key={index}
                    piece={item}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                />
            ))}
        </S.BarChartRoot>
    );
};

BarChart.displayName = 'BarChart';
