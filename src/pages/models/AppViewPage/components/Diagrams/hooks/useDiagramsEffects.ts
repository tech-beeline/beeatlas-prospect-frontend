import { Dispatch, SetStateAction, useEffect } from 'react';

import { getProductInfoByCmdb } from 'api/product';

import { DiagramSnapshot, PinnedEntry } from '../types';
import { loadPinnedEntries } from '../utils';

interface UseDiagramsEffectsArgs {
    cmdb: string | null;
    productAlias: string;
    setProductAlias: (value: string) => void;
    setProductName: (value: string) => void;
    setError: (value: string) => void;
    setPinnedEntries: Dispatch<SetStateAction<PinnedEntry[]>>;
    setDiagramHistory: Dispatch<SetStateAction<DiagramSnapshot[]>>;
    loadSystemRoot: () => Promise<void>;
}

export const useDiagramsEffects = ({
    cmdb,
    productAlias,
    setProductAlias,
    setProductName,
    setError,
    setPinnedEntries,
    setDiagramHistory,
    loadSystemRoot,
}: UseDiagramsEffectsArgs) => {
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
