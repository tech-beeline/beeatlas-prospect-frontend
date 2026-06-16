import styled from '@emotion/styled';

export const DatePickerRoot = styled.div`
    position: relative;
    width: fit-content;

    &.dsb_datepicker__full-width {
        width: 100%;
    }
`;

export const DropdownPortal = styled.div`
    z-index: 1300;
    box-sizing: border-box;

    .dsb_calendar {
        box-sizing: border-box;
        border-radius: 12px;
        background-color: var(--color-background-medium);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 4px 30px rgba(0, 0, 0, 0.1);
        width: 256px;
    }

    .dsb_calendar .dsb_calendar-panel {
        padding: 16px 20px 20px 20px;
    }

    .dsb_calendar .dsb_calendar-panel * {
        box-sizing: border-box;
    }

    .dsb_calendar .dsb_calendar-panel.multiselect {
        padding-bottom: 4px;
    }

    .dsb_calendar .dsb_calendar-footer {
        padding: 12px 16px 16px 16px;
    }

    .dsb_calendar .dsb_calendar-footer > button {
        width: 100%;
    }

    .dsb_calendar-panel {
        padding: 14px 20px 20px 20px;
        font-size: 14px;
        line-height: 20px;
    }

    .dsb_calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
    }

    .dsb_calendar-header .dsb_calendar-title {
        all: initial;
        display: flex;
        gap: 4px;
    }

    .dsb_calendar-header .dsb_calendar-navigation {
        display: inline-flex;
        gap: 20px;
    }

    .dsb_calendar-select-year,
    .dsb_calendar-select-month {
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 15px;
        line-height: 24px;
        letter-spacing: 0.2px;
        color: var(--color-text-inactive);
    }

    .dsb_calendar-select-month {
        padding-left: 5px;
    }

    .dsb_calendar-select-year:hover,
    .dsb_calendar-select-month:hover {
        cursor: default;
    }

    .dsb_calendar-dates {
        table-layout: fixed;
        max-width: 100%;
        border-spacing: 0 6px;
    }

    .dsb_calendar-weekdays {
        color: var(--color-text-disabled);
        cursor: default;
    }

    .dsb_calendar-weekday {
        width: 28px;
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height: 16px;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        letter-spacing: 0.2px;
        padding: 0;
    }

    .dsb_calendar-weeks {
        color: var(--color-text-active);
    }

    .dsb_calendar-day {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 100%;
        border-radius: 10px;
        cursor: default;
        margin: 0 auto;
    }

    .dsb_calendar-day:not(.readonly):not(.dsb_calendar-day__empty):hover {
        background-color: var(--color-background-base-hover);
        cursor: pointer;
    }

    .dsb_calendar-day__empty:hover {
        background-color: inherit;
        cursor: default;
    }

    .dsb_calendar-day.today {
        border: 1px solid var(--color-border-focus);
    }

    .dsb_calendar-day.selected:not(.disabled) {
        background-color: #fdd835;
    }

    .dsb_calendar-day.selected:not(.disabled):hover {
        background-color: #fdc435;
    }

    .dsb_calendar-day.disabled {
        color: var(--color-text-disabled);
        pointer-events: none;
        text-decoration: line-through;
    }

    .dsb_calendar-day.disabled:hover {
        background-color: inherit;
        color: inherit;
        cursor: default;
    }

    .dsb_calendar-day.adjacent-month {
        color: var(--color-text-disabled);
        pointer-events: none;
    }

    .dsb_calendar-day.holiday {
        color: #ff9193;
    }

    .dsb_calendar-day-cell {
        width: 28px;
        font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 15px;
        line-height: 18px;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        letter-spacing: 0.2px;
        padding: 0;
        height: 28px;
    }

    .dsb_calendar-day-cell:nth-last-child(-n + 2) {
        color: var(--color-text-active);
    }

    [data-allow-adjacent-selection='true'] .dsb_calendar-day.adjacent-month {
        pointer-events: auto;
        cursor: pointer;
    }

    .dsb_calendar-months {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        gap: 24px 12px;
        min-height: 196px;
    }

    .dsb_calendar-month {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 36px;
        border-radius: 12px;
        font-weight: 400;
    }

    .dsb_calendar-month:hover {
        background-color: rgba(0, 0, 0, 0.08);
        cursor: pointer;
    }

    .dsb_calendar-month.selected {
        border-radius: 12px;
        background-color: rgb(253, 216, 53);
    }

    .dsb_calendar-month.disabled {
        color: rgba(0, 0, 0, 0.38);
        text-decoration: line-through;
        pointer-events: none;
    }

    .dsb_calendar-month.disabled:hover {
        background-color: inherit;
        color: inherit;
        cursor: default;
    }

    .dsb_calendar-years {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        gap: 24px 12px;
        scrollbar-width: none;
        max-height: 208px;
        min-height: 196px;
    }

    .dsb_calendar-years::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .year {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 36px;
        border-radius: 12px;
        font-weight: 400;
    }

    .year:hover {
        background-color: rgba(0, 0, 0, 0.08);
        cursor: pointer;
    }

    .year.selected {
        border-radius: 12px;
        background-color: rgb(253, 216, 53);
    }

    .dsb_calendar_icon {
        user-select: none;
    }

    .dsb_calendar_icon:hover {
        cursor: pointer;
    }

    .dsb_calendar_icon.disabled {
        color: var(--color-text-disabled);
        cursor: default;
    }
`;
