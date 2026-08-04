import type { SearchProps } from './types';

type ClassValue = string | false | null | undefined | 0;

export const classNames = (...values: ClassValue[]) => values.filter(Boolean).join(' ');

export const getWrapperClassName = ({
    fullWidth,
    className,
}: Pick<SearchProps, 'fullWidth' | 'className'>) =>
    classNames('dsb_search-wrapper', fullWidth && 'dsb_search-wrapper__full', className);

export const getInputClassName = ({
    size,
    inputClassName,
}: Pick<SearchProps, 'size' | 'inputClassName'> & { size: NonNullable<SearchProps['size']> }) =>
    classNames('dsb_search', `dsb_search-size__${size}`, inputClassName);

export const getInputPaddingRight = (categoriesWidth: number) =>
    `${categoriesWidth ? categoriesWidth + 52 : 52}px`;

export const getCloseButtonRight = (categoriesWidth: number) =>
    categoriesWidth ? categoriesWidth + 16 : 16;
