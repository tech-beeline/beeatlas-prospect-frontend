import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    height: calc(100vh - 64px);
    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    margin-top: 8px;
`;

export const VersionsCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 16px;

    width: fit-content;

    padding: 16px;

    margin-top: 16px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x8);
`;

export const Divider = styled.div`
    width: 1px;
    height: 40px;

    background-color: var(--color-divider);
`;

export const TabsContainer = styled.div`
    margin-top: 16px;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;

    padding: 24px 0px;
`;
