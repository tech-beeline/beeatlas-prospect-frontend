import {
    IFitnessFunctionDomain,
    IFitnessFunctionProductData,
    IFitnessFunctionsAggregationResult,
} from 'api/product/types';

export const filterFitnessFunctionsAggregation = ({
    data,
    selectedDomainIds,
    selectedProductIds,
    selectedFitnessFunctionIds,
    hideEmpty,
}: {
    data: IFitnessFunctionsAggregationResult;
    selectedDomainIds: Set<number>;
    selectedProductIds: Set<string>;
    selectedFitnessFunctionIds: Set<number>;
    hideEmpty: boolean;
}): IFitnessFunctionsAggregationResult => {
    const isDomainFilterActive = selectedDomainIds.size > 0;
    const isProductFilterActive = selectedProductIds.size > 0;
    const isFitnessFunctionFilterActive = selectedFitnessFunctionIds.size > 0;

    const fitnessFunctionEnum = isFitnessFunctionFilterActive
        ? data.fitnessFunctionEnum.filter((fitnessFunction) =>
              selectedFitnessFunctionIds.has(fitnessFunction.id),
          )
        : data.fitnessFunctionEnum;

    if (!isDomainFilterActive && !isProductFilterActive) {
        if (!hideEmpty)
            return {
                ...data,
                fitnessFunctionEnum,
            };

        return {
            fitnessFunctionEnum,
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

    const result: IFitnessFunctionsAggregationResult = {
        fitnessFunctionEnum,
        domain: filteredDomains,
    };

    if (!hideEmpty) return result;

    return {
        fitnessFunctionEnum,
        domain: result.domain.map((domain) => ({
            ...domain,
            product: domain.product.filter((p) => p.fitnessFunctions.length > 0),
        })),
    };
};

export interface IDashboardData {
    correctProductsCount: number;
    correctProductsPercent: number;
    totalProductsCount: number;
}

export const getDashboardData = (
    filteredFitnessFunctionsData: IFitnessFunctionsAggregationResult | undefined,
): IDashboardData => {
    if (!filteredFitnessFunctionsData) {
        return {
            correctProductsCount: 0,
            correctProductsPercent: 0,
            totalProductsCount: 0,
        };
    }

    const enumIds = filteredFitnessFunctionsData.fitnessFunctionEnum.map((f) => f.id);

    const totalProductsCount = filteredFitnessFunctionsData.domain.reduce<
        IFitnessFunctionProductData[]
    >((acc, domain) => acc.concat(domain.product), []);

    const correctProductsCount = totalProductsCount.filter((product) =>
        enumIds.every((id) => {
            const ff = product.fitnessFunctions.find((x) => x.id === id);
            return ff?.isCheck === true;
        }),
    ).length;

    const correctProductsPercent =
        totalProductsCount.length > 0
            ? Math.round((correctProductsCount / totalProductsCount.length) * 100)
            : 0;

    return {
        correctProductsCount,
        correctProductsPercent,
        totalProductsCount: totalProductsCount.length,
    };
};

export const getAutoExpandedDomainIds = ({
    filteredData,
    selectedDomainIds,
    selectedProductIds,
}: {
    filteredData: IFitnessFunctionsAggregationResult;
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
