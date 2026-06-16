import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { IconButton } from 'components/ui';
import { Divider } from 'components/ui/Divider';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { DEFAULT_DATA_TEST_ID, DEFAULT_SEARCH_SIZE, SEARCH_ICON_SIZE } from './const';
import { ControlledSearch } from './ControlledSearch';
import { SearchDropdown } from './SearchDropdown';
import type { SearchProps } from './types';
import * as S from './units';
import {
    getCloseButtonRight,
    getInputClassName,
    getInputPaddingRight,
    getWrapperClassName,
} from './utils';

export const Search = forwardRef<HTMLInputElement, SearchProps>(
    (
        {
            fullWidth,
            size = DEFAULT_SEARCH_SIZE,
            className,
            inputClassName,
            value,
            onSearch,
            onChange,
            onKeyUp,
            onClear,
            filterItems,
            selectedFilter,
            onFilterChange,
            dataTestId = DEFAULT_DATA_TEST_ID,
            disabled,
            ...props
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const rootRef = useRef<HTMLSpanElement>(null);
        const categoriesRef = useRef<HTMLDivElement>(null);
        const [isOpen, setOpen] = useState(false);
        const [categoriesWidth, setCategoriesWidth] = useState(0);

        useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        useEffect(() => {
            setCategoriesWidth(categoriesRef.current?.clientWidth ?? 0);
        }, [selectedFilter, filterItems]);

        const handleSearch = () => {
            onSearch?.(value);
        };

        const handleClear = () => {
            onSearch?.('');
            onClear?.();
            inputRef.current?.focus();
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
        };

        const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                handleSearch();
            }

            onKeyUp?.(event);
        };

        const dataTestInputId = `${dataTestId}-input`;
        const dataTestIconId = `${dataTestId}-butClose`;

        const inputProps = {
            onKeyUp: handleKeyUp,
            onChange: handleChange,
            className: getInputClassName({ size, inputClassName }),
            autoComplete: 'off' as const,
            type: 'search' as const,
            disabled,
            style: {
                paddingRight: getInputPaddingRight(categoriesWidth),
            },
            ...props,
        };

        const iconButtonProps = {
            iconName: Icons.Close,
            className: 'dsb_search-close-button',
            style: { right: `${getCloseButtonRight(categoriesWidth)}px` },
            size: SEARCH_ICON_SIZE[size],
            onClick: handleClear,
            disabled,
        };

        const renderCategories = () => {
            if (!filterItems) {
                return null;
            }

            const classNameLabel = !selectedFilter?.value
                ? 'dsb_search_categories_label-placeholder'
                : undefined;

            return (
                <div
                    role="search"
                    tabIndex={0}
                    className="dsb_search_categories"
                    ref={categoriesRef}
                    onClick={() => setOpen(true)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setOpen(true);
                        }
                    }}
                    data-testid={`${dataTestId}-categories`}
                >
                    <Divider className="dsb_search_categories_vertical-divider" />
                    <span className={classNameLabel} data-testid={`${dataTestId}-selectedFilter`}>
                        {selectedFilter?.value || 'Категории'}
                    </span>
                    <IconButton
                        dataTestId={`${dataTestId}-arrowBut`}
                        size={size}
                        iconName={isOpen ? Icons.NavArrowUp : Icons.NavArrowDown}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpen((prev) => !prev);
                        }}
                        disabled={disabled}
                    />
                    <SearchDropdown
                        options={filterItems}
                        parentRef={rootRef}
                        values={selectedFilter ? [selectedFilter] : []}
                        onChange={([nextFilter]) => {
                            onFilterChange?.(nextFilter ?? null);
                            setOpen(false);
                        }}
                        makeOption={(item) => <span>{item.value}</span>}
                        onOutsideClick={() => {
                            setOpen(false);
                            onClear?.();
                        }}
                        isOpen={isOpen}
                        handleSetOpen={setOpen}
                        dataTestId={`${dataTestId}-dropdown`}
                    />
                </div>
            );
        };

        return (
            <S.SearchWrapper
                data-testid={dataTestId}
                className={getWrapperClassName({ fullWidth, className })}
                ref={rootRef}
            >
                <IconButton
                    iconName={Icons.Search}
                    className="dsb_search-button"
                    size={SEARCH_ICON_SIZE[size]}
                    onClick={handleSearch}
                    dataTestId={`${dataTestId}-butSearch`}
                    disabled={disabled}
                />

                {value === undefined ? (
                    <ControlledSearch
                        inputRef={inputRef}
                        dataTestId={dataTestInputId}
                        dataTestIconId={dataTestIconId}
                        iconButton={iconButtonProps}
                        {...inputProps}
                    />
                ) : (
                    <>
                        <input
                            ref={inputRef}
                            value={value}
                            data-testid={dataTestInputId}
                            {...inputProps}
                        />
                        {Boolean(value) && (
                            <IconButton {...iconButtonProps} dataTestId={dataTestIconId} />
                        )}
                    </>
                )}

                {renderCategories()}
            </S.SearchWrapper>
        );
    },
);

Search.displayName = 'Search';
