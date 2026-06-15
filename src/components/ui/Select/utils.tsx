import React, { isValidElement } from 'react';

import type { TextFieldSizeVariantsType } from '../TextField/types';

import { DROPDOWN_MAX_HEIGHT, DROPDOWN_VERTICAL_OFFSET, DROPDOWN_VIEWPORT_PADDING } from './const';
import { type Option, type PrivateOption, CheckboxType } from './types';

type ClassValue = string | false | null | undefined | 0;

export const classNames = (...values: ClassValue[]) => values.filter(Boolean).join(' ');

export const shallowEqual = (a: unknown, b: unknown): boolean => {
    if (Object.is(a, b)) {
        return true;
    }

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every(
        (key) =>
            Object.prototype.hasOwnProperty.call(b, key) &&
            (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key],
    );
};

export const compareValues = <T,>(
    a: T,
    b: T,
    compareBy?: string | ((left: T, right: T) => boolean),
): boolean => {
    if (typeof compareBy === 'function') {
        return compareBy(a, b);
    }

    if (typeof compareBy === 'string') {
        return (
            (a as Record<string, unknown>)[compareBy] === (b as Record<string, unknown>)[compareBy]
        );
    }

    return shallowEqual(a, b);
};

export const addArrayIndex = <T,>(options: T[] = [], values: T[] = []) => {
    const privateOptions: PrivateOption<T>[] = options.map((option, index) => ({
        id: index,
        value: option,
        disabled: (option as unknown as Option<T>)?.disabled,
    }));

    const privateValues: PrivateOption<T>[] = values.map((value) => {
        const id = privateOptions.find((option) => shallowEqual(option.value, value))?.id;

        return {
            id: id ?? -1,
            value,
        };
    });

    return { privateOptions, privateValues };
};

export const getPreparedOptions = <T,>(
    options: PrivateOption<T>[],
    filter?: boolean,
    filterValue?: string,
    filterFunction?: (items: PrivateOption<T>[], query: string) => PrivateOption<T>[],
): PrivateOption<T>[] => {
    if (filter && filterValue && filterFunction) {
        return filterFunction(options, filterValue);
    }

    if (filter && filterValue) {
        return options.filter((option) => {
            const currentStringValue =
                (option.value as unknown as Option<unknown>)?.value ?? String(option.value);

            return String(currentStringValue).toLowerCase().includes(filterValue.toLowerCase());
        });
    }

    return options;
};

export const getOptionsInDisplayOrder = <T,>(
    options: PrivateOption<T>[],
    groups?: Array<Option<string>>,
) => {
    if (!groups || groups.length === 0) {
        return options;
    }

    return groups.flatMap((group) =>
        options.filter(
            (option) => (option.value as { groupID?: string | number })?.groupID === group.id,
        ),
    );
};

export const defaultRenderValue = <T,>(values: T[]) =>
    values?.map((value) => (value as unknown as Option<unknown>)?.value ?? value).join(', ');

export const defaultMakeOption = <T,>(option: T, showTooltip?: boolean) => {
    const value = (option as unknown as Option<unknown>)?.value ?? String(option);

    return (
        <span title={showTooltip ? String(value) : undefined} className="dsb__select__option-text">
            {String(value)}
        </span>
    );
};

export const getLoadingContent = (
    loadingContent?: string | React.ReactNode,
    loadingText?: string | React.ReactNode,
) => {
    if (isValidElement(loadingContent)) {
        return loadingContent;
    }

    return (
        <span className="dsb__select__loading" style={{ padding: '4px 16px 2px 16px' }}>
            {loadingContent || loadingText || 'Загрузка...'}
        </span>
    );
};

