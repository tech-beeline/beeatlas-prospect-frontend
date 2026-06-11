import { useCallback, useEffect, useRef, useState } from 'react';

import type { RangeDateValue } from '../DatePicker/types';
import { formatValue, getInputValue, isFilledDate, ISO_FORMAT_PATTERN } from '../DatePicker/utils';

import type { UseDatePickerRangeProps } from './types';

export const useDatePickerRange = ({
    value,
    onChange,
    onOpen,
    onClose,
    onFocus,
    onSaveClick,
    enableTimePicker,
    timeZone,
    datepickerRef: _datepickerRef,
    dropdownClassName: _dropdownClassName,
    onBlur,
}: UseDatePickerRangeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isInternalChangeRef = useRef(false);
    const [inputValue, setInputValue] = useState(() =>
        String(formatValue(value, enableTimePicker, timeZone)),
    );

    useEffect(() => {
        const newInputValue = String(formatValue(value, enableTimePicker, timeZone));

        if (isInternalChangeRef.current) {
            isInternalChangeRef.current = false;
            return;
        }

        setInputValue((prevInputValue) =>
            prevInputValue === newInputValue ? prevInputValue : newInputValue,
        );
    }, [value, enableTimePicker, timeZone]);

    const open = useCallback(() => {
        setIsOpen(true);
        onOpen?.();
    }, [onOpen]);

    const close = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const selectDate = useCallback(
        (date: RangeDateValue) => {
            onChange?.(date);

            const updatedInputValue = String(getInputValue(date, enableTimePicker, timeZone));

            setInputValue(updatedInputValue);

            const isFilledValue = isFilledDate(date, {
                pattern: ISO_FORMAT_PATTERN,
            });

            if (isFilledValue && !onSaveClick && !enableTimePicker) {
                close();
            }
        },
        [close, enableTimePicker, onChange, onSaveClick, timeZone],
    );

    const handleChange = (nextValue: RangeDateValue) => {
        isInternalChangeRef.current = true;
        onChange?.(nextValue);
    };

    const handleInputFocus: UseDatePickerRangeProps['onFocus'] = (event) => {
        if (!isOpen) {
            open();
        }

        onFocus?.(event);
    };

    const handleInputBlur: UseDatePickerRangeProps['onBlur'] = (event) => {
        onBlur?.(event);
    };

    return {
        isOpen,
        inputValue,
        open,
        close,
        selectDate,
        setInputValue,
        handleChange,
        handleInputFocus,
        handleInputBlur,
    };
};

export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};
