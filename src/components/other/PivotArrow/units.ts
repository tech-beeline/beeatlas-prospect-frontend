import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

import { ReactComponent as ArrowSVG } from './images/arrow.svg';

export const PivotArrow = styled(ArrowSVG)<{ isOpen: boolean; position?: string }>`
    min-width: 24px;

    /* transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')}; */

    ${({ position, isOpen }) =>
        // position === 'top'
        //     ? css`
        //           transform: rotate(-180deg);
        //       `
        //     : position === 'right'
        //     ? css`
        //           transform: rotate(-90deg);
        //       `
        //     : position === 'left'
        //     ? css`
        //           transform: rotate(180deg);
        //       `
        //     : css`
        //           transform: ${isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'};
        //
        position === 'right' &&
        css`
            transform: rotate(-90deg);
        `}

    transition: transform 0.25s ease-out;

    & > * {
        fill: ${({ color = theme.colors.textActive }) => color};
    }
`;
