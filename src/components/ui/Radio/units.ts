import styled from '@emotion/styled';

export const StyledRadio = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 0;
    margin-right: 0;
    max-width: max-content;
    position: relative;

    &:hover .dsb_radio-icon {
        background-color: var(--color-background-base-dragged);
    }

    &.dsb_radio__disabled {
        cursor: auto;
        pointer-events: none;
        opacity: 0.48;
    }

    &.dsb_radio__error .dsb_radio-input:not(:checked) ~ .dsb_radio-icon {
        border-color: var(--color-border-error);
        background-color: var(--color-control-background-error);
    }

    &.dsb_radio__error .dsb_radio-input:not(:checked):hover ~ .dsb_radio-icon {
        border-color: #e04a4a;
        background-color: var(--color-control-background-error);
    }

    &.dsb_radio__error .dsb_radio-input:not(:checked):focus-visible ~ .dsb_radio-icon {
        border-color: #e04a4a;
    }

    &.dsb_radio__error .dsb_radio-input:checked ~ .dsb_radio-icon {
        border-color: var(--color-border-error);
        background-color: var(--color-border-error);
        color: #ffffff;
    }

    &.dsb_radio__error .dsb_radio-input:checked:hover ~ .dsb_radio-icon {
        border-color: #e04a4a;
        background-color: #e04a4a;
    }

    &.dsb_radio__error .dsb_radio-input:checked:focus-visible ~ .dsb_radio-icon {
        border-color: var(--color-border-error);
    }
`;

export const RadioRoot = styled.span`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
`;

export const RadioInput = styled.input`
    appearance: auto;
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    pointer-events: none;
    margin: 0;
    padding: 0;

    &:active ~ .dsb_radio-icon {
        background-color: var(--color-control-background-pressed);
        border-color: var(--color-control-background-pressed);
    }

    &:checked ~ .dsb_radio-icon {
        background-origin: border-box;
        border-color: #fdd835;
        color: rgba(9, 11, 22, 0.94);
        background-color: #fdd835;
    }

    &:checked:hover ~ .dsb_radio-icon {
        border-color: #fdc435;
        background-color: #fdc435;
    }

    &:checked:active ~ .dsb_radio-icon {
        border-color: #fdb435;
        background-color: #fdb435;
    }

    &:focus-visible ~ .dsb_radio-icon {
        border-color: var(--color-border-focus);
    }
`;

export const RadioIcon = styled.span`
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
    color: transparent;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background-color: transparent;
`;

export const RadioLabel = styled.p`
    margin: 0 0 0 16px;
    color: var(--color-text-active);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-size: var(--font-size-body2, 15px);
    font-weight: var(--font-weight-body2, 400);
    line-height: var(--font-line-height-body2, 18px);
    letter-spacing: 0.2px;
`;
