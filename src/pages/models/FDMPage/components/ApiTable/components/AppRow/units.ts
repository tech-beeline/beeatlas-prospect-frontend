import styled from '@emotion/styled';

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const TableHeadContainer = styled.div<{ first?: boolean }>`
    font-weight: 500;

    ${({ first }) => (first ? 'padding-left: 24px;' : '')}
`;
