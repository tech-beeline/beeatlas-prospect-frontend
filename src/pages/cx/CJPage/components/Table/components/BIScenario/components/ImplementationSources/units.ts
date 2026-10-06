import styled from '@emotion/styled';

export const SourceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const EmptyContainer = styled.div`
    padding: 12px 16px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const SourceItem = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;

    width: 100%;
    padding: 12px 16px;

    color: inherit;
    font: inherit;
    text-align: left;

    background-color: var(--color-background-base);
    border: 1px solid var(--color-divider);
    border-radius: 12px;

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const SourceDot = styled.span<{ color: string }>`
    flex-shrink: 0;

    width: 8px;
    height: 8px;

    background-color: ${({ color }) => color};
    border-radius: 50%;
`;

export const SourceText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    flex: 1;
    min-width: 0;
`;
