import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    width: 100%;

    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const BreadcrumbContainer = styled.div`
    display: flex;
    gap: 12px;
`;

export const SpaceBetweenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const LabelsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const ExpandableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const AppsTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ConfluenceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 300px;

    background-color: var(--color-status-neutral-background);

    border-radius: var(--size-border-radius-x6);
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 112px;
`;

export const FileContentContainer = styled.div`
    padding: 16px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
