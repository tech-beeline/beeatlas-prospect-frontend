import styled from '@emotion/styled';

export const MessageFieldBorders = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-control-background);
    border: 1px solid transparent;
    border-radius: 12px;
    pointer-events: none;
    box-sizing: border-box;
`;

export const MessageFieldWrapper = styled.div`
    position: relative;
    width: 252px;
    box-sizing: border-box;
    cursor: text;

    &.dsb_message-field-wrapper--fullwidth {
        width: 100%;
    }

    &.dsb_message-field-wrapper--disabled {
        cursor: default;
        opacity: 0.48;
    }

    &:focus-within ${MessageFieldBorders} {
        background-color: transparent;
        border-color: var(--color-border-focus);
    }

    &:hover:not(.dsb_message-field-wrapper--disabled) ${MessageFieldBorders} {
        border-color: var(--color-border-focus);
    }

    &.dsb_message-field-wrapper--disabled ${MessageFieldBorders} {
        border-color: transparent;
    }
`;

export const MessageFieldTextarea = styled.textarea`
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    min-height: 40px;
    max-height: 260px;
    padding: 8px 16px;
    margin: 0;
    overflow-y: auto;
    resize: none;
    color: var(--color-text-active);
    border: none;
    outline: none;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 22px;
    background: transparent;
    box-sizing: border-box;

    &::placeholder {
        color: var(--color-text-disabled);
    }
`;
