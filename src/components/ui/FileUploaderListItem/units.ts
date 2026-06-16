import styled from '@emotion/styled';

export const Root = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Description = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 12px;

    .dsb_file-uploader-file-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        margin-right: 16px;
    }

    .dsb_file-uploader-file_name {
        display: flex;
        align-items: center;
        flex: 1;
        margin-right: 16px;

        .dsb_file-uploader-file_name-text {
            display: flex;
            flex-direction: column;
            word-break: break-word;

            .error-text {
                color: var(--color-status-error);
                font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 15px;
                font-weight: 400;
                line-height: 18px;
                letter-spacing: 0.2px;
                text-align: left;
            }
        }
    }

    .dsb_file-uploader-file-refresh {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        user-select: none;

        .dsb_icon {
            cursor: pointer;
        }
    }

    .dsb_file-uploader-file-delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        margin-left: 16px;
        user-select: none;

        .dsb_icon {
            cursor: pointer;
        }
    }
`;

export const NameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const NameRow = styled.span`
    display: flex;
    align-items: center;
`;

export const FileIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ActionRefresh = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ActionDelete = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProgressSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    padding-right: 12px;
    padding-left: 56px;

    .progress-style {
        width: 100%;
        border-radius: 4px;

        .dsb_progress-bar {
            background: #8dcaff;
        }
    }
`;

export const SizeLine = styled.div`
    padding-top: 4px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: var(--color-text-inactive);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.2px;
    text-align: left;

    .percent {
        color: var(--color-text-active);
        opacity: 0.7;
    }
`;
