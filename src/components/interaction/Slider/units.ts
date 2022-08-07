import styled from '@emotion/styled';

import { ReactComponent as ArrowSVG } from './images/arrow.svg';

export const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
`;

export const SliderWrapper = styled.div`
    position: relative;
`;

export const SliderContainer = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    max-width: 1460px;
    height: 400px;

    background-color: white;

    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    cursor: grab;

    /* @media only screen and (max-width: 1500px) {
        max-width: 1000px;
    }

    @media only screen and (max-width: 1100px) {
        max-width: 800px;
    }

    @media only screen and (max-width: 900px) {
        max-width: 90vw;
    } */
`;

export const Slider = styled.div<{ transformX: number; isScrolling: boolean }>`
    display: flex;
    align-items: center;

    width: 100%;

    transition: ${({ isScrolling }) => !isScrolling && 'all 0.4s ease-in-out'};

    transform: ${({ transformX }) => `translate3d(${transformX}px, 0px, 0px)`};
`;

export const ArrowWrapper = styled.div<{ isRight?: boolean; isVisible?: boolean }>`
    position: absolute;
    top: 58%;
    left: ${({ isRight }) => (isRight ? '100%' : 0)};

    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 40px;
    height: 40px;

    border-radius: 50%;

    /* box-shadow: 0 4px 12px 0 rgb(0 0 0 / 10%); */

    z-index: 100;

    background-color: black;

    cursor: ${({ isVisible }) => (isVisible ? 'pointer' : 'default')};

    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

    transition: opacity 0.3s ease-in-out;

    & * path {
        transition: fill 0.2s ease-in-out;
    }

    &:hover {
        & * path {
            fill: #fdd835;
        }
    }
`;

export const LeftArrow = styled(ArrowSVG)`
    transform: rotate(-180deg);

    /* & > path {
        fill: black;
    } */
`;

export const RightArrow = styled(LeftArrow)`
    transform: rotate(0deg);
`;

export const SliderBlock = styled.div`
    display: block;

    min-width: 612px;
    height: 300px;
    padding: 30px;

    border: 2px solid black;

    border-radius: 16px;

    background-color: white;

    user-select: none;

    &:not(:last-child) {
        margin-right: 60px;
    }

    /* @media only screen and (max-width: 1460px) {
        min-width: 470px;
    }

    @media only screen and (max-width: 1100px) {
        min-width: 380px;

        &:not(:last-child) {
            margin-right: 40px;
        }
    }

    @media only screen and (max-width: 900px) {
        min-width: 100%;
    } */
`;
