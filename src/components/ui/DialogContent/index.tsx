import React, { forwardRef } from 'react';

import { Button } from '../Button';

import type { DialogContentProps } from './types';
import * as S from './units';
import { classNames, useExtraSmallDevice, useScrollableContent } from './utils';

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    ({ title, footer, children, className, actions, fullscreen = false, ...rest }, ref) => {
        const isExtraSmallDevice = useExtraSmallDevice();
        const buttonSize = isExtraSmallDevice ? 'medium' : 'small';
        const [dialogChildrenRef, showScroll] = useScrollableContent(children, fullscreen);

        const defaultFooter = (
            <S.FooterActionLine className="dsb_dialog-footer_action-line">
                {actions?.cancel && (
                    <Button
                        className="dsb_dialog-footer_action-button"
                        size={buttonSize}
                        onClick={(event) => actions.cancel?.onClick?.(event)}
                    >
                        {actions.cancel.label || 'Закрыть'}
                    </Button>
                )}
                {actions?.confirm && (
                    <Button
                        className="dsb_dialog-footer_action-button"
                        variant="contained"
                        size={buttonSize}
                        onClick={(event) => actions.confirm?.onClick?.(event)}
                    >
                        {actions.confirm.label || 'Активная'}
                    </Button>
                )}
            </S.FooterActionLine>
        );

        const currentFooter = footer ?? defaultFooter;

        if (fullscreen) {
            return (
                <S.DialogContentFullscreen
                    ref={ref}
                    data-testid="DialogContent"
                    className={classNames(
                        'dsb_dialog-content',
                        'dsb_dialog-content-fullscreen',
                        className,
                    )}
                    {...rest}
                >
                    {children}
                </S.DialogContentFullscreen>
            );
        }

        return (
            <S.DialogContentRoot
                ref={ref}
                data-testid="DialogContent"
                className={classNames(
                    'dsb_dialog-content',
                    showScroll && 'dsb_dialog-content__scrollable',
                    isExtraSmallDevice && 'dsb_dialog-content__small-screen',
                    className,
                )}
                $scrollable={showScroll}
                $smallScreen={isExtraSmallDevice}
                {...rest}
            >
                {title && (
                    <S.DialogTitle
                        className={classNames(
                            'dsb_dialog-title',
                            showScroll && 'dsb_dialog-title__scrollable',
                        )}
                        $scrollable={showScroll}
                    >
                        {title}
                    </S.DialogTitle>
                )}
                {showScroll && <S.DialogDivider className="dsb_dialog-divider" />}
                <S.DialogChildren ref={dialogChildrenRef} className="dsb_dialog-children">
                    {children}
                </S.DialogChildren>
                {showScroll && <S.DialogDivider className="dsb_dialog-divider" />}
                <S.DialogFooter
                    className={classNames(
                        'dsb_dialog-footer',
                        showScroll && 'dsb_dialog-footer__scrollable',
                    )}
                    $scrollable={showScroll}
                >
                    {currentFooter}
                </S.DialogFooter>
            </S.DialogContentRoot>
        );
    },
);

DialogContent.displayName = 'DialogContent';
