import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    /* TODO: temp */
    flex-direction: column;
    gap: 50px;

    height: 100vh;
    padding-top: 160px;

    background-color: var(--color-background-base);
    color: ${theme.colors.textActive};
`;

export const GeneralBlock = styled.div`
    height: 100%;
    width: 100%;
`;

export const Table = styled.table`
    border-collapse: collapse;

    /* width: 300px; */
    height: 200px;

    border: 1px solid ${theme.colors.divider};

    & > * > th {
        width: 200px;
        padding: 10px;

        border: 1px solid ${theme.colors.divider};
    }

    & > * > th:nth-child(2) {
        width: 500px;
    }
`;

export const TableTitle = styled.tr`
    height: 20px;

    background-color: ${theme.colors.backgroundControl};
`;
export const TableStrings = styled.tr`
    height: 40px;
`;
