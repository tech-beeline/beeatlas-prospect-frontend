import styled from '@emotion/styled';

import { FileUploaderListItem } from 'components/ui';

export const Form = styled.form`
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
`;

export const ScrollArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: min(100%, 1000px);
    margin: 0 auto;
    padding: 32px 24px 48px;
`;

export const FieldGroup = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FileRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 12px;
`;

export const FileInfo = styled.div`
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 16px;
`;

export const FileUploaderListItemStyled = styled(FileUploaderListItem)`
    padding: 0;
    width: 32px;

    .dsb_file-uploader-file-delete {
        display: none;
    }
`;

export const FileName = styled.div`
    margin-left: -32px;
`;

export const FileMetadata = styled.div`
    margin-top: 4px;
    color: var(--color-text-inactive);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
`;

export const FileActions = styled.div`
    display: flex;
    flex: 0 0 auto;
    gap: 8px;
`;

export const Footer = styled.footer`
    display: flex;
    flex: 0 0 80px;
    align-items: center;
    justify-content: flex-end;
    padding: 16px 24px;
    border-top: 1px solid var(--color-divider);

    > button {
        min-width: 120px;
    }
`;
