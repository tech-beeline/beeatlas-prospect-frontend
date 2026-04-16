import { IChapter } from 'api/product/types';

export interface IRequirementGroupFields {
    groupIndex: number;
    fieldsCount: number;
    onDeleteGroup: (index: number) => void;
    chapters: IChapter[];
    isLoadingChapters: boolean;
}
