import styled from '@emotion/styled';

export const StyledTableBody = styled.tbody`
    & > .dsb_table-row:last-of-type {
        border-bottom: none;
    }

    & .dsb_table-head .dsb_table-row {
        border-bottom: 1px solid var(--color-border);
    }
`;
