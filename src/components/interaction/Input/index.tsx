import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import * as T from './types';
import * as S from './units';

export const Input = forwardRef<HTMLInputElement, T.IInput>((props, ref) => {
    const inputElementRef = (ref as RefObject<HTMLInputElement>) || useRef<HTMLInputElement>(null);

    const [isFocused, setFocused] = useState(false);
    // Только при блюре в отличии от props.isValid
    const [isValidOnBlur, setValidOnBlur] = useState(true);

    useEffect(() => {
        setFocused(props.isFocused || false);
    }, [props.isFocused]);

    useEffect(() => {
        props.setValid && props.setValid(isValidPhoneNumber(inputElementRef.current!.value));
    }, [inputElementRef.current?.value]);

    const handleChange = () => {
        props.onChange &&
            inputElementRef.current &&
            props.onChange(inputElementRef.current.value, inputElementRef.current.name);
    };

    const onBlur = () => {
        props.onBlur ? props.onBlur() : setFocused(false);

        inputElementRef.current?.value &&
            setValidOnBlur(isValidPhoneNumber(inputElementRef.current.value));

        // console.log(isValidPhoneNumber(inputElementRef.current!.value));
    };

    const onFocus = () => {
        props.onFocus ? props.onFocus() : setFocused(true);

        props.type === 'phone' &&
            inputElementRef.current &&
            !inputElementRef.current.value &&
            props.onChange('+7', inputElementRef.current.name);

        setValidOnBlur(true);
    };

    return (
        <S.InputWrapper className={props.className} {...{ isFocused }}>
            {props.label && <S.Label>{props.label}</S.Label>}

            {props.type === 'phone' ? (
                // @ts-ignore
                <S.InputPhoneStyled
                    {...props}
                    isValid={isValidOnBlur}
                    onChange={handleChange}
                    onClick={props.onClick}
                    ref={inputElementRef}
                    {...{ isFocused, onBlur, onFocus }}
                />
            ) : (
                <S.InputStyled
                    {...props}
                    onChange={handleChange}
                    onClick={props.onClick}
                    ref={inputElementRef}
                    {...{ isFocused, onBlur, onFocus }}
                />
            )}
        </S.InputWrapper>
    );
});
