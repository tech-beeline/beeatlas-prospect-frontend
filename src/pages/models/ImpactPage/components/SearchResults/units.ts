import styled from '@emotion/styled';

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const SubtitleContainer = styled.div`
    padding-left: 16px;
`;

export const SearchCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 16px;

    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const SearchCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 12px;
`;

export const PaginationContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;
