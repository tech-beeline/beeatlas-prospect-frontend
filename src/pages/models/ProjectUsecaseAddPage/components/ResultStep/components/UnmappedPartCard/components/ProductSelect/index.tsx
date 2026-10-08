import React, { FC, useMemo, useState } from 'react';

import { Autocomplete } from 'components/ui';

import { IProductSelect } from './types';
import { getProductOptions } from './utils';

export const ProductSelect: FC<IProductSelect> = ({
    products,
    loading,
    value,
    disabled,
    onChange,
}) => {
    const [search, setSearch] = useState('');
    const options = useMemo(() => getProductOptions(products, search), [products, search]);

    return (
        <Autocomplete
            fullWidth
            disabled={disabled}
            label="Приложение (мнемоника)*"
            loading={loading}
            options={options}
            renderValue={(option) => option.value}
            type="select"
            value={options.find(({ id }) => id === value) ?? null}
            onChange={(option) => {
                setSearch('');
                onChange(String(option.id));
            }}
            onInputChange={(nextSearch) => {
                setSearch(nextSearch);
                onChange(null);
            }}
            onInputClear={() => {
                setSearch('');
                onChange(null);
            }}
        />
    );
};
