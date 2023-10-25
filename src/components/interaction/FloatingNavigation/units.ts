import styled from '@emotion/styled';

export const NavItem = styled.div<{ isActive?: boolean }>`
    position: relative;

    width: 256px;

    padding: 8px 20px;

    color: ${({ isActive }) =>
        isActive ? 'var(--color-text-active)' : 'var(--color-text-inactive)'};
    font-weight: ${({ isActive }) =>
        isActive ? 'var(--font-weight-subtitle2)' : 'var(--font-weight-body2)'};
    font-size: ${({ isActive }) =>
        isActive ? 'var(--font-size-subtitle2)' : 'var(--font-size-body2)'};
    line-height: ${({ isActive }) =>
        isActive ? 'var(--font-line-height-subtitle2)' : 'var(--font-line-height-body2)'};

    cursor: pointer;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';

        height: 100%;
        width: ${({ isActive }) => (isActive ? '4px' : '1px')};
        background-color: ${({ isActive }) =>
            isActive ? 'var(--color-background-brand)' : 'var(--color-divider)'};
        border-radius: ${({ isActive }) => (isActive ? '0px 3px 3px 0px' : '0px')};
    }
`;
