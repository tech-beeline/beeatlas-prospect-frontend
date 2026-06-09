import React from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { InlineEditField } from './InlineEditField';
import { InlineEditModal } from './InlineEditModal';
import type { InlineEditProps } from './types';
import * as S from './units';
import { useInlineEdit } from './useInlineEdit';
import { classNames, validateInlineEditChildren } from './utils';

export const InlineEdit = ({
    open = false,
    value,
    onChange,
    onCancel,
    onSubmit,
    controlRef,
    helperText,
    children,
    className,
    ...fieldProps
}: InlineEditProps) => {
    validateInlineEditChildren(children, controlRef);

    const {
        innerOpen,
        innerValue,
        contentRect,
        cardRef,
        clonedChild,
        handleChange,
        handleSubmit,
        handleCancel,
        handleKeyDown,
    } = useInlineEdit({
        open,
        value,
        onChange,
        onCancel,
        onSubmit,
        controlRef,
        children,
    });

    return (
        <>
            {clonedChild}
            {innerOpen && (
                <InlineEditModal contentRect={contentRect}>
                    <S.FormCard
                        ref={cardRef}
                        data-testid="Card"
                        className={classNames(
                            'dsb_card',
                            'dsb_card-root',
                            'dsb_card__elevation-medium',
                            'dsb_inline-edit-form',
                            helperText && 'dsb_inline-edit-form__helperText',
                            className,
                        )}
                    >
                        <InlineEditField
                            {...fieldProps}
                            value={innerValue}
                            autoFocus
                            helperText={helperText}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            className="dsb_inline-edit-form-input"
                        />
                        <S.FormIcons className="dsb_inline-edit-form-icons">
                            <S.FormIcon
                                role="img"
                                translate="no"
                                className="beeline-icons dsb_icon dsb_icon--medium dsb_inline-edit-form-icon dsb_inline-edit-form-icon__check"
                                onClick={handleSubmit}
                            >
                                {Icons.Check}
                            </S.FormIcon>
                            <S.FormIcon
                                role="img"
                                translate="no"
                                className="beeline-icons dsb_icon dsb_icon--medium dsb_inline-edit-form-icon dsb_inline-edit-form-icon__cancel"
                                onClick={handleCancel}
                            >
                                {Icons.Close}
                            </S.FormIcon>
                        </S.FormIcons>
                    </S.FormCard>
                </InlineEditModal>
            )}
        </>
    );
};

InlineEdit.displayName = 'InlineEdit';
