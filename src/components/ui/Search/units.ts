import styled from '@emotion/styled';

export const SearchWrapper = styled.span`
    position: relative;
    width: fit-content;
    display: flex;
    justify-content: center;
    height: fit-content;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.2px;
    color: var(--color-text-active);

    &.dsb_search-wrapper__full {
        width: 100%;
    }

    .dsb_search {
        outline: none;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        background: var(--color-control-background);
        border-radius: 12px;
        font-size: 17px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.2px;
        color: var(--color-text-active);
        transition: 0.1s;
        width: 100%;
        box-sizing: border-box;
        font-family: inherit;
    }

    .dsb_search-size__small {
        padding: 10px 52px;
        height: 40px;
    }

    .dsb_search-size__medium {
        padding: 12px 56px;
        height: 48px;
    }

    .dsb_search:hover {
        border-color: var(--color-border-focus);
    }

    .dsb_search:focus {
        border-color: var(--color-border-focus);
        background: transparent;
    }

    .dsb_search:disabled {
        cursor: not-allowed;
        opacity: 0.48;
    }

    .dsb_search::-webkit-search-cancel-button,
    .dsb_search::-webkit-search-decoration,
    .dsb_search::-webkit-search-results-button,
    .dsb_search::-webkit-search-results-decoration {
        -webkit-appearance: none;
        height: 1px;
        width: 1px;
        opacity: 0;
        pointer-events: none;
        display: none;
    }

    .dsb_search::placeholder {
        color: var(--color-text-disabled);
    }

    .dsb_search_categories {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 16px;
        padding-right: 16px;
        position: absolute;
        top: 50%;
        right: 0;
        cursor: pointer;
        transform: translateY(-50%);
    }

    .dsb_search_categories_vertical-divider {
        width: 1px !important;
        height: calc(100% - 16px) !important;
    }

    .dsb_search_categories_label-placeholder {
        color: var(--color-text-disabled);
    }

    .dsb_search-button {
        position: absolute;
        top: 50%;
        left: 16px;
        cursor: pointer;
        transform: translateY(-50%);
    }

    .dsb_search-close-button {
        position: absolute;
        top: 50%;
        right: 16px;
        cursor: pointer;
        transform: translateY(-50%);
    }
`;

export const DropdownOptions = styled.div`
    padding: 16px 0;
    background: var(--color-background-medium);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    z-index: 1000;
`;

export const DropdownItem = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 17px;
    line-height: 22px;
    overflow: hidden;
    padding: 12px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    color: var(--color-text-active);

    &:hover,
    &.selected {
        background-color: var(--color-background-base-hover);
    }
`;
