import React, { FC } from 'react';

import { TextArea } from 'components/ui';

import * as PageS from '../../../../../../units';
import { ProductSelect } from '../ProductSelect';

import { IDevelopFields } from './types';
import * as S from './units';

export const DevelopFields: FC<IDevelopFields> = ({
    products,
    productsLoading,
    draft,
    disabled,
    onDraftChange,
}) => (
    <PageS.ResolutionFields>
        <ProductSelect
            products={products}
            loading={productsLoading}
            value={draft.productAlias}
            disabled={disabled}
            onChange={(productAlias) => onDraftChange({ productAlias })}
        />
        <S.FullRow>
            <TextArea
                fullWidth
                autoHeight
                disabled={disabled}
                label="Требования к методу*"
                helperText="Что принимает, что возвращает, какие атрибуты нужны"
                value={draft.requirements}
                onChange={(event) => onDraftChange({ requirements: event.target.value })}
            />
        </S.FullRow>
    </PageS.ResolutionFields>
);
