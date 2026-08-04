import styled from '@emotion/styled';

export const SelectRoot = styled.div`
    &.dsb__select .dsb_input {
        caret-color: transparent;
        cursor: pointer;
        text-overflow: ellipsis;
    }

    .dsb__select__dropdown-content {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        padding: 8px 0;
        background: var(--color-background-medium);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        max-height: inherit;
    }

    .dsb__select__options {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        max-height: 568px;
        overflow: auto;
        width: 100%;
    }

    .dsb__select__options__item {
        display: flex;
        flex: 0 0 auto;
        width: 100%;
        padding: 12px 16px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        letter-spacing: 0.2px;
        line-height: 22px;
        font-size: 17px;
        font-weight: 400;
        cursor: pointer;
        color: var(--color-text-active);
        align-items: center;
    }

    .dsb__select__options__item.disabled {
        cursor: not-allowed;
        color: rgba(25, 28, 52, 0.48);
        pointer-events: none;
        background-color: transparent;
    }

    .dsb__select__options__item.disabled:hover {
        background-color: transparent;
    }

    .dsb__select__options__item.focused {
        background-color: var(--color-background-base-hover) !important;
    }

    .dsb__select__options__item_empty {
        pointer-events: none;
        opacity: 0.85;
    }

    .dsb__select__options__item:hover {
        background-color: var(--color-background-base-hover);
    }

    .dsb__select__options__item:active {
        background-color: var(--color-background-base-pressed);
    }

    .dsb__select__options__item.selected {
        background-color: var(--color-background-base-selected);
    }

    .dsb__select__options__item.selected:hover {
        background-color: var(--color-background-base-hover);
    }

    .dsb__select__options__item span,
    .dsb__select__option-text {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dsb__select__options__item__checkbox {
        margin-right: 16px;
    }

    .dsb__select__options__filter {
        padding: 8px 16px 16px 16px;
    }

    .dsb__select__options__group-title {
        padding: 9px 20px;
        color: rgba(25, 28, 52, 0.48);
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 17px;
        line-height: 22px;
    }

    .dsb__overflow__hidden {
        visibility: hidden;
        position: absolute;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        top: 0;
        left: 0;
    }

    .dsb__overflow__count {
        display: none;
        position: absolute;
        margin: 0;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
    }

    .dsb__overflow__count.show-count {
        display: block;
    }
`;

export const DropdownPortal = styled.div`
    z-index: 1000;
    display: flex;
    flex-direction: column;
`;

export const DropdownContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
    max-height: 100%;
    padding: 8px 0;
    background: var(--color-background-medium);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
`;

export const OptionsList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    width: 100%;
`;

export const OptionItem = styled.div`
    display: flex;
    gap: 16px;
    flex: 0 0 auto;
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    letter-spacing: 0.2px;
    line-height: 22px;
    font-size: 17px;
    font-weight: 400;
    cursor: pointer;
    color: var(--color-text-active);
    align-items: center;

    &.disabled {
        cursor: not-allowed;
        color: rgba(25, 28, 52, 0.48);
        pointer-events: none;
        background-color: transparent;
    }

    &.focused {
        background-color: var(--color-background-base-hover) !important;
    }

    &.empty {
        pointer-events: none;
        opacity: 0.85;
    }

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:active {
        background-color: var(--color-background-base-pressed);
    }

    &.selected {
        background-color: var(--color-background-base-selected);
    }

    &.selected:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const FilterContainer = styled.div`
    padding: 8px 16px 16px 16px;
`;

export const GroupTitle = styled.div`
    padding: 9px 20px;
    color: rgba(25, 28, 52, 0.48);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 17px;
    line-height: 22px;
`;

export const HiddenOverflowText = styled.p`
    visibility: hidden;
    position: absolute;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    top: 0;
    left: 0;
`;

export const OverflowCounter = styled.p`
    display: none;
    position: absolute;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    color: inherit;

    &.show-count {
        display: block;
    }
`;
