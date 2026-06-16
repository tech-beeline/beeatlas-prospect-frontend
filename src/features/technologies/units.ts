import styled from '@emotion/styled';

export const TechnologyFileContainer = styled.div`
    padding: 16px;

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
