import styled from '@emotion/styled';

export const FormCard = styled.div`
    &.dsb_card.dsb_inline-edit-form {
        max-height: 60px;
        padding: 8px;
        display: flex;
        align-items: center;
    }

    &.dsb_inline-edit-form {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        max-height: 60px;
        max-width: max-content;
        padding: 8px;
        border-radius: 12px;
        box-sizing: border-box;
        box-shadow: none;
        border: 1px solid transparent;
        background-origin: border-box;
        background-color: var(--color-background-base);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: var(--color-background-medium);
    }

    &.dsb_inline-edit-form__helperText {
        max-height: 76px;
    }

    .dsb_inline-edit-form-input {
        width: auto;
    }
`;

export const FormIcons = styled.div`
    display: inline-flex;
    margin-left: 12px;

    .dsb_inline-edit-form-icon {
        user-select: none;

        &:hover {
            cursor: pointer;
        }
    }

    .dsb_inline-edit-form-icon__cancel {
        margin-left: 8px;
    }
`;

export const FormIcon = styled.span`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    color: var(--color-text-active);
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
`;

export const TextFieldWrapper = styled.div`
    position: relative;
    width: 252px;

    .dsb_input-wrapper {
        border: 1px solid transparent;
        border-radius: 12px;

        &:hover,
        &:focus-within {
            border-color: var(--color-border-focus);
        }
    }

    .dsb_input {
        width: 100%;
        padding: 0 16px;
        color: var(--color-text-active);
        background: var(--color-control-background);
        border: none;
        outline: none;
        border-radius: 12px;
        font-size: 15px;
        line-height: 20px;
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        transition: all 100ms cubic-bezier(0, 0, 0.2, 1);
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 40px;
    }

    .dsb_input-helper-text {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        margin-top: 4px;
        padding: 0 16px;
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height: 16px;
        color: var(--color-text-inactive);
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
    }
`;

export const ModalRoot = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

export const ModalPositioner = styled.div`
    position: absolute;
`;
