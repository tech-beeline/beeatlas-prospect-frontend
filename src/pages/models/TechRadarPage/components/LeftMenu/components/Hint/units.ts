import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

import * as STYLE from 'pages/models/TechRadarPage/units';

import { ReactComponent as InfoSVG } from '../../images/info-icon.svg';

export const InfoIcon = styled(InfoSVG)`
    min-width: 24px;
    min-height: 24px;

    z-index: 5;

    & > * {
        fill: var(--color-text-active);
    }

    &:focus {
        outline: none;
    }
`;

export const HintWrapper = styled.div`
    display: flex;

    position: relative;

    width: max-content;

    cursor: pointer;

    &:focus-visible {
        outline: none;
    }
`;

export const TooltipContainerStyled = styled(STYLE.TooltipContainer)`
    padding: 16px;

    background-color: var(--color-text-active);
`;

export const TooltipStyled = styled(Tooltip)`
    position: fixed;

    max-width: 360px;
    width: max-content;
    padding: 16px;

    background-color: var(--color-background-inverse);

    border-radius: var(--size-border-radius-x8);

    font-size: var(--font-size-caption);
    text-align: start;

    z-index: 5;
`;

export const NoData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
