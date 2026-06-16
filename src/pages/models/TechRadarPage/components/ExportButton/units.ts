import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 40px;
    right: 0px;

    width: 280px;
    padding: 8px 0;

    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-medium);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    user-select: none;
    cursor: pointer;

    z-index: 10;
`;

export const DropdownItem = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 46px;
    padding: 12px 16px;

    color: var(--color-background-inverse);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
