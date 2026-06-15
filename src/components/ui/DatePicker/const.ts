export const DEFAULT_DATA_TEST_ID = 'DatePicker';

export const DEFAULT_APPLICATION_ROOT_ELEMENT_ID = 'root';

export const DROPDOWN_ELEMENT_ID = 'dsb__datepicker-positioner';

export const DROPDOWN_VERTICAL_OFFSET = 1;

export const DROPDOWN_VIEWPORT_PADDING = 8;

export const DROPDOWN_MAX_HEIGHT = 568;

export const CALENDAR_WIDTH = 256;

export const CALENDAR_RANGE_WIDTH = 512;

export const RANGE_DELIMETER_SYMBOL = '–';

export const PANELS = {
    DAYS: 'days',
    MONTHS: 'months',
    YEARS: 'years',
} as const;

export type CalendarPanel = typeof PANELS[keyof typeof PANELS];

export const MONTHS_NAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
] as const;

export const MONTHS_ABBRS = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сент',
    'Окт',
    'Нояб',
    'Дек',
] as const;

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

export const EMPTY_DATE = '';

export const DATE_LENGTH = 8;

export const RANGE_DELIMETER = ' – ';

export const ISO_FORMAT_PATTERN = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}.*)$/;

export const DEFAULT_MIN_YEAR = 1930;

export const DEFAULT_MAX_YEAR_OFFSET = 10;
