import styled from '@emotion/styled';

import { FileUploaderListItem } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const FileAddingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 352px;
    padding: 12px 16px;
    gap: 16px;
`;

export const FileNameWrapper = styled.div`
    display: flex;
    align-items: flex-start;
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
    width: 100%;
    gap: 4px;
`;

export const IconButtonContainer = styled.div`
    display: flex;
    gap: 16px;
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
