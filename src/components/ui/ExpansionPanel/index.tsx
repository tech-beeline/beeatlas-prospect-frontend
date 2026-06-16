import React, { useEffect, useState } from 'react';

import { ExpansionPanelTitle } from './ExpansionPanelTitle';
import { ExpansionPanelProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const ExpansionPanel = ({
    open,
    title,
    description,
    subTitle,
    onOpen,
    onClose,
    className,
    titleClassName,
    bodyClassName,
    children,
    iconName,
    customButton,
    ...props
}: ExpansionPanelProps) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        if (isOpen !== open) {
            setIsOpen(open);
        }
    }, [isOpen, open]);

    const handleClick: React.MouseEventHandler = (event) => {
        if (isOpen) {
            onClose?.(event);
        } else {
            onOpen?.(event);
        }

        setIsOpen((prev) => !prev);
    };

    return (
        <S.StyledExpansionPanel
            {...props}
            className={classNames('dsb_expansion-panel', className)}
            data-testid="ExpansionPanel"
        >
            <ExpansionPanelTitle
                open={isOpen}
                title={title}
                onClick={handleClick}
                subTitle={subTitle}
                description={description}
                iconName={iconName}
                customButton={customButton}
                className={titleClassName}
            />
            <div
                className={classNames(
                    'dsb_expansion-panel-body',
                    !isOpen && 'dsb_expansion-panel-body__collapsed',
                    bodyClassName,
                )}
            >
                {children}
            </div>
        </S.StyledExpansionPanel>
    );
};
