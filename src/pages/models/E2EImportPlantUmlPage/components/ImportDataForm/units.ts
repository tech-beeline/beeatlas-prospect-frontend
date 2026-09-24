import styled from '@emotion/styled';

import { FileUploaderListItem } from 'components/ui';

export const Form = styled.form`
    display: flex;
    flex: 1;
    width: 100%;
    min-height: 0;
    min-width: 0;
    flex-direction: column;
`;

export const ScrollArea = styled.div`
    flex: 1;
    width: 100%;
    min-height: 0;
    min-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const Content = styled.div`
    display: flex;
    box-sizing: border-box;
    width: min(910px, calc(100% - 48px));
    min-width: 0;
    margin: 32px auto;
    flex-direction: column;
    gap: 32px;
`;

export const FieldGroup = styled.section`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 16px;
`;

export const FileRow = styled.div`
    display: flex;
    min-width: 0;
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
    min-width: 0;
    margin-left: -32px;
    overflow-wrap: anywhere;
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
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    border-top: 1px solid var(--color-divider);
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    max-width: 910px;
`;
