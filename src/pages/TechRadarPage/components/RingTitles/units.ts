import styled from '@emotion/styled';

import { theme } from 'styles';

export const RingTitle = styled.p<{
    top: number;
    left: number;
    type: 'hold' | 'assess' | 'trial' | 'adopt';
}>`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}%`};

    transform: translate(-50%, -50%);

    padding: 2px 8px;

    font-weight: 500;
    font-size: var(--font-size-caption);
    line-height: 14px;

    color: ${theme.colors.textActiveInverse};

    background-color: ${({ type }) =>
        type === 'adopt'
            ? theme.colors.chartGreen
            : type === 'trial'
            ? theme.colors.chartRed
            : type === 'assess'
            ? theme.colors.chartBlue
            : theme.colors.chartGrey};

    border-radius: var(--size-border-radius-x6);

    transition: all 0.4s ease-in-out;

    text-transform: uppercase;

    user-select: none;

    cursor: pointer;
`;
