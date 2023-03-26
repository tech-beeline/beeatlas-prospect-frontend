import { css } from '@emotion/react';
import styled from '@emotion/styled';

import * as STYLE from 'pages/TechRadarPage/units';

import { ReactComponent as ArrowSVG } from './images/arrow-icon.svg';
import { ReactComponent as InfoSVG } from './images/info-icon.svg';

export const Wrapper = styled.div<{ withScroll?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 4px;

    width: 310px;

    ${({ withScroll }) =>
        withScroll &&
        css`
            max-height: 500px;

            overflow: hidden scroll;
        `}

    &::-webkit-scrollbar-thumb {
        background-color: #b6b7bf;

        border-radius: 16px;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const TitleWrapper = styled.div`
    width: 100%;
    padding: 12px 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    cursor: pointer;

    user-select: none;

    border-radius: 12px;

    transition: background-color 0.25s ease-in-out;

    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: rgba(25, 28, 52, 0.08);
        }
    }
`;

export const Title = styled.h2`
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
`;

export const Item = styled.p<{ isActive?: boolean }>`
    width: 100%;
    padding: 12px 24px;

    font-weight: 400;
    font-size: 17px;
    line-height: 22px;

    border-radius: 12px;

    background-color: ${({ isActive }) => isActive && 'rgba(25, 28, 52, 0.08)'};

    transition: background-color 0.25s ease-in-out;

    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: rgba(25, 28, 52, 0.08);
        }
    }
`;

export const ArrowIcon = styled(ArrowSVG)<{ isreverse: string }>`
    min-width: 24px;
    min-height: 24px;

    transform: ${({ isreverse = '' }) => isreverse && 'rotateX(180deg)'};

    transition: transform 0.4s ease-in-out;
`;

export const InfoIcon = styled(InfoSVG)`
    min-width: 24px;
    min-height: 24px;
`;

export const HintWrapper = styled.div`
    display: flex;

    position: relative;

    width: max-content;

    cursor: pointer;
`;

export const TooltipContainerStyled = styled(STYLE.TooltipContainer)`
    padding: 16px;
`;
