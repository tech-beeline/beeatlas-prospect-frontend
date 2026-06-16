import { IChapter } from 'api/product/types';

import { ISearchItem, SearchItemType } from './types';

export const createSearchResults = (chapters: IChapter[]): ISearchItem[] =>
    chapters.flatMap((chapter) => [
        {
            type: SearchItemType.CHAPTER,
            chapterId: chapter.id,
            name: chapter.name ?? '',
            code: chapter.code ?? '',
        },
        ...chapter.nfr.map((nfr) => ({
            type: SearchItemType.NFR,
            chapterId: chapter.id,
            chapterName: chapter.name,
            nfrId: nfr.id,
            name: nfr.name ?? '',
            code: nfr.code ?? '',
        })),
    ]);

export const filterSearchResults = (rows: ISearchItem[], searchText: string): ISearchItem[] => {
    const query = searchText.trim().toLowerCase();

    if (query.length < 1) return [];

    return rows.filter((row) => {
        const name = row.name.toLowerCase();
        const code = row.code.toLowerCase();

        return name.includes(query) || code.includes(query);
    });
};
