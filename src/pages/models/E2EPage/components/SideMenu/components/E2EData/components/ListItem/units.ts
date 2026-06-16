import styled from '@emotion/styled';

export const Container = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;

    max-height: 48px;
    padding: 16px;

    border-radius: var(--size-border-radius-x6);

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};

    cursor: pointer;
`;

export const TreeItemTitle = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
`;
