import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
`;

export const MenuBlock = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0;

    transform: translateY(100%);

    max-height: 480px;

    overflow-y: auto;

    flex-direction: column;

    padding: 8px 0px;
    width: 100%;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;
`;

export const MenuItem = styled.div<{ inActive?: boolean }>`
    padding: 12px 16px;

    color: ${({ inActive }) =>
        inActive ? 'var(--color-text-inactive)' : 'var(--color-text-active)'};

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
