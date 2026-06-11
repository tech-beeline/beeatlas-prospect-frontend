import styled from '@emotion/styled';

import { FileUploaderListItem } from 'components/ui';

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 0 16px;
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 236px;
    gap: 4px;
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
