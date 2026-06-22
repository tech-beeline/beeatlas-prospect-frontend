import styled from '@emotion/styled';

export const SearchCard = styled.div<{ maxWidth?: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 16px;

    ${({ maxWidth }) => maxWidth && `max-width: 648px;`}

    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    overflow: hidden;
    word-break: break-word;
`;

export const SearchCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PaginationContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;
