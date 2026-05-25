import styled from '@emotion/styled';
import { Resizable } from 're-resizable';

// @ts-ignore
export const ResizableStyled = styled(Resizable)`
    position: static !important;

    display: flex;
    flex-direction: column;

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
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px 16px 0px 16px;

    background-color: var(--color-background-base);
`;
