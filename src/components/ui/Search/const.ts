import type { SearchSizeVariantsType } from './types';

export const DEFAULT_SEARCH_SIZE: SearchSizeVariantsType = 'medium';
export const DEFAULT_DATA_TEST_ID = 'Search';
export const DEFAULT_FILTER_PLACEHOLDER = 'Категории';

export const SEARCH_ICON_SIZE: Record<SearchSizeVariantsType, 'medium' | 'large'> = {
    small: 'medium',
    medium: 'large',
};
