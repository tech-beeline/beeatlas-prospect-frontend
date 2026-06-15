import React, { type ReactNode, isValidElement } from 'react';

import type { Option } from '../Select/types';

import { DEFAULT_LOADING_TEXT, DEFAULT_NO_OPTIONS_TEXT } from './const';

type ClassValue = string | false | null | undefined | 0;

export const classNames = (...values: ClassValue[]) => values.filter(Boolean).join(' ');

export const buildAutocompleteClassName = (className?: string) =>
    classNames('dsb__autocomplete', className);

export const highlightingText = (text: string, highlight: string) => {
    if (!highlight) {
        return <span>{text}</span>;
    }

    const escapedHighlight = highlight.replaceAll(/([!$()*+./:=?[\\\]^{|}])/g, '\\$1');
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

    return (
        <span>
            {parts.map((part, index) => (
                <span
                    key={`${part}-${index}`}
                    style={
                        part.toLowerCase() === highlight.toLowerCase()
                            ? { fontWeight: 'bold' }
                            : undefined
                    }
                >
                    {part}
                </span>
            ))}
        </span>
    );
};

export const defaultMakeOption = <T,>(
    option: Option<T>,
    inputValue: string,
    showTooltip?: boolean,
) => (
    <span
        className="dsb__autocomplete__option-text"
        title={showTooltip ? String(option.value) : undefined}
    >
        {highlightingText(String(option.value), inputValue)}
    </span>
);

export const getLoadingContent = (
    loadingContent?: ReactNode,
    loadingText?: ReactNode,
): ReactNode => {
    const content = loadingContent ?? loadingText ?? DEFAULT_LOADING_TEXT;

    if (isValidElement(content)) {
        return content;
    }

    return <span className="dsb__autocomplete__options__item--empty">{content}</span>;
};

export const getNoOptionsContent = (
    noOptionsContents?: ReactNode,
    noOptionsText?: ReactNode,
): ReactNode => {
    const content = noOptionsContents ?? noOptionsText ?? DEFAULT_NO_OPTIONS_TEXT;

    if (isValidElement(content)) {
        return content;
    }

    return <span>{content}</span>;
};
