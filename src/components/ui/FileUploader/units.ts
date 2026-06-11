import styled from '@emotion/styled';

export const Wrapper = styled.section`
    &.dsb_file-uploader-wrapper__disabled {
        opacity: 0.48;
        cursor: default;
        pointer-events: none;
    }

    .dsb_file-uploader {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dashed var(--color-border);
        border-radius: 12px;
        padding: 16px;
        min-height: 104px;

        &:hover {
            background-color: var(--color-background-base-selected);
        }

        &.dsb_file-uploader__drag-over {
            background-color: var(--color-background-base-selected);
            border-color: var(--color-status-info);
        }

        &.dsb_file-uploader__error {
            background-color: var(--color-control-background-error);
            border-color: var(--color-status-error);
        }

        .dsb_file-uploader-input {
            position: absolute;
            width: 100%;
            height: 100%;
            display: block;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            border: none;
            text-transform: none;
            cursor: pointer;
        }
    }

    .dsb_file-uploader__error ~ .dsb_file-uploader-helper-text {
        color: var(--color-status-error);
    }

    .dsb_file-uploader-helper-text {
        display: block;
        padding: 4px 4px 4px 16px;
        color: var(--color-text-inactive);
        font-weight: 400;
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height: 16px;
        transition: all 100ms;

        &.dsb_file-uploader-helper-text__error {
            color: var(--color-status-error);
        }
    }
`;

export const DropZone = styled.div``;

export const TitleRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    width: 100%;

    .dsb_file-uploader-title_wrapper {
        text-align: center;

        * {
            display: inline;
        }

        .dsb_file-uploader-title_text {
            margin: 0;
            padding: 0;
            color: var(--color-text-active);
            font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-style: normal;
            line-height: 18px;
            letter-spacing: 0.2px;
            pointer-events: none;
            position: relative;
        }

        .dsb_file-uploader-title_link {
            margin: 0;
            padding: 0;
            color: var(--color-text-link);
            font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-style: normal;
            line-height: 18px;
            letter-spacing: 0.2px;
            position: relative;
        }
    }

    .dsb_file-uploader-title_subtitle {
        color: var(--color-text-disabled);
        text-align: center;
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
`;
