import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ContainerColorVariants, StyledBannerProps } from './types';

const colorStyles: Record<ContainerColorVariants, ReturnType<typeof css>> = {
    info: css`
        background: var(--color-status-info-background);

        .banner-title-icon {
            color: var(--color-status-info);
        }
    `,
    success: css`
        background: var(--color-status-success-background);

        .banner-title-icon {
            color: var(--color-status-success);
        }
    `,
    warning: css`
        background: var(--color-status-warning-background);

        .banner-title-icon {
            color: var(--color-status-warning);
        }
    `,
    error: css`
        background: var(--color-status-error-background);

        .banner-title-icon {
            color: var(--color-status-error);
        }
    `,
    default: css`
        background: var(--color-status-neutral-background);

        .banner-title-icon {
            color: var(--color-text-inactive);
        }
    `,
};

export const StyledBanner = styled.div<StyledBannerProps>`
    position: relative;
    display: flex;
    justify-content: space-between;
    height: fit-content;
    width: 100%;
    padding: calc(16px / 2);
    border-radius: 16px;
    box-sizing: border-box;

    flex-direction: ${({ $type }) => ($type === 'vertical' ? 'column' : 'row')};

    ${({ $type }) =>
        $type === 'vertical' &&
        css`
            .banner-actions {
                width: auto;
                flex-wrap: wrap;
            }
        `}

    ${({ $hasCloseButton }) =>
        $hasCloseButton &&
        css`
            min-height: 56px;
            padding-right: calc(40px + 24px);
        `}

    ${({ $color }) => colorStyles[$color]}

    @media (max-width: 600px) {
        flex-direction: column;

        .banner-actions {
            width: auto;
            flex-wrap: wrap;
        }
    }
`;

export const BannerTitle = styled.div`
    display: flex;
    align-items: center;
    margin: calc(16px / 2);
`;

export const BannerTitleText = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.2px;
`;

export const BannerIcon = styled.span`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 20px;
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
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 16px;
    align-self: baseline;
`;

export const BannerActions = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1 1 auto;
    align-items: center;
    margin: calc(16px / 4) calc(16px / 4) calc(16px / 4) calc(24px / 2);
`;

export const BannerActionButton = styled.div`
    height: fit-content;
    white-space: nowrap;
    margin: calc(8px / 2);
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    line-height: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    min-height: 24px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    color: var(--color-text-inactive);

    &:hover,
    &:active,
    &:focus-visible {
        background-color: transparent;
        border-color: transparent;
        color: var(--color-text-active);
    }

    &:focus-visible {
        border-color: var(--color-border-focus);
        outline: none;
    }
`;

export const CloseIcon = styled.span`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 24px;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';

    width: 24px;
    height: 24px;
    font-size: 24px;
`;
