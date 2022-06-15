import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Paper } from 'components/containers/Paper';

import { theme } from 'styles';

import { IModalOverlayProps } from './types';

export const ModalOverlay = styled.div<IModalOverlayProps>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.32);

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all ${({ isVisible }) => (isVisible ? '0.2s' : '0s')} ease-in-out;
    opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    overflow: hidden;

    z-index: ${theme.zIndex.modal};

    cursor: pointer;
`;

export const ModalPaper = styled(Paper)<{ isHTML: boolean }>`
    ${({ isHTML }) =>
        isHTML &&
        css`
            width: 860px;
            height: 80%;
            margin: 20px;
            padding: 48px 0 0;
        `}

    cursor: default;
`;

export const InnerHTMLContainer = styled.div`
    /* Отнимаем снизу для FooterModalContainer */
    height: calc(100% - 110px);
    padding: 0 48px 48px;

    overflow: auto;
`;

export const FooterModalContainer = styled.div`
    padding: 0 48px;

    background-color: ${theme.colors.white};
`;

export const ShadowLine = styled.div`
    height: 24px;
    width: 100%;

    background: linear-gradient(
        180deg,
        rgba(221, 222, 224, 0.46) 0%,
        rgba(196, 196, 196, 0) 60.42%
    );
`;
