import { IFitenssFunctionsAggregationResult, IFitnessFunctionDomain } from 'api/product/types';

export const filterFitnessFunctionsAggregation = ({
    data,
    selectedDomainIds,
    selectedProductIds,
    hideEmpty,
}: {
    data: IFitenssFunctionsAggregationResult;
    selectedDomainIds: Set<number>;
    selectedProductIds: Set<string>;
    hideEmpty: boolean;
}): IFitenssFunctionsAggregationResult => {
    const isDomainFilterActive = selectedDomainIds.size > 0;
    const isProductFilterActive = selectedProductIds.size > 0;

    if (!isDomainFilterActive && !isProductFilterActive) {
        if (!hideEmpty) return data;

        return {
            ...data,
            domain: data.domain.map((domain) => ({
                ...domain,
                product: domain.product.filter((p) => p.fitnessFunctions.length > 0),
            })),
        };
    }

    const filteredDomains: IFitnessFunctionDomain[] = data.domain
        .filter((domain) => {
            if (isDomainFilterActive && !isProductFilterActive) {
                // Выбраны только домены
                return selectedDomainIds.has(domain.id);
            }

            if (!isDomainFilterActive && isProductFilterActive) {
                // Выбраны только продукты: домен — только если в нем есть выбранные продукты
                return domain.product.some((p) => selectedProductIds.has(String(p.id)));
            }

            // Выбраны и домены, и продукты:
            // домен сохраняем если он выбран напрямую или содержит выбранные продукты
            return (
                selectedDomainIds.has(domain.id) ||
                domain.product.some((p) => selectedProductIds.has(String(p.id)))
            );
        })
        .map((domain) => {
            // Если выбраны продукты — в домене оставляем только выбранные продукты
            if (isProductFilterActive) {
                const filteredProducts = domain.product.filter((p) =>
                    selectedProductIds.has(String(p.id)),
                );
                return {
                    ...domain,
                    product: filteredProducts,
                };
            }

            // Если выбраны домены, но не продукты — оставляем все продукты домена
            return domain;
        })
        // Домены должны быть не пустыми по продуктам
        .filter(
            (domain) =>
                domain.product.length > 0 || (isDomainFilterActive && !isProductFilterActive),
        );

    const result: IFitenssFunctionsAggregationResult = {
        ...data,
        domain: filteredDomains,
    };

    if (!hideEmpty) return result;

    return {
        ...result,
        domain: result.domain.map((domain) => ({
            ...domain,
            product: domain.product.filter((p) => p.fitnessFunctions.length > 0),
        })),
    };
};

export const getAutoExpandedDomainIds = ({
    filteredData,
    selectedDomainIds,
    selectedProductIds,
}: {
    filteredData: IFitenssFunctionsAggregationResult;
    selectedDomainIds: number[];
    selectedProductIds: string[];
}): number[] => {
    // Если нет фильтра по продуктам — авто-раскрытие = выбранные домены
    if (selectedProductIds.length === 0) return selectedDomainIds;

    const selectedProductIdsSet = new Set(selectedProductIds);

    return filteredData.domain
        .filter((domain) => domain.product.some((p) => selectedProductIdsSet.has(String(p.id))))
        .map((d) => d.id);
};
