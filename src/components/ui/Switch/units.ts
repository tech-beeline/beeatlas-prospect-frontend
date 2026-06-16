import styled from '@emotion/styled';

export const StyledSwitch = styled.label`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0;
    opacity: unset;
    cursor: pointer;
    width: fit-content;

    &.dsb_switch__disabled {
        opacity: 0.48;
        cursor: auto;
        pointer-events: none;
    }

    &:hover:not(:active) .dsb_switch-track {
        background-color: var(--color-control-background-hover);
    }

    &:hover:active .dsb_switch-track {
        background-color: var(--color-control-background-pressed);
    }

    &:focus-within:not(:disabled):not(:hover):not(:active) .dsb_switch-track {
        box-sizing: border-box;
        outline: 1px solid var(--color-border-focus);
    }

    .dsb_switch-input {
        appearance: auto;
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;
        pointer-events: none;
        margin: 0;
        padding: 0;
    }

    .dsb_switch-input:checked ~ .dsb_switch-track {
        background-color: #fdd835;
    }

    .dsb_switch-input:checked ~ .dsb_switch-track .dsb_switch-slider:before {
        box-sizing: border-box;
        width: 6px;
        height: 16px;
        border: none;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: none;
        transform: translateX(26px);
    }

    &:hover .dsb_switch-input:checked ~ .dsb_switch-track {
        background-color: #fdc435;
    }

    &:hover:active .dsb_switch-input:checked ~ .dsb_switch-track {
        background-color: #fdb435;
    }

    &:focus-within:not(:disabled):not(:hover):not(:active)
        .dsb_switch-input:checked
        ~ .dsb_switch-track {
        box-sizing: border-box;
        outline: 1px solid var(--color-border-focus);
    }

    .dsb_switch-track {
        width: 44px;
        height: 24px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        background-color: var(--color-control-background);
        background-origin: border-box;
        box-sizing: border-box;
        transition: all 125ms cubic-bezier(0, 0, 0.2, 1);
        flex-shrink: 0;
        position: relative;
    }

    .dsb_switch-track .dsb_switch-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
    }

    .dsb_switch-track .dsb_switch-slider:before {
        width: 16px;
        height: 16px;
        position: absolute;
        color: transparent;
        border: calc((16px - 6px) / 2) solid #ffffff;
        border-radius: 50%;
        content: '';
        margin-left: 4px;
        margin-top: 4px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.08);
        box-sizing: border-box;
        transition: all 125ms cubic-bezier(0, 0, 0.2, 1);
    }

    .dsb_switch-label {
        margin-left: 16px;
    }

    &.dsb_switch__error .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error:hover:not(:active) .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error:hover:active .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error:focus-within:not(:hover):not(:active) .dsb_switch-track {
        outline: 1px solid var(--color-border-error);
    }

    &.dsb_switch__error .dsb_switch-input:not(:checked) ~ .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error:hover .dsb_switch-input:not(:checked) ~ .dsb_switch-track {
        background-color: #e04a4a;
    }

    &.dsb_switch__error:hover:active .dsb_switch-input:not(:checked) ~ .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error .dsb_switch-input:checked ~ .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error:hover .dsb_switch-input:checked ~ .dsb_switch-track {
        background-color: #e04a4a;
    }

    &.dsb_switch__error:hover:active .dsb_switch-input:checked ~ .dsb_switch-track {
        background-color: var(--color-border-error);
    }

    &.dsb_switch__error:focus-within:not(:hover):not(:active)
        .dsb_switch-input:checked
        ~ .dsb_switch-track {
        outline: 1px solid var(--color-border-error);
    }

    &.dsb_switch__error.dsb_switch__disabled {
        opacity: 0.48;
    }
`;

export const SwitchInput = styled.input``;

export const SwitchTrack = styled.span``;

export const SwitchSlider = styled.span``;

export const SwitchLabel = styled.p`
    margin: 0;
    color: var(--color-text-active);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-size: var(--font-size-body2, 15px);
    font-weight: var(--font-weight-body2, 400);
    line-height: var(--font-line-height-body2, 18px);
    letter-spacing: 0.2px;
`;
