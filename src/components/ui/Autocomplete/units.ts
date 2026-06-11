import styled from '@emotion/styled';

export const AutocompleteRoot = styled.div`
    &.dsb__autocomplete .dsb_input,
    &.dsb__autocomplete .dsb_search {
        text-overflow: ellipsis;
    }
`;

export const OptionsList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    width: 100%;
    max-height: 480px;
    padding: 8px 0;
    background: var(--color-background-medium);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    @media screen and (max-height: 500px) {
        max-height: 90vh;
    }
`;

export const OptionItem = styled.div`
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 16px;
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    letter-spacing: 0.2px;
    line-height: 22px;
    font-size: 17px;
    font-weight: 400;
    color: var(--color-text-active);
    cursor: pointer;

    &.focused {
        background-color: var(--color-background-base-hover) !important;
    }

    &.selected {
        background-color: var(--color-background-base-selected);
    }

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    & .dsb__autocomplete__option-text {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &.dsb__autocomplete__options__item--empty {
        font-size: 15px;
        font-weight: 500;
        line-height: 20px;
        color: var(--color-text-inactive);
        pointer-events: none;
        cursor: default;
    }
`;
