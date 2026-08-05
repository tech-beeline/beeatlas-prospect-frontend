import styled from '@emotion/styled';

export const HistoryItem = styled.div<{ selected: boolean }>`
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};

    &:hover {
        background: var(--color-control-background);
    }
`;

export const Title = styled.div`
    flex: 1;
    min-width: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
