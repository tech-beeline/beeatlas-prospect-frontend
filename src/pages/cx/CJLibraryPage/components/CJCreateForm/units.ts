import { FileUploaderListItem } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Container = styled.div``;

export const Content = styled.div<{ hasButtons: boolean }>`
    height: ${({ hasButtons }) => (hasButtons ? 'calc(100vh - 96px)' : '100vh')};
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto;
    padding: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
`;

export const FileAddingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 16px;
    gap: 16px;

    .dsb_file-uploader_file {
        margin: 0 !important;
        padding: 0 !important;
        margin-right: 0 !important;
        width: 32px !important;

        .dsb_file-uploader-file_name,
        .dsb_file-uploader-file-icon {
            margin-right: 0 !important;
            min-height: auto !important;
            min-width: auto !important;
        }
    }
`;

export const FileUploaderListItemStyled = styled(FileUploaderListItem)`
    padding: 0;
    width: 32px;

    .dsb_file-uploader-file-delete {
        display: none;
    }
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    gap: 4px;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    gap: 16px;

    width: 100%;
    height: 96px;
    padding: 24px;
    border-top: 1px solid rgba(25, 28, 52, 0.12);
    > Button {
        width: 100%;
    }
`;
