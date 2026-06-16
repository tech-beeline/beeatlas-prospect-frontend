import styled from '@emotion/styled';

export const Container = styled.div`
    min-width: 395px;
    max-width: 395px;
    height: calc(100vh - 64px);

    padding: 24px 16px;

    border-right: 1px solid var(--color-divider);

    overflow-y: auto;
`;

export const SearchResultContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 16px;
`;

export const CapabilityCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    user-select: none;
    cursor: pointer;
`;

export const SearchSkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    padding: 16px 0px;
`;
