import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    --assessment-content-width: clamp(900px, calc(100% - 64px), 1230px);

    display: flex;
    flex-direction: column;

    width: 100%;
    min-width: 1180px;
    height: var(--app-height);
    min-height: 640px;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    flex-shrink: 0;
    height: 64px;
    padding: 12px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Subheader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
    height: 56px;

    border-bottom: 1px solid var(--color-divider);
`;

export const StepContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
`;

export const StepBody = styled.div`
    flex: 1;
    min-height: 0;
`;

export const ErrorBannerWrapper = styled.div`
    flex-shrink: 0;
    box-sizing: border-box;
    width: var(--assessment-content-width);
    margin: 0 auto;
    padding-top: 16px;
`;

export const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    padding: 32px;
`;

export const StandaloneBanner = styled.div`
    width: 100%;
    max-width: 910px;
    margin: 0 auto;
    padding: 32px;
`;

export const NotFoundPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 100%;
    padding: 32px;
`;
