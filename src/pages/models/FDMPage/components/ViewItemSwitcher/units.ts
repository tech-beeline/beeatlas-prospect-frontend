import styled from '@emotion/styled';

export const Wrapper = styled.div`
    position: relative;

    display: flex;
    align-items: center;

    width: 80px;
    height: 40px;
    margin-left: auto;

    border: 1px solid;
    border-color: var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    & > div:nth-child(1) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    & > div:nth-child(2) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        height: 100%;
        width: 1px;

        background-color: var(--color-background-base-selected);
    }
`;

export const Element = styled.div<any>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 100%;

    border-radius: var(--size-border-radius-x6);

    background-color: ${({ id, activeElement }) =>
        activeElement === id
            ? 'var(--color-background-base-selected)'
            : 'var(--color-background-base'};

    transition: background-color 0.25s ease-in-out;

    cursor: pointer;
`;
