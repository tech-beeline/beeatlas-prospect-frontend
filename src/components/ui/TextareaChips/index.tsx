import React, { forwardRef, useId, useRef, useState } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { Chip } from '../Chip';
import { Icon } from '../Icon';

import { TextareaChipsProps } from './types';
import * as S from './units';
import { addTags } from './utils';

export const TextareaChips = forwardRef<HTMLTextAreaElement, TextareaChipsProps>(
    (
        { value, onChange, onBlur, name, label, disabled = false, error = false, helperText },
        ref,
    ) => {
        const id = useId();
        const inputRef = useRef<HTMLTextAreaElement | null>(null);
        const [text, setText] = useState('');

        const commit = () => {
            if (text.trim()) {
                onChange(addTags(value, text));
            }
            setText('');
        };

        return (
            <div>
                <S.Container
                    $error={error}
                    $disabled={disabled}
                    $hasTags={value.length > 0}
                    onMouseDown={(event) => {
                        if (disabled || !(event.target instanceof Element)) return;
                        if (event.target.closest('button') || event.target === inputRef.current) {
                            return;
                        }
                        event.preventDefault();
                        inputRef.current?.focus();
                    }}
                    onClick={(event) => {
                        if (disabled || !(event.target instanceof Element)) return;
                        if (!event.target.closest('button')) {
                            inputRef.current?.focus();
                        }
                    }}
                >
                    <S.Label htmlFor={id} $filled={value.length > 0 || text.length > 0}>
                        {label}
                    </S.Label>
                    <S.Content>
                        {value.map((tag, index) => (
                            <Chip
                                key={`${tag}-${index}`}
                                label={tag}
                                title={tag}
                                disabled={disabled}
                                aria-label={`Удалить тег ${tag}`}
                                onClick={() => onChange(value.filter((_, i) => i !== index))}
                                endAdornment={<Icon iconName={Icons.Cancel} />}
                            />
                        ))}
                        <S.Input
                            $hasTags={value.length > 0}
                            ref={(element) => {
                                inputRef.current = element;
                                if (typeof ref === 'function') {
                                    ref(element);
                                } else if (ref) {
                                    ref.current = element;
                                }
                            }}
                            id={id}
                            name={name}
                            rows={1}
                            value={text}
                            disabled={disabled}
                            aria-invalid={error}
                            aria-describedby={helperText ? `${id}-help` : undefined}
                            onChange={(event) => setText(event.target.value)}
                            onBlur={() => {
                                commit();
                                onBlur?.();
                            }}
                            onKeyDown={(event) => {
                                if (event.nativeEvent.isComposing) return;
                                if (event.key === 'Enter' || event.key === ',') {
                                    event.preventDefault();
                                    commit();
                                }
                                if (event.key === 'Backspace' && !text) {
                                    onChange(value.slice(0, -1));
                                }
                            }}
                            onPaste={(event) => {
                                const pasted = event.clipboardData.getData('text');
                                if (/[,\n]/.test(pasted)) {
                                    event.preventDefault();
                                    onChange(addTags(value, text + pasted));
                                    setText('');
                                }
                            }}
                        />
                    </S.Content>
                </S.Container>
                {helperText && (
                    <S.Helper id={`${id}-help`} $error={error}>
                        {helperText}
                    </S.Helper>
                )}
            </div>
        );
    },
);

TextareaChips.displayName = 'TextareaChips';
