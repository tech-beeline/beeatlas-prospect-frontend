import styled from '@emotion/styled';

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    max-width: 100%;

    > button {
        flex-shrink: 0;
    }
`;

export const Viewport = styled.div`
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: max-content;

    > * {
        flex-shrink: 0;
    }
`;
