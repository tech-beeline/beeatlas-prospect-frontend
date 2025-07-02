import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const TooltipContainer = styled(Tooltip)<{
    largePadding?: boolean;
    largeWidth?: boolean;
    displayFlex?: boolean;
    hideGap?: boolean;
}>`
    ${({ displayFlex }) => (displayFlex ? 'display: flex;' : '')}
    ${({ displayFlex }) => (displayFlex ? 'flex-direction: column;' : '')}
    ${({ displayFlex, hideGap }) => (displayFlex && !hideGap ? 'gap: 16px;' : '')}
    

    max-width: ${({ largeWidth }) => (largeWidth ? '480px' : '300px')};
    width: ${({ largeWidth }) => (largeWidth ? '480px' : 'max-content')};
    padding: ${({ largePadding }) => (largePadding ? '16px' : '4px 8px')};

    background-color: var(--color-border-focus);
    color: var(--color-text-active-inverse);

    border-radius: ${({ largePadding }) =>
        largePadding ? 'var(--size-border-radius-x8)' : 'var(--size-border-radius-x4)'};

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    opacity: 1;

    z-index: 300;
`;
