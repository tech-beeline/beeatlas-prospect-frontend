import React, { createElement } from 'react';

import { Button } from '../Button';

import { ButtonGroupOption, ButtonGroupProps } from './types';
import * as S from './units';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    selectedOption,
    onChange,
    options,
    className = '',
    activeClassName = 'active',
    disabledAll = false,
    size = 'medium',
    fullWidth = false,
    type = 'primary',
    customButtonWidth,
    dataTestId = 'ButtonGroup',
}) => {
    const handleChange = (option: ButtonGroupOption) => {
        const isSelected = option.id === selectedOption?.id;

        if (isSelected) {
            return;
        }

        onChange(option);
    };

    return (
        <S.Root
            className={['dsb_button-group', type, className].filter(Boolean).join(' ')}
            data-testid={dataTestId}
            $type={type}
        >
            {options?.map((option) => {
                const isSelected = option.id === selectedOption?.id;
                const isDisabled = disabledAll || option.disabled;
                const {
                    wrapper: Wrapper,
                    id,
                    label,
                    value: _value,
                    disabled: _optionDisabled,
                    ...buttonProps
                } = option;
                const buttonClassName = isSelected
                    ? [buttonProps.className, activeClassName].filter(Boolean).join(' ')
                    : buttonProps.className;
                const buttonStyle = customButtonWidth
                    ? { ...buttonProps.style, width: `${customButtonWidth}px` }
                    : buttonProps.style;

                const buttonElement = (
                    <Button
                        {...buttonProps}
                        key={id}
                        variant={isSelected ? 'contained' : 'outlined'}
                        className={buttonClassName}
                        size={size}
                        fullWidth={fullWidth || option.fullWidth}
                        disabled={isDisabled}
                        tabIndex={isDisabled ? -1 : undefined}
                        style={buttonStyle}
                        onClick={() => handleChange(option)}
                    >
                        {label}
                    </Button>
                );

                if (Wrapper) {
                    return createElement(Wrapper, { key: id }, buttonElement);
                }

                return buttonElement;
            })}
        </S.Root>
    );
};
