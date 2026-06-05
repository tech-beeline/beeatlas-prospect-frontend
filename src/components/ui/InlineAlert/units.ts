import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { InlineAlertColorVariants, StyledInlineAlertProps } from './types';

const typeStyles: Record<InlineAlertColorVariants, ReturnType<typeof css>> = {
    info: css`
        background-color: var(--color-status-info-background);

        .dsb_alert-icon {
            color: var(--color-status-info);
        }
    `,
    success: css`
        background-color: var(--color-status-success-background);

        .dsb_alert-icon {
            color: var(--color-status-success);
        }
    `,
    warning: css`
        background-color: var(--color-status-warning-background);

        .dsb_alert-icon {
            color: var(--color-status-warning);
        }
    `,
    error: css`
        background-color: var(--color-status-error-background);

        .dsb_alert-icon {
            color: var(--color-status-error);
        }
    `,
    neutral: css`
        background-color: var(--color-status-neutral-background);

        .dsb_alert-icon {
            color: var(--color-status-neutral);
        }
    `,
};

export const StyledInlineAlert = styled.div<StyledInlineAlertProps>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: calc(8px + 8px + 20px);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 8px 16px 8px calc(16px + 16px + 20px);

    ${({ $type }) => typeStyles[$type]}
`;

export const AlertIcon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    margin: 8px 16px 8px;
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
`;

export const AlertContent = styled.p`
    margin: 0;
    padding: 0;
    color: var(--color-text-active);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.2px;
`;

export const CustomContent = styled.div`
    height: 100%;
    width: 100%;
`;
