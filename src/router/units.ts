import styled from '@emotion/styled';

export const RouteWrapperStyle = styled.div`
    height: 100vh;
    padding-left: 256px;

    background-color: var(--color-background-base);
`;

export const RouteWrapperOnlyBackgroundStyle = styled.div`
    background-color: var(--color-background-base);
`;

export const RouteWrapperOnlyBackgroundStyled = styled(RouteWrapperOnlyBackgroundStyle)`
    height: 100%;
`;
