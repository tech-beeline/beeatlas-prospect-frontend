import styled from '@emotion/styled';

import { FileUploaderListItem } from 'components/ui';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    padding: var(--size-spacing-x8) 0 0;
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

export const FileDataContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
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

    max-width: 768px;
    gap: 4px;
`;

export const RowContainer = styled.div`
    display: flex;
    gap: var(--size-spacing-x6);

    & > * {
        flex: 1;
    }
`;

export const TechnicalContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: var(--size-spacing-x6);
`;
