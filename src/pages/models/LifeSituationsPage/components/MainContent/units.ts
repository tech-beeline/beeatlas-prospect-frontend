import styled from '@emotion/styled';

export const Container = styled.div`
    height: calc(100vh - 64px);

    flex: 1;

    padding: 24px 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow-y: auto;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
`;
