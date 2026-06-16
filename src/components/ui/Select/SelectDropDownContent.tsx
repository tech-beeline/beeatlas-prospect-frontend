import React, { type ReactElement, Fragment } from 'react';

import { Checkbox } from 'components/ui/Checkbox';
import { Divider } from 'components/ui/Divider';
import { Search } from 'components/ui/Search';

import { SELECT_ALL_INDEX } from './const';
import type { PrivateOption, SelectDropDownContentProps } from './types';
import { CheckboxType } from './types';
import * as S from './units';
import { classNames, defaultMakeOption, getLoadingContent, getPreparedOptions } from './utils';

const SelectOptionItem = <T,>({
    optionId,
    option,
    isSelected,
    multiple,
    selectAll,
    onMultiselectItem,
    onManualClickOption,
    onSelectItem,
    focusedIndex,
    optionIndex,
    handleSelectAll,
    makeOption,
    showTooltip,
    makeOptionWrapper,
    dataTestId,
}: {
    optionId: string;
    option: PrivateOption<T>;
    isSelected: CheckboxType;
    multiple?: boolean;
    selectAll?: boolean;
    onMultiselectItem: (item: PrivateOption<T>) => () => void;
    onManualClickOption?: (value: T) => void;
    onSelectItem: (item: PrivateOption<T>) => () => void;
    focusedIndex: number;
    optionIndex: number;
    handleSelectAll: () => void;
    makeOption?: (option: T, selected?: boolean) => ReactElement;
    showTooltip?: boolean;
    makeOptionWrapper?: SelectDropDownContentProps<T>['makeOptionWrapper'];
    dataTestId?: string;
}) => {
    const isDisabled = option.disabled;
    const finalClassName = classNames(
        'dsb__select__options__item',
        isSelected === CheckboxType.CHECKED && 'selected',
        isDisabled && 'disabled',
        focusedIndex === optionIndex && 'focused',
    );

    const onClickHandler = multiple ? onMultiselectItem : onSelectItem;
    const onChangeAction =
        typeof onManualClickOption === 'function'
            ? () => onManualClickOption(option.value)
            : onClickHandler(option);

    const content = (
        <>
            {multiple && (
                <Checkbox
                    checked={isSelected !== CheckboxType.UNCHECKED}
                    type={isSelected === CheckboxType.PARTIALLY ? 'indeterminate' : 'checkbox'}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => event.stopPropagation()}
                    className="dsb__select__options__item__checkbox"
                    disabled={isDisabled}
                />
            )}
            {selectAll ? (
                <span>{String(option.value)}</span>
            ) : makeOption ? (
                makeOption(option.value, isSelected === CheckboxType.CHECKED)
            ) : (
                defaultMakeOption(option.value, showTooltip)
            )}
        </>
    );

    const wrapperProps = {
        id: optionId,
        role: 'option' as const,
        tabIndex: -1,
        'aria-selected': isSelected === CheckboxType.CHECKED,
        'aria-disabled': isDisabled,
        className: finalClassName,
        onClick: isDisabled ? undefined : selectAll ? handleSelectAll : onChangeAction,
        ...(selectAll ? { 'data-testid': 'select-all' } : {}),
        children: content,
    };

    if (makeOptionWrapper) {
        return makeOptionWrapper(option.value, isSelected === CheckboxType.CHECKED, {
            key: option.id,
            className: finalClassName,
            onClick: isDisabled ? () => undefined : selectAll ? handleSelectAll : onChangeAction,
            children: content,
        });
    }

    return (
        <S.OptionItem
            key={option.id}
            {...wrapperProps}
            data-testid={`${dataTestId}-option-${option.id}`}
        />
    );
};

