import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;

    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 24px;
    max-width: 909px;
    width: 100%;
`;

export const MarkdownFileContainer = styled.div`
    padding: 24px;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-border);

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

export const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 105.5px 0;
`;
