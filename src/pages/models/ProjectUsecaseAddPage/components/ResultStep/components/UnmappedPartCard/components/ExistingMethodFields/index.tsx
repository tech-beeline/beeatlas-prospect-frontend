import React, { FC, useMemo, useState } from 'react';

import { Autocomplete } from 'components/ui';

import { useGetProductStructurizrContainerByCmdbQuery } from 'api/queries/product';

import * as S from '../../../../../../units';
import { ProductSelect } from '../ProductSelect';

import { IExistingMethodFields } from './types';
import { findConnectionOperation, getMethodOptions } from './utils';

export const ExistingMethodFields: FC<IExistingMethodFields> = ({
    productLocked,
    products,
    productsLoading,
    draft,
    disabled,
    onDraftChange,
}) => {
    const [search, setSearch] = useState('');
    const { data: containers = [], isLoading: containersLoading } =
        useGetProductStructurizrContainerByCmdbQuery(draft.productAlias);
    const options = useMemo(() => getMethodOptions(containers, search), [containers, search]);

    return (
        <S.ResolutionFields>
            <ProductSelect
                products={products}
                loading={productsLoading}
                value={draft.productAlias}
                disabled={disabled || productLocked}
                onChange={(productAlias) => {
                    setSearch('');
                    onDraftChange({ productAlias, connectionOperation: null });
                }}
            />
            <Autocomplete
                key={draft.productAlias ?? 'no-product'}
                fullWidth
                disabled={disabled || !draft.productAlias}
                label="Метод*"
                loading={containersLoading}
                options={options}
                renderValue={(option) => option.value}
                type="select"
                value={options.find(({ id }) => id === draft.connectionOperation?.id) ?? null}
                onChange={(option) => {
                    setSearch('');
                    if (!draft.productAlias) return;
                    onDraftChange({
                        connectionOperation: findConnectionOperation(
                            containers,
                            Number(option.id),
                            draft.productAlias,
                        ),
                    });
                }}
                onInputChange={(nextSearch) => {
                    setSearch(nextSearch);
                    onDraftChange({ connectionOperation: null });
                }}
                onInputClear={() => {
                    setSearch('');
                    onDraftChange({ connectionOperation: null });
                }}
            />
        </S.ResolutionFields>
    );
};
