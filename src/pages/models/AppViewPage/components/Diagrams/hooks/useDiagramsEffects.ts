import { useEffect } from 'react';

import { getProductInfoByCmdb } from 'api/product';

import { loadPinnedEntries } from '../utils';

import { IUseDiagramsEffects } from './types';

export const useDiagramsEffects = ({
    cmdb,
    productAlias,
    setProductAlias,
    setProductName,
    setError,
    setPinnedEntries,
    setDiagramHistory,
    loadSystemRoot,
}: IUseDiagramsEffects) => {
    useEffect(() => {
        const loadProduct = async () => {
            if (!cmdb) {
                return;
            }
            try {
                const product = await getProductInfoByCmdb(cmdb).then((res) => res.data);
                setProductAlias(product.alias ?? '');
                setProductName(product.name ?? '');
            } catch {
                setError('Не удалось загрузить данные продукта');
            }
        };
        void loadProduct();
    }, [cmdb, setError, setProductAlias, setProductName]);

    useEffect(() => {
        if (!productAlias) {
            return;
        }
        setPinnedEntries(loadPinnedEntries(productAlias));
    }, [productAlias, setPinnedEntries]);

    useEffect(() => {
        if (!productAlias) {
            return;
        }
        setDiagramHistory([]);
        void loadSystemRoot();
    }, [loadSystemRoot, productAlias, setDiagramHistory]);
};
