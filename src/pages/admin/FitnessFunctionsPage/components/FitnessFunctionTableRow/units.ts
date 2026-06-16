import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const OverflowContainer = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;

export const StatusContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
`;

export const ButtonsContainer = styled.div`
    position: relative;

    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: flex-end;
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const TableDataHovered = styled(TableDataFullWidth)<{ editable: boolean }>`
    ${({ editable }) =>
        editable &&
        css`
            &:hover {
                outline: 1px solid var(--color-text-active);
            }
        `}

    ${({ editable }) =>
        editable &&
        css`
            cursor: pointer;
        `}

    & > div > div {
        width: 100%;
    }
`;

export const TableDataInput = styled(TableData)`
    padding: 0px;
    height: 1px;

    & > div {
        height: 100%;
    }

    & > div > div {
        width: 100%;
        height: 100%;
    }
`;

export const ProgressContainer = styled.td`
    padding: 0;
`;

export const StatusEditor = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 16px;

    width: 100%;
    height: 100%;

    outline: none;
    border: 1px solid var(--color-border-focused);
`;

export const RelativeContainer = styled.div`
    position: relative;

    width: 100%;
`;

export const Dropdown = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;

    transform: translateY(100%);

    width: 100%;
    max-height: 200px;
    overflow-y: auto;
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
