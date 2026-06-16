import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const TooltipContainer = styled(Tooltip)<{
    largePadding?: boolean;
    largeWidth?: boolean;
    displayFlex?: boolean;
    hideGap?: boolean;
    infoWidth?: boolean;
    overflowY?: boolean;
    hidePaddingRight?: boolean;
}>`
    ${({ displayFlex }) => (displayFlex ? 'display: flex;' : '')}
    ${({ displayFlex }) => (displayFlex ? 'flex-direction: column;' : '')}
    ${({ displayFlex, hideGap }) => (displayFlex && !hideGap ? 'gap: 16px;' : '')}
    

    max-width: ${({ largeWidth, infoWidth }) =>
        largeWidth ? '480px' : infoWidth ? 'max-content' : '300px'};
    width: max-content;
    padding: ${({ largePadding }) => (largePadding ? '16px' : '4px 8px')};

    background-color: var(--color-border-focus);

    border-radius: ${({ largePadding }) =>
        largePadding ? 'var(--size-border-radius-x8)' : 'var(--size-border-radius-x4)'};
    ${({ hidePaddingRight }) => (hidePaddingRight ? 'padding-right: 0;' : '')};

    ${({ overflowY }) => (overflowY ? 'pointer-events: auto;' : '')}

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    color: var(--color-text-active-inverse);
    white-space: pre-line;

    user-select: none;

    opacity: 1;

    z-index: 300;
`;
