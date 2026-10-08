import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Chips = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    flex: 1;
    min-width: 0;

    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;
