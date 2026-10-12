import styled from '@emotion/styled';

export const Row = styled.div<{ level: number; selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;

    min-height: 48px;
    padding: 6px 8px;
    margin-left: ${({ level }) => `${level * 36}px`};

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'transparent'};
    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const ExpandButton = styled.div`
    min-width: 20px;
    max-width: 20px;
`;

export const Call = styled.div`
    flex: 1;
    min-width: 0;

    word-break: break-all;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Product = styled.div`
    flex-shrink: 0;
    max-width: 120px;
`;
