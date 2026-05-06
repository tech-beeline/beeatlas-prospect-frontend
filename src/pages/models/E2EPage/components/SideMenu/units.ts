import styled from '@emotion/styled';
import { Resizable } from 're-resizable';

// @ts-ignore
export const ResizableStyled = styled(Resizable)`
    position: static !important;

    height: 100%;

    overflow: hidden auto;
`;

export const SideMenuContainer = styled.div`
    position: sticky;
    top: 0;

    display: flex;
    flex-direction: column;

    width: max-content;
    height: calc(100vh - 64px);

    border-left: 1px solid var(--color-divider);
    border-right: 1px solid var(--color-divider);

    overflow-y: auto;
    overflow-x: hidden;
`;

export const SearchContainer = styled.div`
    position: relative;

    padding: 24px 16px 0px 16px;
`;

export const TreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding: 32px 8px;
`;

export const MenuBlock = styled.div`
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;

    transform: translateY(100%);

    display: flex;
    flex-direction: column;

    padding: 8px 0;

    max-height: 400px;

    overflow-y: auto;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;
`;

export const MenuItem = styled.div`
    padding: 12px 16px;

    color: var(--color-text-active);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
