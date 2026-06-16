import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledDividerProps } from './types';

const orientationStyles = ({ $type }: StyledDividerProps) =>
    $type === 'vertical'
        ? css`
              width: 1px;
              height: 100%;
          `
        : css`
              height: 1px;
              width: 100%;
          `;

export const StyledDivider = styled.hr<StyledDividerProps>`
    background-color: var(--color-divider);
    box-sizing: border-box;
    border: 0;
    margin: 0;
    padding: 0;
    appearance: none;
    display: block;

    ${orientationStyles}
`;

export const StyledDecorativeDivider = styled.div<StyledDividerProps>`
    background-color: var(--color-divider);
    box-sizing: border-box;

    ${orientationStyles}
`;
