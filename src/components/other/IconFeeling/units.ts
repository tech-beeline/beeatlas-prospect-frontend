import styled from '@emotion/styled';

export const Container = styled.div<{ isActive: boolean }>`
    width: 40px;
    height: 40px;

    padding: 10px;

    border-radius: ${({ isActive }) =>
        isActive ? 'var(--size-border-radius-x3)' : 'var(--size-border-radius-circle)'};

    transition: 0.25s all;

    cursor: pointer;
`;
