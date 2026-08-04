import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import type { InlineEditProps } from './types';

type UseInlineEditParams = Pick<
    InlineEditProps,
    'open' | 'value' | 'onChange' | 'onCancel' | 'onSubmit' | 'controlRef' | 'children'
>;

export const useInlineEdit = ({
    open = false,
    value,
    onChange,
    onCancel,
    onSubmit,
    controlRef,
    children,
}: UseInlineEditParams) => {
    const [contentRect, setContentRect] = useState(new DOMRect());
    const [innerOpen, setInnerOpen] = useState(open);
    const [innerValue, setInnerValue] = useState(value);

    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLElement>(null);

    useImperativeHandle(controlRef, () => contentRef.current as HTMLElement);
    useImperativeHandle(children?.ref, () => contentRef.current as HTMLElement);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    const setModalPosition = useCallback(() => {
        if (!contentRef.current) {
            return;
        }

        setContentRect(contentRef.current.getBoundingClientRect());
    }, []);

    useEffect(() => {
        setInnerOpen(open);
        setModalPosition();
    }, [open, setModalPosition]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInnerValue(event.target.value);
        onChange?.(event);
    };

    const handleSubmit = () => {
        onSubmit?.(innerValue);
    };

    const handleCancel = () => {
        setInnerValue(value);
        onCancel?.();
    };

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const el = cardRef.current;

            if (el && !el.contains(event.target as Node)) {
                setInnerValue(value);
                onCancel?.();
            }
        },
        [value, onCancel],
    );

    useEffect(() => {
        if (!innerOpen) {
            return undefined;
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [innerOpen, handleClickOutside]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit?.(innerValue);
        }

        if (event.key === 'Escape') {
            setInnerValue(value);
            onCancel?.();
        }
    };

    const clonedChild =
        children && React.isValidElement(children)
            ? React.cloneElement(children, {
                  ...children.props,
                  ref: contentRef,
              })
            : null;

    return {
        innerOpen,
        innerValue,
        contentRect,
        cardRef,
        clonedChild,
        handleChange,
        handleSubmit,
        handleCancel,
        handleKeyDown,
    };
};
