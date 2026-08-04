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

export const AppContent = styled.div`
    --app-height: calc(100vh - var(--top-banner-height, 0px));

    height: 100vh;
    padding-top: var(--top-banner-height, 0px);
    box-sizing: border-box;
`;

export const RouteWithDrawer = styled.div`
    display: flex;

    height: calc(100vh - var(--top-banner-height, 0px));
    padding-top: var(--header-height, 64px);

    background-color: var(--color-background-base);
`;

export const ContentWrapper = styled.div<{ hideXOverflow?: boolean }>`
    height: calc(100vh - var(--header-height, 64px) - var(--top-banner-height, 0px));
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
