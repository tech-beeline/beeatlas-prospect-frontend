import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    max-width: 648px;
`;

export const EmptyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 32px;

    border-radius: var(--size-border-radius-x8);
    border: 1px solid var(--color-divider);
`;
