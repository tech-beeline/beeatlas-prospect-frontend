import styled from '@emotion/styled';

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

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);

    color: var(--color-text-active-inverse);

    background-color: ${({ type }) =>
        type === 'adopt'
            ? 'var(--color-chart-green-active)'
            : type === 'trial'
            ? 'var(--color-palette-amber-300)'
            : type === 'assess'
            ? 'var(--color-chart-blue-active)'
            : 'var(--color-chart-grey-active)'};

    border-radius: var(--size-border-radius-x6);

    transition: all 0.4s ease-in-out;

    text-transform: uppercase;

    user-select: none;

    cursor: pointer;
`;
