import { TableData, TableRow } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const TableRowStyled = styled(TableRow)<{ disabled?: boolean; expanded?: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : ''};
`;

export const IconButtonContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableContainer = styled.div`
    width: 100%;

    padding-left: 24px;

    border-left: 4px solid var(--color-background-brand);
`;

export const TableStyled = styled.table`
    width: 100%;

    border-collapse: collapse;
`;

export const TableDataStyled = styled(TableData)`
    padding: 0px;

    & > div > div {
        width: 100%;
    }
`;

export const TableDataInput = styled(TableData)`
    padding: 0px;

    & > div > div {
        width: 100%;
    }
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const InputStyled = styled.input`
    min-width: 10px;
    width: 100%;
    height: 54px;

    padding: 0px 16px;

    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 17px;
    line-height: 20px;

    border-radius: 0px;
    border: 1px solid var(--color-border-focused);
`;

export const ConnectInterfaceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    width: 100%;
`;

export const RelativeContainer = styled.div`
    position: relative;

    width: 100%;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 55px;
    left: 0px;

    width: 100%;
    padding: 8px 0;

    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-medium);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    user-select: none;
    cursor: pointer;

    z-index: 10;
`;

export const DropdownItem = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 12px 16px;

    color: var(--color-background-inverse);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
