import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
    CALENDAR_WIDTH,
    DEFAULT_APPLICATION_ROOT_ELEMENT_ID,
    DROPDOWN_ELEMENT_ID,
    DROPDOWN_MAX_HEIGHT,
    DROPDOWN_VERTICAL_OFFSET,
    DROPDOWN_VIEWPORT_PADDING,
} from './const';
import type { DatePickerDropdownProps } from './types';
import * as S from './units';
import { type DropdownPosition, calculateDropdownPosition } from './utils';

const DEFAULT_POSITION: DropdownPosition = {
    top: 0,
    left: 0,
    width: CALENDAR_WIDTH,
    maxHeight: DROPDOWN_MAX_HEIGHT,
    placement: 'bottom',
};

export const DatePickerDropdown = ({
    isOpen,
    parentRef,
    dropdownRef,
    applicationRootElementID = DEFAULT_APPLICATION_ROOT_ELEMENT_ID,
    dropdownElementID = DROPDOWN_ELEMENT_ID,
    dropdownClassName,
    dropdownWidth = CALENDAR_WIDTH,
    onOutsideClick,
    dataTestId = 'DatePickerDropdown',
    children,
}: DatePickerDropdownProps) => {
    const [position, setPosition] = useState<DropdownPosition>({
        ...DEFAULT_POSITION,
        width: dropdownWidth,
    });

    useLayoutEffect(() => {
        if (!isOpen || !parentRef.current) {
            return undefined;
        }

        const updatePosition = () => {
            if (!parentRef.current) {
                return;
            }

            const parentRect = parentRef.current.getBoundingClientRect();
            const measuredHeight = dropdownRef?.current?.offsetHeight ?? 0;

            setPosition(
                calculateDropdownPosition({
                    parentRect,
                    dropdownHeight: measuredHeight,
                    dropdownWidth,
                    verticalOffset: DROPDOWN_VERTICAL_OFFSET,
                    viewportPadding: DROPDOWN_VIEWPORT_PADDING,
                    maxHeightLimit: DROPDOWN_MAX_HEIGHT,
                }),
            );
        };

        updatePosition();

        const dropdownElement = dropdownRef?.current;
        const resizeObserver =
            dropdownElement && typeof ResizeObserver !== 'undefined'
                ? new ResizeObserver(updatePosition)
                : null;

        resizeObserver?.observe(dropdownElement as Element);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [dropdownRef, dropdownWidth, isOpen, parentRef]);

    useLayoutEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            const positioner = document.getElementById(dropdownElementID);

            if (parentRef.current?.contains(target)) {
                return;
            }

            if (positioner?.contains(target)) {
                return;
            }

            onOutsideClick?.();
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [dropdownElementID, isOpen, onOutsideClick, parentRef]);

    if (!isOpen) {
        return null;
    }

    const mount =
        typeof document !== 'undefined'
            ? document.getElementById(applicationRootElementID) || document.body
            : null;

    if (!mount) {
        return null;
    }

    return createPortal(
        <S.DropdownPortal
            id={dropdownElementID}
            data-testid={dataTestId}
            className={dropdownClassName}
            data-placement={position.placement}
            ref={dropdownRef}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                maxHeight: position.maxHeight,
            }}
        >
            {children}
        </S.DropdownPortal>,
        mount,
    );
};
