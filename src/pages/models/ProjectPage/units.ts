import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    min-width: 760px;
    min-height: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const ProjectHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    margin-bottom: 32px;
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: -8px;
`;

export const ProjectMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    margin-top: 4px;
`;

export const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding-top: 24px;
`;

export const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const BusinessStatement = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BusinessSection = styled.div`
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }
`;

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 420px;
`;

export const Assessments = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const AssessmentsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    gap: 24px;

    @media only screen and (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const AgentsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(280px, 1fr));
    gap: 24px;

    @media only screen and (max-width: 1280px) {
        grid-template-columns: repeat(2, minmax(280px, 1fr));
    }
`;

export const NotFoundPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
`;

export const MarkdownFileContainer = styled.div`
    font-size: var(--font-size-body2);
    font-weight: var(--font-weight-body2);
    line-height: var(--font-line-height-body2);

    * {
        white-space: normal;
    }

    h1 {
        font-size: var(--font-size-h5);
        font-weight: var(--font-weight-h5);
        line-height: var(--font-line-height-h5);
    }

    h2 {
        font-size: var(--font-size-h6);
        font-weight: var(--font-weight-h6);
        line-height: var(--font-line-height-h6);
        margin-bottom: 8px;

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

    hr {
        margin-top: 24px;
    }

    strong {
        font-weight: var(--font-weight-subtitle2);
    }

    code {
        color: var(--color-status-error);
    }

    pre {
        background-color: rgba(25, 28, 52, 0.1);

        > code {
            color: var(--color-text-active);
        }
    }
`;
