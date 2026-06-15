import styled from '@emotion/styled';

import { TableHeaderData } from 'components/ui';

export const PageWrapper = styled.div`
    position: relative;

    width: 100%;

    padding: 32px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;

export const FileNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 140px;
`;
