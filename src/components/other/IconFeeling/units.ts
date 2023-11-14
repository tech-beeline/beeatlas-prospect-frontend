import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const Container = styled.div<{ isActive: boolean }>`
    width: 40px;
    height: 40px;

    padding: 10px;

    border-radius: ${({ isActive }) =>
        isActive ? 'var(--size-border-radius-x3)' : 'var(--size-border-radius-circle)'};

    transition: 0.25s all;

    cursor: pointer;
`;

export const TooltipContainer = styled(Tooltip)`
    max-width: 360px;
    width: max-content;
    padding: 4px 8px;

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: var(--size-border-radius-x4);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;
`;
