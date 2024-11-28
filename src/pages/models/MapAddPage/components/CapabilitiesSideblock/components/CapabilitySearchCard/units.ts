import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const CapabilityCard = styled.div<{ dragged?: boolean; isUsed?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: ${({ dragged }) => (dragged ? 'fit-content' : 'auto')};

    padding: 4px 16px;

    opacity: ${({ isUsed }) => (isUsed ? '0.48' : '1')};

    background-color: var(--color-background-base);

    border-radius: 12px;

    box-shadow: ${({ dragged }) =>
        dragged ? '0px 2px 10px 0px rgba(0, 0, 0, 0.08),0px 2px 8px 0px rgba(0, 0, 0, 0.08)' : ''};

    user-select: none;
    cursor: pointer;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const TooltipContainer = styled(Tooltip)`
    display: flex;
    flex-direction: column;
    gap: 16px;

    max-width: 360px;
    width: max-content;
    padding: 16px;

    background-color: var(--color-border-focus);
    color: var(--color-text-active-inverse);

    border-radius: var(--size-border-radius-x8);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;

    opacity: 1;

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
`;

export const DescriptionContainer = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    line-clamp: 10;
    -webkit-box-orient: vertical;
`;
