import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    min-height: 0;
    height: calc(var(--app-height) - var(--header-height, 64px));

    color: var(--color-text-active);
`;
