import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;

    width: 100%;

    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TabsContainer = styled.div`
    margin-top: -8px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const SearchContainer = styled.div`
    width: 540px;
    max-width: 540px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 140px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
`;
