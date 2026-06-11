import { useCallback, useEffect, useRef, useState } from 'react';

import type { DateValue, UseDatePickerProps } from './types';
import { formatValue, getInputValue } from './utils';

const areDateValuesEqual = (first: DateValue | undefined, second: DateValue | undefined) => {
    if (typeof first === 'string' && typeof second === 'string') {
        return first === second;
    }

    if (Array.isArray(first) && Array.isArray(second)) {
        if (first.length !== second.length) {
            return false;
        }

        return first.every((item, index) => item === second[index]);
    }

    return false;
};

export const useDatePicker = ({
    value,
    onChange,
    onOpen,
    onClose,
    onFocus,
    onSaveClick,
    enableTimePicker,
    timeZone,
    datepickerRef,
    mobileView,
    dropdownClassName,
    onBlur,
    overlayScroll = true,
    shouldRenderOverlay,
    overlayClassName,
    alignDropDown,
}: UseDatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isInternalChangeRef = useRef(false);
    const [inputValue, setInputValue] = useState(() =>
        formatValue(value, enableTimePicker, timeZone),
    );

    useEffect(() => {
        const newInputValue = formatValue(value, enableTimePicker, timeZone);

        if (isInternalChangeRef.current) {
            isInternalChangeRef.current = false;
            return;
        }

        setInputValue((prevInputValue) =>
            areDateValuesEqual(prevInputValue as DateValue, newInputValue as DateValue)
                ? prevInputValue
                : newInputValue,
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
        (date: DateValue) => {
            onChange?.(date);

            const updatedInputValue = getInputValue(
                typeof date === 'string' ? date : date,
                enableTimePicker,
                timeZone,
            );

            setInputValue(updatedInputValue);

            if (!onSaveClick && !enableTimePicker) {
                close();
            }
        },
        [close, enableTimePicker, onChange, onSaveClick, timeZone],
    );

    const handleChange = (nextValue: DateValue) => {
        isInternalChangeRef.current = true;
        onChange?.(nextValue);
    };

    const handleInputFocus: UseDatePickerProps['onFocus'] = (event) => {
        if (!isOpen) {
            open();
        }

        onFocus?.(event);
    };

    const handleInputBlur: UseDatePickerProps['onBlur'] = (event) => {
        onBlur?.(event);
    };

    const dropdownMenuProps = {
        targetElement: datepickerRef,
        align: alignDropDown,
        onOutsideClick: mobileView ? undefined : close,
        isOpen,
        handleSetOpen: setIsOpen,
        className: dropdownClassName,
        onBlur: handleInputBlur,
        verticalOffset: 1,
        overlayScroll,
        shouldRenderOverlay,
        overlayClassName,
    };

    return {
        isOpen,
        inputValue,
        open,
        close,
        selectDate,
        setIsOpen,
        setInputValue,
        handleChange,
        handleInputFocus,
        handleInputBlur,
        dropdownMenuProps,
    };
};
