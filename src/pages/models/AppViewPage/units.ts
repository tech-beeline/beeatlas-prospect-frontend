import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const BannerContainer = styled.div`
    margin-bottom: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const TabsContainer = styled.div`
    margin-top: 16px;
    margin-bottom: 24px;
`;
