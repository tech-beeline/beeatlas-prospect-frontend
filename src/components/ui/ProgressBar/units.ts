import styled from '@emotion/styled';

export const BarChartRoot = styled.div<{ $width?: number; $height?: number }>`
    background: var(--color-control-background);
    display: flex;
    flex-direction: row;
    justify-content: start;
    position: relative;
    overflow: hidden;
    width: ${({ $width }) => ($width !== undefined ? `${$width}px` : undefined)};
    height: ${({ $height }) => ($height !== undefined ? `${$height}px` : undefined)};
    border-radius: ${({ $height }) => ($height !== undefined ? `${$height / 2}px` : undefined)};
`;

export const BarChartPiece = styled.div`
    height: 100%;
`;

export const DonutChartRoot = styled.div`
    position: relative;
    width: fit-content;
`;

export const DonutBackgroundCircle = styled.circle`
    fill: var(--color-control-background);
`;

export const DonutInnerCircle = styled.circle`
    fill: var(--color-background-base);
`;

export const DonutInnerElement = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: fit-content;
    height: fit-content;
    margin: auto;
`;
