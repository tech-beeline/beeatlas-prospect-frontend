import styled from '@emotion/styled';

import { DropdownPortal as DatePickerDropdownPortal } from '../DatePicker/units';

export const DatePickerRangeRoot = styled.div`
    position: relative;
    width: fit-content;

    &.dsb_datepicker__full-width {
        width: 100%;
    }
`;

export const DropdownPortal = styled(DatePickerDropdownPortal)`
    .dsb_calendar.dsb_calendar-range {
        width: 512px;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-panels {
        padding: 0;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-panels .dsb_calendar-panel {
        width: 256px;
        padding: 16px;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-panels .dsb_calendar-header {
        justify-content: start;
        gap: 37px;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-panels .dsb_calendar-header__right {
        justify-content: flex-end;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-footer {
        display: flex;
        justify-content: flex-end;
        padding: 12px 16px 16px 16px;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-footer > button {
        width: 103px;
    }

    .dsb_calendar.dsb_calendar-range .dsb_calendar-divider {
        width: 1px;
        background-color: var(--color-divider);
    }

    .dsb_calendar-day-cell.starting {
        background-color: var(--color-accent-lemon-background);
        border-radius: 10px 0 0 10px;
    }

    .dsb_calendar-day-cell.starting .dsb_calendar-day {
        background-color: rgb(253, 216, 53);
        border-radius: 10px;
    }

    .dsb_calendar-day-cell.ranging {
        background-color: var(--color-accent-lemon-background);
    }

    .dsb_calendar-day-cell.ending {
        background: var(--color-accent-lemon-background);
        border-radius: 0 10px 10px 0;
    }

    .dsb_calendar-day-cell.ending .dsb_calendar-day {
        background-color: rgb(253, 216, 53);
        border-radius: 10px;
    }
`;
