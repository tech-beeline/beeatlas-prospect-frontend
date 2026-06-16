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

export const RouteWithDrawer = styled.div`
    display: flex;

    height: 100vh;
    padding-top: 64px;

    background-color: var(--color-background-base);
`;

export const ContentWrapper = styled.div<{ hideXOverflow?: boolean }>`
    height: calc(100vh - 64px);
    width: 100%;

    overflow-y: auto;
    overflow-x: ${({ hideXOverflow }) => (hideXOverflow ? 'hidden' : 'auto')};
`;

export const IFrameStyled = styled.iframe`
    display: block;

    width: 100%;
    height: 100%;

    border: none;
`;
