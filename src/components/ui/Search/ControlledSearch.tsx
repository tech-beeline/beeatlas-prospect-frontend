import React, { useState } from 'react';

import { IconButton } from 'components/ui';

import type { ControlledSearchProps } from './types';

export const ControlledSearch = ({
    inputRef,
    onChange,
    dataTestId,
    dataTestIconId,
    iconButton,
    ...props
}: ControlledSearchProps) => {
    const [innerValue, setInnerValue] = useState('');
    const { onClick, ...restIconButton } = iconButton;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInnerValue(event.target.value);
        onChange?.(event);
    };

    const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        setInnerValue('');
    };

    return (
        <>
            <input
                ref={inputRef}
                value={innerValue}
                data-testid={dataTestId}
                onChange={handleChange}
                {...props}
            />
            {innerValue && (
                <IconButton
                    {...restIconButton}
                    dataTestId={dataTestIconId}
                    onClick={handleClearClick}
                />
            )}
        </>
    );
};