export const getCheckboxStatus = <T,>(
    options: PrivateOption<T>[],
    selectedValues: PrivateOption<T>[],
    filterValue: string,
    filter?: boolean,
    filterFunction?: (items: PrivateOption<T>[], query: string) => PrivateOption<T>[],
    compareBy?: string | ((a: T, b: T) => boolean),
): CheckboxType => {
    const filteredOptions = getPreparedOptions(options, filter, filterValue, filterFunction);
    const enabledFilteredOptions = filteredOptions.filter((option) => !option.disabled);
    const selectedFilteredValues = selectedValues.filter((value) =>
        enabledFilteredOptions.some((option) =>
            compareValues(option.value, value.value, compareBy),
        ),
    );

    if (enabledFilteredOptions.length === 0) {
        return CheckboxType.UNCHECKED;
    }

    if (selectedFilteredValues.length === enabledFilteredOptions.length) {
        return CheckboxType.CHECKED;
    }

    if (selectedFilteredValues.length === 0) {
        return CheckboxType.UNCHECKED;
    }

    return CheckboxType.PARTIALLY;
};

export const getValueText = (value: unknown) => {
    if (value === null || value === undefined) {
        return '';
    }

    if (typeof value === 'object') {
        const option = value as Record<string, unknown>;
        const resolvedValue = option.value ?? option.label ?? option.name ?? value;

        return resolvedValue === null || resolvedValue === undefined ? '' : String(resolvedValue);
    }

    return String(value);
};

export const createHiddenValueNodes = <T,>(values: T[]) => {
    const lastIndex = values.length - 1;

    return values.map((value, index) => {
        const text = getValueText(value);

        return index === lastIndex ? text : `${text}, `;
    });
};

export const throttle = <T extends unknown[]>(callback: (...args: T) => void, delay = 100) => {
    let shouldWait = false;
    let waitingArgs: T | null = null;

    const timeoutFunc = () => {
        if (waitingArgs === null) {
            shouldWait = false;
        } else {
            callback(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };

    return (...args: T) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        callback(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
    };
};

export const countOverflowNodes = ({
    parentRight,
    nodes,
}: {
    parentRight: number;
    nodes: NodeListOf<ChildNode>;
}) => {
    let count = 0;
    let isFirstNodeOverflowed = false;

    nodes.forEach((childNode, index) => {
        const child = childNode as HTMLElement;
        const { left, right } = child.getBoundingClientRect();
        const isOverflowed = right - (right - left) / 10 > parentRight;

        if (isOverflowed) {
            if (index === 0) {
                isFirstNodeOverflowed = true;
            }

            count += 1;
        }
    });

    return isFirstNodeOverflowed ? Math.max(0, count - 1) : count;
};

export const getSelectIconSize = (size?: TextFieldSizeVariantsType) => size ?? 'medium';

export const buildSelectClassName = (className?: string) => classNames('dsb__select', className);

export type DropdownPlacement = 'top' | 'bottom';

export interface DropdownPosition {
    top: number;
    left: number;
    width: number;
    maxHeight: number;
    placement: DropdownPlacement;
}

export const calculateDropdownPosition = ({
    parentRect,
    dropdownHeight,
}: {
    parentRect: DOMRect;
    dropdownHeight: number;
}): DropdownPosition => {
    const spaceBelow = window.innerHeight - parentRect.bottom - DROPDOWN_VIEWPORT_PADDING;
    const spaceAbove = parentRect.top - DROPDOWN_VIEWPORT_PADDING;

    const overflowsBottom =
        dropdownHeight > 0 &&
        parentRect.bottom + dropdownHeight + DROPDOWN_VERTICAL_OFFSET >
            window.innerHeight - DROPDOWN_VIEWPORT_PADDING;

    const openUpward = overflowsBottom && spaceAbove > spaceBelow;
    const availableSpace = openUpward ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(0, Math.min(DROPDOWN_MAX_HEIGHT, availableSpace));
    const resolvedHeight = dropdownHeight > 0 ? Math.min(dropdownHeight, maxHeight) : maxHeight;

    const top = openUpward
        ? parentRect.top + window.scrollY - resolvedHeight - DROPDOWN_VERTICAL_OFFSET
        : parentRect.bottom + window.scrollY + DROPDOWN_VERTICAL_OFFSET;

    return {
        top,
        left: parentRect.left + window.scrollX,
        width: parentRect.width,
        maxHeight,
        placement: openUpward ? 'top' : 'bottom',
    };
};
