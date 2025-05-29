import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

export const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    margin-top: 16px;
`;

export const TooltipContainer = styled(Tooltip)`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 480px;
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
