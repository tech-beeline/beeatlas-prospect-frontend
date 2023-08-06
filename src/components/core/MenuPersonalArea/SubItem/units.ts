import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;
    padding: 0 16px 0 56px;

    font-weight: ${({ isActive }) =>
        isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)'};
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: ${({ isActive }) =>
        isActive ? 'var(--color-text-active)' : 'var(--color-text-inactive)'};
    background-color: ${({ isActive }) =>
        isActive ? 'var(--color-background-base-selected)' : 'transparent'};

    border-radius: var(--size-border-radius-x6);

    transition: all 0.25s ease-out;

    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:active {
        background-color: var(--color-background-base-selected);
    }
`;
