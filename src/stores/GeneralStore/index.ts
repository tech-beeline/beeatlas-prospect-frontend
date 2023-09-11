import { getCalendarData } from 'api/calendar';
import { getSearchResult } from 'api/fdm';
import { getProfiles } from 'api/personal-area';

// TODO: вынести
import { IGeneralStore } from './types';

export * from './types';

export const GeneralStore = (): IGeneralStore => {
    return {
        isLoadingSearch: false,
        resultSearch: [],
        resultTitle: '',

        profiles: [],

        // ПОИСК

        setLoadingSearch(isLoadingSearch) {
            this.isLoadingSearch = isLoadingSearch;
        },

        async getResultSearch(value) {
            this.resultSearch = [];

            this.setLoadingSearch(true);

            let data;

            try {
                const res = await getSearchResult(value);

                if (res) {
                    data = await res.data;

                    data.length === 0 ? (this.resultSearch = 'nodata') : (this.resultSearch = data);
                } else {
                    // TODO: убрать
                    this.resultSearch = 'nodata';
                }

                // return data;
            } catch (error) {
                console.error((error as Error).message);

                // TODO: убрать
                this.resultSearch = 'nodata';
            } finally {
                this.setLoadingSearch(false);
            }
        },

        // TODO: убрать
        setResultTitle(title: string) {
            this.resultTitle = title;
        },

        // Страница с календарем

        async setCalendarData() {
            // TODO: сделать лоудер

            try {
                const res = await getCalendarData();

                console.log('res', res);
            } catch (error) {}
        },

        // ------PERSONAL AREA------------------------

        // страница Ролей

        async getProfiles() {
            try {
                const res = await getProfiles();

                this.profiles = res.data;
                return res;
            } catch (error) {
                console.error((error as Error).message);
            }
        },

        // id: number
        // name?: string;
        // alias?: string;
        // descr?: string;
        // deleted?: boolean;
    };
};
