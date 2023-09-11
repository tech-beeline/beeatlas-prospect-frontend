export interface IGeneralStore {
    // ПОИСК
    resultSearch: any[] | 'nodata';
    isLoadingSearch: boolean;
    resultTitle: string;
    setLoadingSearch: (bool: boolean) => void;
    getResultSearch: (value: string) => Promise<any> | unknown;
    setResultTitle: (value: string) => void;

    // СТРАНИЦА КАЛЕНДАРЯ
    setCalendarData: () => void;

    // АДМИНКА
    profiles: Record<string, any>[];

    getProfiles: () => void;
}
