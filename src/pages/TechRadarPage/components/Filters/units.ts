import styled from '@emotion/styled';

export const FilterContainer = styled.div`
    position: relative;

    display: flex;

    width: fit-content;

    margin-top: 24px;
`;

export const MenuBlock = styled.div`
    position: absolute;
    bottom: -8px;
    left: 0;

    transform: translateY(100%);

    flex-direction: column;

    padding: 8px 0px;
    width: 100%;

    background-color: var(--color-background-base);

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
