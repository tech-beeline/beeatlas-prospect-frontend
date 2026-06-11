import React, { type ReactElement, type ReactNode, type RefObject, isValidElement } from 'react';

import type { Option } from '../Select/types';

import * as S from './units';
import { classNames, defaultMakeOption, getLoadingContent, getNoOptionsContent } from './utils';

export interface AutocompleteDropDownContentProps<T> {
    options: Array<Option<T>>;
    inputValue: string;
    value: Option<T> | null;
    loading?: boolean;
    loadingText?: ReactNode;
    loadingContent?: ReactNode;
    noOptionsText?: ReactNode;
    noOptionsContents?: ReactNode;
    makeOption?: (option: Option<T>, inputValue: string) => ReactElement | null;
    showTooltip?: boolean;
    focusedIndex: number;
    onSelectItem: (item: Option<T>) => () => void;
    optionsRef: RefObject<HTMLDivElement | null>;
    dataTestId?: string;
}

export const AutocompleteDropDownContent = <T,>({
    options,
    inputValue,
    value,
    loading,
    loadingText,
    loadingContent,
    noOptionsText,
    noOptionsContents,
    makeOption,
    showTooltip,
    focusedIndex,
    onSelectItem,
    optionsRef,
    dataTestId = 'Autocomplete',
}: AutocompleteDropDownContentProps<T>) => {
    const makeItem = (item: Option<T>, currentInputValue: string, index: number) => {
        const customComponent = makeOption
            ? makeOption(item, currentInputValue)
            : defaultMakeOption(item, currentInputValue, showTooltip);

        if (!customComponent) {
            return null;
        }

        const isSelected = value?.id === item.id;

        return (
            <S.OptionItem
                key={item.id.toString()}
                data-index={item.id}
                data-testid={`${dataTestId}-option-${item.id}`}
                className={classNames(
                    'dsb__autocomplete__options__item',
                    focusedIndex === index && 'focused',
                    isSelected && 'selected',
                )}
                onClick={onSelectItem(item)}
            >
                {customComponent}
            </S.OptionItem>
        );
    };

    const renderContent = () => {
        if (loading) {
            const loadingNode = getLoadingContent(loadingContent, loadingText);

            if (isValidElement(loadingNode)) {
                return (
                    <S.OptionItem className="dsb__autocomplete__options__item">
                        {loadingNode}
                    </S.OptionItem>
                );
            }

            return (
                <S.OptionItem className="dsb__autocomplete__options__item dsb__autocomplete__options__item--empty">
                    {loadingNode}
                </S.OptionItem>
            );
        }

        const optionItems = options
            .map((item, index) => makeItem(item, inputValue, index))
            .filter((component) => component !== null);

        if (optionItems.length > 0) {
            return optionItems;
        }

        return (
            <S.OptionItem className="dsb__autocomplete__options__item dsb__autocomplete__options__item--empty">
                {getNoOptionsContent(noOptionsContents, noOptionsText)}
            </S.OptionItem>
        );
    };

    return (
        <S.OptionsList
            className="dsb__autocomplete__dropdown-content dsb__autocomplete__options"
            ref={optionsRef as React.Ref<HTMLDivElement>}
            role="listbox"
            id={`${dataTestId}-listbox`}
        >
            {renderContent()}
        </S.OptionsList>
    );
};
