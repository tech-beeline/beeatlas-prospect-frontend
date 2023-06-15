import styled from '@emotion/styled';

import { theme } from 'styles';

export const TableWrapper = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    max-height: calc(100vh - 128px);

    color: ${theme.colors.textActive};

    overflow: auto;

    &::-webkit-scrollbar-thumb {
        background-color: #b6b7bf;

        border-radius: 16px;
    }

    &::-webkit-scrollbar {
        height: 8px;
        width: 8px;
    }
`;

export const Table = styled.table`
    border-spacing: 0;
    background-color: transparent;

    td {
        margin: 0;
    }
`;

export const Thead = styled.thead`
    position: sticky;
    top: 0;

    width: 100%;

    text-align: left;

    z-index: 1;
`;

export const Tbody = styled.tbody`
    width: 100%;
`;

export const Row = styled.tr`
    width: 100%;

    background-color: ${theme.colors.backgroundLow};
`;

export const Th = styled.th<{ backgroundColor?: string }>`
    min-width: 320px;
    height: 56px;
    padding: 18px 16px;

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;

    background-color: ${({ backgroundColor }) =>
        !!backgroundColor ? `${backgroundColor}` : `${theme.colors.backgroundLow}`};

    &:first-of-type {
        position: sticky;
        left: 0;

        min-width: auto;
        padding: 0 24px;
    }

    &:last-of-type {
        padding-right: 24px;
    }
`;

export const Td = styled.td`
    min-width: 320px;
    height: 52px;
    padding: 18px 16px;

    background-color: ${theme.colors.backgroundLow};

    border-bottom: 1px solid ${theme.colors.divider};

    &:first-of-type {
        position: sticky;
        left: 0;

        min-width: auto;
        padding: 0 24px;
    }

    &:last-of-type {
        padding-right: 24px;
    }
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
