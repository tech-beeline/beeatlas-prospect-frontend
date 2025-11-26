import styled from '@emotion/styled';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex: 1;
`;

export const OverflowContainer = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;

    width: 100%;
    max-height: calc(100vh - 64px - 56px - 89px);
    padding-top: 32px;

    overflow: auto;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    max-width: 910px;
`;

export const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding-bottom: 32px;

    width: 100%;
`;

export const MarkdownFileContainer = styled.div`
    padding: 16px;

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);

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

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    max-width: 100%;

    overflow: hidden;
`;
