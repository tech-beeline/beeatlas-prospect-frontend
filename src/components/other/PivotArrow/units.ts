import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as ArrowSVG } from './images/arrow.svg';

export const PivotArrow = styled(ArrowSVG)<{ isOpen: boolean; position?: string }>`
    min-width: 24px;

    ${({ position }) =>
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
        position === 'right'
            ? css`
                  transform: rotate(-90deg);
              `
            : position === 'top'
            ? css`
                  transform: rotate(-180deg);
              `
            : css`
                  transform: rotate(0deg);
              `}

    transition: transform 0.25s ease-out;

    & > * {
        fill: ${({ color = 'var(--color-text-active)' }) => color};
    }
`;
