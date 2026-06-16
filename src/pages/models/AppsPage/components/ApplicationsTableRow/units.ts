import styled from '@emotion/styled';

export const NameContainer = styled.div<{ level: number }>`
    display: flex;
    align-items: center;
    gap: 4px;

    padding-left: ${({ level }) => level * 24}px;
`;

export const IconButtonContainer = styled.div`
    min-width: 20px;
    height: 20px;
`;

export const TableContainer = styled.div<{ level: number }>`
    width: 100%;

    padding-left: ${({ level }) => level * 24 - 4}px;

    border-left: 4px solid var(--color-background-brand);
`;

export const TableStyled = styled.table`
    width: 100%;

    border-collapse: collapse;
`;