export const SelectDropDownContent = <T,>({
    selectedItems,
    optionsData,
    selectAll,
    filter,
    filterValue,
    filterFunction,
    filterPlaceholder,
    filterRef,
    changeFilterValue,
    multiple,
    onMultiselectItem,
    onManualClickOption,
    onSelectItem,
    focusedIndex,
    handleSelectAll,
    makeOption,
    showTooltip,
    selectAllText,
    loading,
    loadingText,
    loadingContent,
    noOptionsText,
    optionsRef,
    selectStatus,
    makeOptionWrapper,
    groups = [],
    dataTestId = 'Select',
    selectRef,
}: SelectDropDownContentProps<T>) => {
    const options = getPreparedOptions(optionsData, filter, filterValue, filterFunction);
    let globalOptionIndex = 0;

    const selectAllOption = selectAll ? (
        <SelectOptionItem
            key={SELECT_ALL_INDEX}
            optionId={`${dataTestId}-option-select-all`}
            option={{ id: SELECT_ALL_INDEX, value: selectAllText as unknown as T }}
            isSelected={selectStatus}
            multiple={multiple}
            selectAll
            onMultiselectItem={onMultiselectItem}
            onManualClickOption={onManualClickOption}
            onSelectItem={onSelectItem}
            focusedIndex={focusedIndex}
            optionIndex={-1}
            handleSelectAll={handleSelectAll}
            makeOption={makeOption}
            showTooltip={showTooltip}
            makeOptionWrapper={makeOptionWrapper}
            dataTestId={dataTestId}
        />
    ) : null;

    const renderOptions = () => {
        if (loading) {
            return getLoadingContent(loadingContent, loadingText);
        }

        if (options.length === 0) {
            return (
                <S.OptionItem className={classNames('dsb__select__options__item', 'empty')}>
                    <span>{noOptionsText}</span>
                </S.OptionItem>
            );
        }

        if (groups.length > 0) {
            return groups.flatMap((group) => {
                const groupOptions = options.filter(
                    (option) =>
                        (option.value as { groupID?: string | number })?.groupID === group.id,
                );

                if (groupOptions.length === 0) {
                    return [];
                }

                return [
                    <S.GroupTitle key={`group-title-${group.id}`}>
                        {String(group.value)}
                    </S.GroupTitle>,
                    ...groupOptions.map((item) => {
                        const rendered = (
                            <SelectOptionItem
                                key={item.id}
                                optionId={`${dataTestId}-option-${item.id}`}
                                option={item}
                                isSelected={
                                    selectedItems.some((selected) => selected.id === item.id)
                                        ? CheckboxType.CHECKED
                                        : CheckboxType.UNCHECKED
                                }
                                multiple={multiple}
                                onMultiselectItem={onMultiselectItem}
                                onManualClickOption={onManualClickOption}
                                onSelectItem={onSelectItem}
                                focusedIndex={focusedIndex}
                                optionIndex={globalOptionIndex}
                                handleSelectAll={handleSelectAll}
                                makeOption={makeOption}
                                showTooltip={showTooltip}
                                makeOptionWrapper={makeOptionWrapper}
                                dataTestId={dataTestId}
                            />
                        );

                        globalOptionIndex += 1;

                        return rendered;
                    }),
                ];
            });
        }

        return options.map((item, index) => (
            <SelectOptionItem
                key={item.id}
                optionId={`${dataTestId}-option-${item.id}`}
                option={item}
                isSelected={
                    selectedItems.some((selected) => selected.id === item.id)
                        ? CheckboxType.CHECKED
                        : CheckboxType.UNCHECKED
                }
                multiple={multiple}
                onMultiselectItem={onMultiselectItem}
                onManualClickOption={onManualClickOption}
                onSelectItem={onSelectItem}
                focusedIndex={focusedIndex}
                optionIndex={index}
                handleSelectAll={handleSelectAll}
                makeOption={makeOption}
                showTooltip={showTooltip}
                makeOptionWrapper={makeOptionWrapper}
                dataTestId={dataTestId}
            />
        ));
    };

    return (
        <S.DropdownContent
            className="dsb__select__dropdown-content"
            data-testid={`${dataTestId}-dropdown-content`}
            ref={selectRef as React.Ref<HTMLDivElement>}
        >
            {filter && (
                <>
                    <S.FilterContainer className="dsb__select__options__filter">
                        <Search
                            size="small"
                            placeholder={filterPlaceholder}
                            fullWidth
                            ref={filterRef as React.Ref<HTMLInputElement>}
                            value={filterValue}
                            onSearch={(value) => changeFilterValue(String(value ?? ''))}
                            onChange={(event) => changeFilterValue(event.target.value)}
                            dataTestId={`${dataTestId}-search`}
                        />
                    </S.FilterContainer>
                    <Divider />
                </>
            )}

            <S.OptionsList
                className="dsb__select__options"
                ref={optionsRef as React.Ref<HTMLDivElement>}
                role="listbox"
                aria-multiselectable={multiple ? 'true' : undefined}
                id={`${dataTestId}-listbox`}
            >
                <Fragment key="select-content">
                    {selectAllOption}
                    {renderOptions()}
                </Fragment>
            </S.OptionsList>
        </S.DropdownContent>
    );
};
