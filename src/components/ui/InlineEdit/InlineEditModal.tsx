import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DEFAULT_APPLICATION_ROOT_ELEMENT } from './const';
import type { InlineEditModalProps } from './types';
import * as S from './units';
import { getModalCoords } from './utils';

export const InlineEditModal = ({
    contentRect,
    applicationRootElement = DEFAULT_APPLICATION_ROOT_ELEMENT,
    children,
}: InlineEditModalProps) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const modalWidth = cardRef.current?.getBoundingClientRect().width ?? 0;
        setCoords(getModalCoords(contentRect, modalWidth));
    }, [contentRect]);

    const mount =
        typeof document !== 'undefined' ? document.getElementById(applicationRootElement) : null;

    if (!mount) {
        throw new Error(`Application root element with ID "${applicationRootElement}" not found`);
    }

    return createPortal(
        <S.ModalRoot data-testid="InlineEditModal" className="dsb_inline-edit-modal">
            <S.ModalPositioner
                className="dsb_inline-edit-modal_positioner"
                style={{
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                }}
            >
                {React.cloneElement(children, {
                    ref: (node: HTMLDivElement | null) => {
                        cardRef.current = node;

                        const childRef = (children as { ref?: React.Ref<HTMLDivElement> }).ref;

                        if (typeof childRef === 'function') {
                            childRef(node);
                        } else if (childRef && typeof childRef === 'object') {
                            (childRef as React.MutableRefObject<HTMLDivElement | null>).current =
                                node;
                        }
                    },
                })}
            </S.ModalPositioner>
        </S.ModalRoot>,
        mount,
    );
};
