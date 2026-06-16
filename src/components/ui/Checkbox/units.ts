import styled from '@emotion/styled';

export const StyledCheckbox = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    max-width: max-content;

    .dsb_icon.dsb_checkbox-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        font-style: normal;
        font-weight: normal;
        font-size: 0;
        border: 1px solid var(--color-border);
        border-radius: 6px;
    }

    &:hover .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-text-disabled);
        background-color: var(--color-control-background-hover);
    }

    &.disabled {
        cursor: auto;
        pointer-events: none;
        opacity: 0.48;
    }

    &.dsb_checkbox__error.disabled {
        opacity: 0.48;
    }

    &.dsb_checkbox__error .dsb_checkbox-input:not(:checked) ~ .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-border-error);
        background-color: var(--color-control-background-error);
    }

    &.dsb_checkbox__error .dsb_checkbox-input:not(:checked):hover ~ .dsb_icon.dsb_checkbox-icon {
        border-color: #e04a4a;
        background-color: var(--color-control-background-error);
    }

    &.dsb_checkbox__error
        .dsb_checkbox-input:not(:checked):focus-visible
        ~ .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-border-error);
    }

    &.dsb_checkbox__error .dsb_checkbox-input:checked ~ .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-border-error);
        background-color: var(--color-border-error);
        color: #ffffff;
    }

    &.dsb_checkbox__error .dsb_checkbox-input:checked:hover ~ .dsb_icon.dsb_checkbox-icon {
        border-color: #e04a4a;
        background-color: #e04a4a;
        color: #ffffff;
    }

    &.dsb_checkbox__error .dsb_checkbox-input:checked:focus-visible ~ .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-border-error);
    }
`;

export const CheckboxRoot = styled.span`
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
`;

export const CheckboxInput = styled.input`
    appearance: auto;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    pointer-events: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;

    &:active ~ .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-border);
        background-color: var(--color-control-background-pressed);
    }

    &:checked ~ .dsb_icon.dsb_checkbox-icon {
        font-size: 24px;
        border-color: #fdd835;
        background-color: #fdd835;
        color: rgba(9, 11, 22, 0.94);
    }

    &:checked:hover ~ .dsb_icon.dsb_checkbox-icon {
        border-color: transparent;
        background-color: #fdc435;
    }

    &:checked:active ~ .dsb_icon.dsb_checkbox-icon {
        border-color: transparent;
        background-color: #fdb435;
    }

    &:focus-visible ~ .dsb_icon.dsb_checkbox-icon {
        border-color: var(--color-border-focus);
    }
`;

export const CheckboxIcon = styled.span`
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
`;

export const CheckboxLabel = styled.p`
    margin: 0 0 0 16px;
    color: var(--color-text-active);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-size: var(--font-size-body2, 15px);
    font-weight: var(--font-weight-body2, 400);
    line-height: var(--font-line-height-body2, 18px);
    letter-spacing: 0.2px;
`;
