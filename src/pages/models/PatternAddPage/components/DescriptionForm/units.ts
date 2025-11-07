import styled from '@emotion/styled';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex: 1;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1;

    width: 100%;
    max-width: 910px;
    padding: 32px 0px;
`;

export const TextContainer = styled.div`
    margin-top: -32px;
`;

export const MarkdownFileContainer = styled.div`
    padding: 16px;

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);

    * {
        font-size: var(--font-size-body2);
        font-weight: var(--font-weight-body2);
        line-height: var(--font-line-height-body2);

        white-space: pre-wrap;
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
`;
