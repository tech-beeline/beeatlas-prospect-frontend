import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { SearchDropdownProps } from './types';
import * as S from './units';
import { classNames } from './utils';

const DEFAULT_ROOT_ELEMENT_ID = 'root';

export const SearchDropdown = <T,>({
    options,
    values,
    onChange,
    onOutsideClick,
    makeOption,
    parentRef,
    isOpen = false,
    handleSetOpen,
    dataTestId = 'SearchDropdown',
}: SearchDropdownProps<T>) => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (!isOpen || !parentRef.current) {
            return;
        }

        const updatePosition = () => {
            if (!parentRef.current) {
                return;
            }

            const rect = parentRef.current.getBoundingClientRect();

            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isOpen, parentRef]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            const positioner = document.getElementById('dsb__positioner');

            if (parentRef.current?.contains(target)) {
                return;
            }

            if (positioner?.contains(target)) {
                return;
            }

            handleSetOpen?.(false);
            onOutsideClick?.();
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [isOpen, handleSetOpen, onOutsideClick, parentRef]);

    if (!isOpen) {
        return null;
    }

    const mount =
        typeof document !== 'undefined'
            ? document.getElementById(DEFAULT_ROOT_ELEMENT_ID) || document.body
            : null;

    if (!mount) {
        return null;
    }

    const handleSelect = (item: SearchDropdownProps<T>['options'][number]) => {
        onChange([item]);
        handleSetOpen?.(false);
    };

    return createPortal(
        <S.DropdownOptions
            id="dsb__positioner"
            data-testid={dataTestId}
            className="dsb_options"
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
            }}
        >
            {options.map((item) => {
                const isSelected = values.some((value) => value.id === item.id);

                return (
                    <S.DropdownItem
                        key={String(item.id)}
                        role="button"
                        tabIndex={0}
                        className={classNames(isSelected && 'selected')}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSelect(item);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleSelect(item);
                            }
                        }}
                    >
                        {makeOption(item, isSelected)}
                    </S.DropdownItem>
                );
            })}
        </S.DropdownOptions>,
        mount,
    );
};
