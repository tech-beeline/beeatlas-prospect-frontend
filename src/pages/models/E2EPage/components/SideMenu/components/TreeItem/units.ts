import styled from '@emotion/styled';

export const Container = styled.div<{ level: number; selected: boolean; isBiStep: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    min-height: 48px;
    padding: 4px 16px;
    margin-left: ${({ level, isBiStep }) => `${level * 36 + (isBiStep ? 36 : 0)}px`};

    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const IconButtonContainer = styled.div`
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
`;

export const TreeItemTitle = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
`;
