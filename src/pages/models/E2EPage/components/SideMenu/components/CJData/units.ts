import styled from '@emotion/styled';

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px 16px 16px 16px;

    background-color: var(--color-background-base);

    border-bottom: 1px solid var(--color-divider);
`;

export const SearchContainer = styled.div`
    position: relative;
`;

export const TreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    flex: 1;

    padding: 16px 8px 32px 8px;

    overflow-y: auto;
`;

export const MenuBlock = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;

    transform: translateY(100%);

    display: flex;
    flex-direction: column;

    padding: 8px 0;

    max-height: 400px;

    overflow-y: auto;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;
`;

export const MenuItem = styled.div`
    padding: 12px 16px;

    color: var(--color-text-active);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;
