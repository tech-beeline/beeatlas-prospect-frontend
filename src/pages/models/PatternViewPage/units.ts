import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: calc(100vh - 64px);

    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow: auto;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1;
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

    margin-bottom: 4px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const LabelsContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-top: 16px;
`;

export const TechnologyLabelsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    flex: 1;

    @media only screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
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

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 88px 0px;

    height: 100%;

    flex: 1;
`;

export const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;

export const TextWrap = styled.code`
    white-space: pre-wrap;
    font-size: 14px;
`;

export const PatternFileContainer = styled.div`
    padding: 16px;

    height: fit-content;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    font-size: var(--font-size-body2);
    font-weight: var(--font-weight-body2);
    line-height: var(--font-line-height-body2);

    * {
        white-space: normal;
    }

    h1 {
        font-size: var(--font-size-h4);
        font-weight: var(--font-weight-h4);
        line-height: var(--font-line-height-h4);
    }

    h2 {
        font-size: var(--font-size-h6);
        font-weight: var(--font-weight-h6);
        line-height: var(--font-line-height-h6);

        :not(:first-child) {
            margin-top: 24px;
        }
    }

    h3 {
        font-size: var(--font-size-subtitle2);
        font-weight: var(--font-weight-subtitle2);
        line-height: var(--font-line-height-subtitle2);
    }

    *:not(h2) + h3 {
        margin-top: 24px;
    }

    ul,
    ol {
        margin: 0;
    }

    a {
        color: var(--color-text-link);

        cursor: pointer;
    }

    strong {
        font-weight: var(--font-weight-subtitle2);
    }
`;
