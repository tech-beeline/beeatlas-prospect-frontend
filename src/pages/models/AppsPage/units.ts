import { Table } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 32px 32px;
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

export const SearchContainer = styled.div`
    max-width: 648px;
`;

export const TableStyled = styled(Table)`
    overflow: hidden;
`;
