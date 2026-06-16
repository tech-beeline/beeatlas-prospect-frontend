import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const linearTranslateX = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(175%);
    }
`;

const circleRotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const circleDash = keyframes`
    0% {
        stroke-dasharray: 11.9380520836px, 119.3805208364px;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89.5353906273px, 119.3805208364px;
    }
    100% {
        stroke-dasharray: 89.5353906273px, 107.4424687528px;
        stroke-dashoffset: -119.3805208364px;
    }
`;

const circleColors = keyframes`
    0% {
        stroke: #fdb435;
    }
    50% {
        stroke: #fdd835;
    }
    100% {
        stroke: #fdb435;
    }
`;

const circleRotateMini = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const circleDashMini = keyframes`
    0% {
        stroke-dasharray: 5.3407075111px, 53.407075111px;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 40.0553063333px, 53.407075111px;
    }
    100% {
        stroke-dasharray: 40.0553063333px, 48.0663675999px;
        stroke-dashoffset: -53.407075111px;
    }
`;

const circleColorsMini = keyframes`
    0% {
        stroke: #fdb435;
    }
    50% {
        stroke: #fdd835;
    }
    100% {
        stroke: #fdb435;
    }
`;

const animatedPair = keyframes`
    0% {
        transform: rotate(0deg);
    }
    80% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LinearProgressRoot = styled.span`
    position: relative;
    overflow: hidden;
    display: block;
    height: 4px;
    background-color: var(--color-divider);

    &.dsb_progress__linear-solo {
        border-radius: 8px;
        min-width: 260px;
    }
`;

export const LinearProgressBar = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    height: inherit;
    background: linear-gradient(
        90deg,
        #feca48 0%,
        #ff7d5d 19.46%,
        #b732a2 43.54%,
        #621a9f 70.39%,
        #030013 100%
    );
    color: var(--color-status-error);
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);

    &.dsb_progress-bar__cycled {
        width: 75% !important;
        animation: ${linearTranslateX} 1000ms cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    &.dsb_progress-bar__solo {
        border-radius: 8px;
    }
`;

export const CircleProgressWrapper = styled.div`
    width: fit-content;
`;

export const CircleProgressSvg = styled.svg`
    &.dsb_progress__circular_standart {
        width: 44px;
        height: 44px;
    }

    &.dsb_progress__circular_mini {
        width: 20px;
        height: 20px;
    }
`;

export const CircleProgressTrack = styled.circle<{ $isMini: boolean }>`
    transform-origin: 50% 50%;
    fill: transparent;
    stroke: var(--color-divider);

    ${({ $isMini }) =>
        $isMini
            ? `
        cx: 10px;
        cy: 10px;
        r: 8.5px;
        stroke-width: 3px;
    `
            : `
        cx: 22px;
        cy: 22px;
        r: 19px;
        stroke-width: 6px;
    `}
`;

export const CircleProgressIndication = styled.circle<{
    $cycled: boolean;
    $completed: boolean;
    $isMini: boolean;
}>`
    transform-origin: 50% 50%;
    fill: transparent;
    stroke: #fdd835;
    stroke-linecap: ${({ $completed }) => ($completed ? 'square' : 'round')};
    transition: stroke-dashoffset 250ms;

    ${({ $isMini }) =>
        $isMini
            ? `
        cx: 10px;
        cy: 10px;
        r: 8.5px;
        stroke-width: 3px;
    `
            : `
        cx: 22px;
        cy: 22px;
        r: 19px;
        stroke-width: 6px;
    `}

    ${({ $cycled, $isMini }) =>
        $cycled &&
        ($isMini
            ? `
        animation:
            ${circleColorsMini} 1300ms linear infinite,
            ${circleRotateMini} 1300ms linear infinite,
            ${circleDashMini} 1300ms ease-in infinite;
    `
            : `
        animation:
            ${circleColors} 1300ms linear infinite,
            ${circleRotate} 1300ms linear infinite,
            ${circleDash} 1300ms linear infinite;
    `)}
`;

export const AnimatedProgressRoot = styled.span`
    display: flex;
    align-items: center;
    width: 48px;
    height: 48px;
    position: relative;
`;

export const AnimatedProgressPair = styled.div`
    animation: ${animatedPair} 1.5s cubic-bezier(0.86, -0.35, 0, 1.35) infinite;
    animation-play-state: inherit;
    display: flex;
    gap: 8px;
    flex-direction: row;
    position: absolute;
`;

export const AnimatedProgressCircle = styled.span`
    display: block;
    border-radius: 50%;
    background: linear-gradient(
        90deg,
        #feca48 0%,
        #ff7d5d 19.46%,
        #b732a2 43.54%,
        #621a9f 70.39%,
        #030013 100%
    );
    width: 20px;
    height: 20px;
`;
