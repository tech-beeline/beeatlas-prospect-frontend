import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
    padding: 32px;

    color: var(--color-text-active);
`;

export const Content = styled.div`
    width: 740px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    margin-bottom: 16px;
`;

export const StepperContainer = styled.div`
    margin-bottom: 24px;

    border-bottom: 1px solid var(--color-divider);

    & > div {
        padding: 0px;
    }
`;

export const BannerContainer = styled.div`
    margin-bottom: 24px;
`;
