import styled from '@emotion/styled';

import { IconButton } from 'components/ui';
import { Icon, TableData, TableRow } from 'components/ui';
export const TableRowStyled = styled(TableRow)<{ expanded: boolean }>`
    background-color: ${({ expanded }) =>
        expanded ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};
`;

export const TableDataFullWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const IconButtonStyled = styled(IconButton)<{ expanded: boolean }>`
    transform: ${({ expanded }) => `rotate(${expanded ? -180 : 0}deg)`};

    transition: all 0.25s;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`;

export const DescriptionContainer = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;

export const ButtonsContainer = styled.div`
    position: relative;

    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: flex-end;

    width: 72px;
`;

export const IconStyled = styled(Icon)`
    cursor: pointer;

    color: var(--color-text-inactive);

    &:hover {
        color: var(--color-text-active);
    }
`;

export const TableDataStyled = styled(TableData)`
    position: relative;

    &::after {
        content: '';

        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 4px;

        background-color: var(--color-background-brand);
    }

    & > div {
        width: 100%;
    }

    & > div > div {
        width: 100%;
    }
`;

export const VersionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 100%;
`;

export const VersionsFlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-left: 24px;
`;

export const NoVersions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 8px;
`;
