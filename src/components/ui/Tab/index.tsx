import React, {
    cloneElement,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import { ClassNames } from '@emotion/react';

import { Icon } from 'components/ui';

import type { TabProps } from './types';
import * as S from './units';

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
    (
        {
            className,
            value,
            label,
            onClick,
            iconName,
            children,
            selected,
            onSelected,
            disabled,
            routingComponent,
            ...rest
        },
        ref,
    ) => {
        const contentRef = useRef<HTMLDivElement>(null);
        const localRef = useRef<HTMLButtonElement>(null);
        const onSelectedRef = useRef(onSelected);

        useImperativeHandle(ref, () => localRef.current as HTMLButtonElement);
        onSelectedRef.current = onSelected;

        useEffect(() => {
            if (selected) {
                onSelectedRef.current?.({
                    tabBody: children,
                    tabElement: contentRef.current,
                });
            }
        }, [selected, children, label]);

        const iconOnly = Boolean(iconName && !label);

        const buttonClassName = useMemo(
            () =>
                [
                    'dsb_tab-new',
                    iconOnly && 'dsb_tab-new--icon-only',
                    selected && 'dsb_tab-new--selected',
                    className,
                ]
                    .filter(Boolean)
                    .join(' '),
            [iconOnly, selected, className],
        );

        const handlerClick = () => {
            onClick?.(value);
        };

        const content = (
            <S.TabContent className="dsb_tab-new__content" ref={contentRef}>
                {iconName && <Icon iconName={iconName} className="dsb_tab-new__icon dsb_icon" />}
                {label && <S.TabLabel className="dsb_tab-new__label">{label}</S.TabLabel>}
                <S.TabIndicator className="dsb_tab-new__indicator" />
            </S.TabContent>
        );

        return (
            <ClassNames>
                {({ css, cx }) => {
                    const rootClassName = cx(
                        css(S.getTabRootStyles(iconOnly, selected)),
                        buttonClassName,
                    );

                    if (routingComponent) {
                        return cloneElement(routingComponent, {
                            className: rootClassName,
                            disabled,
                            onClick: handlerClick,
                            ref: localRef,
                            'data-testid': 'tab',
                            ...rest,
                            children: content,
                        });
                    }

                    return (
                        <button
                            data-testid="Tab"
                            ref={localRef}
                            type="button"
                            className={rootClassName}
                            disabled={disabled}
                            onClick={handlerClick}
                            {...rest}
                        >
                            {content}
                        </button>
                    );
                }}
            </ClassNames>
        );
    },
);

Tab.displayName = 'Tab';
