import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import { DEFAULT_DATA_TEST_ID, MAX_HEIGHT } from './const';
import type { MessageFieldProps } from './types';
import * as S from './units';

const classNames = (...values: Array<string | false | undefined>) =>
    values.filter(Boolean).join(' ');

export const MessageField = forwardRef<HTMLTextAreaElement, MessageFieldProps>(
    (
        {
            className,
            fullWidth = false,
            disabled = false,
            dataTestId = DEFAULT_DATA_TEST_ID,
            onInput,
            value,
            ...props
        },
        ref,
    ) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

        const adjustHeight = useCallback(() => {
            const textarea = textareaRef.current;

            if (!textarea) {
                return;
            }

            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;
        }, []);

        useEffect(() => {
            adjustHeight();
        }, [value, adjustHeight]);

        const handleInput: MessageFieldProps['onInput'] = (event) => {
            onInput?.(event);
            adjustHeight();
        };

        return (
            <S.MessageFieldWrapper
                data-testid={dataTestId}
                className={classNames(
                    'dsb_message-field-wrapper',
                    fullWidth && 'dsb_message-field-wrapper--fullwidth',
                    disabled && 'dsb_message-field-wrapper--disabled',
                    className,
                )}
            >
                <S.MessageFieldTextarea
                    ref={textareaRef}
                    data-testid={`${dataTestId}-textarea`}
                    disabled={disabled}
                    rows={1}
                    value={value}
                    onInput={handleInput}
                    {...props}
                />
                <S.MessageFieldBorders />
            </S.MessageFieldWrapper>
        );
    },
);

MessageField.displayName = 'MessageField';
