import styled from '@emotion/styled';

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
`;

export const SearchBarContainer = styled.div`
    position: relative;

    flex: 1;

    max-width: 648px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SelectContainer = styled.div`
    flex: 1;

    max-width: 312px;
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
