import styled from '@emotion/styled';

import { FAB } from 'components/ui';

export const Container = styled.div<{ hidden?: boolean }>`
    position: fixed;
    bottom: 32px;
    right: 32px;

    z-index: 100;

    ${({ hidden }) =>
        hidden &&
        `
        visibility: hidden;
        pointer-events: none;
    `}
`;

export const Dropdown = styled.div`
    position: fixed;
    right: 32px;
    bottom: 104px;

    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: flex-end;

    pointer-events: none;
`;

export const ComplainButton = styled.div<{ visible: boolean }>`
    transition: 0.25s all;

    pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transform: translateY(${({ visible }) => (visible ? '0' : '10px')});
`;

export const AIButton = styled.div<{ visible: boolean }>`
    transition: 0.25s all;

    pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transform: translateY(${({ visible }) => (visible ? '0' : '10px')});
`;

export const FABStyled = styled(FAB)`
    background-color: var(--color-button-overlay-background) !important;
    color: var(--color-text-active-inverse) !important;

    border: 1px solid var(--color-button-overlay-background) !important;

    &:hover {
        background-color: var(--color-button-overlay-background-hover) !important;
    }

    & * {
        color: var(--color-text-active-inverse) !important;
    }
`;
