import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    display: flex;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
    width: 216px;
    padding: 8px 0;
    border: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: var(--size-border-radius-x6);
    background-color: var(--color-background-base);
`;

export const DropdownItem = styled.button`
    display: block;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: none;
    color: var(--color-text-active);
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:hover,
    &:focus-visible {
        background-color: var(--color-background-base-hover);
    }
`;
