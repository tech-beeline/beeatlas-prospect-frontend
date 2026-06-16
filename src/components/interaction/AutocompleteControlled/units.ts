import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
`;

export const Menu = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0;

    transform: translateY(100%);

    flex-direction: column;

    padding: 8px 0px;
    width: 100%;

    max-height: 600px;
    overflow-y: auto;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;
`;

export const MenuItem = styled.div`
    padding: 12px 16px;
    max-height: 46px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--color-text-active);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
