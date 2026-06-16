import styled from '@emotion/styled';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Divider = styled.div`
    width: 1px;
    height: 100%;

    background-color: var(--color-divider);
`;
