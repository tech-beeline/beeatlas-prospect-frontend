import styled from '@emotion/styled';

export const TableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const ThStyled = styled.th`
    &:first-child {
        padding: 8px 8px;
        width: 149px;
    }
    width: 288px;
    padding: 8px 16px;
    vertical-align: middle;
    border-bottom: 1px solid #e0e0e0;
`;

export const TdStyled = styled.td`
    &:first-child {
        width: 133px;
    }
    width: 288px;
    padding: 17px 16px;
    vertical-align: middle;

    ${TableStyled} tbody tr:not(:nth-last-child(-n+2)) & {
        border-bottom: 1px solid #e0e0e0;
    }
    border-bottom: none;
`;
