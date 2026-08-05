import styled from '@emotion/styled';

export const Container = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

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

export const MenuWrapper = styled.div`
    flex-shrink: 0;
`;
