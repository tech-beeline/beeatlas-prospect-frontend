import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { StyledDialogContentProps, StyledDialogSectionProps } from './types';

const smallScreenStyles = css`
    max-height: calc(100vh - 96px);
    margin: 48px 16px;

    .dsb_dialog-title {
        padding: 16px 16px 0;
    }

    .dsb_dialog-title__scrollable {
        padding: 16px 16px;
    }

    .dsb_dialog-children {
        padding: 16px 9px 16px 16px;
    }

    .dsb_dialog-footer {
        padding: 16px 16px 24px;
    }

    .dsb_dialog-footer__scrollable {
        padding: 16px 16px 24px;
    }
`;

export const DialogContentRoot = styled.div<StyledDialogContentProps>`
    min-height: 126px;
    height: fit-content;
    max-height: 560px;
    width: 560px;
    min-width: 280px;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    position: relative;
    box-shadow: 0 6px 38px rgba(0, 0, 0, 0.16), 0 0 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    margin: 72px 16px;
    padding: 0;
    border-radius: 12px;
    box-sizing: border-box;
    border: 1px solid transparent;
    background-origin: border-box;
    background-color: var(--color-background-high);

    ${({ $smallScreen }) => $smallScreen && smallScreenStyles}
`;

export const DialogContentFullscreen = styled(DialogContentRoot)`
    width: 100%;
    height: 100%;
    margin: 0;
    box-shadow: none;
    border-radius: 0;
    max-height: unset;
    background-color: var(--color-background-base);
`;

export const DialogDivider = styled.div`
    height: 1px;
    background-color: var(--color-divider);
    width: 100%;
`;

export const DialogTitle = styled.div<StyledDialogSectionProps>`
    padding: 24px 24px 0;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.2px;
    word-break: break-word;
    box-sizing: border-box;

    ${({ $scrollable }) =>
        $scrollable &&
        css`
            padding: 16px 24px;
        `}
`;

export const DialogChildren = styled.div`
    padding: 24px 17px 24px 24px;
    overflow: auto;
    box-sizing: inherit;
    margin-right: 7px;
`;

export const DialogFooter = styled.div<StyledDialogSectionProps>`
    display: flex;
    justify-content: flex-end;
    padding: 0 24px 24px;

    ${({ $scrollable }) =>
        $scrollable &&
        css`
            padding: 16px 24px;
        `}
`;

export const FooterActionLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;

    @media (max-width: 600px) {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .dsb_dialog-footer_action-button + .dsb_dialog-footer_action-button {
        margin-left: 16px;
    }

    @media (max-width: 600px) {
        .dsb_dialog-footer_action-button {
            width: 100%;
        }
    }
`;
