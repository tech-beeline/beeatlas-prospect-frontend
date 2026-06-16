import { IChapter, INonFunctionalRequirementFullData } from 'api/product/types';

export interface IRequirementGroupFields {
    groupIndex: number;
    fieldsCount: number;
    onDeleteGroup: (index: number) => void;
    chapters: IChapter[];
    productNfrs: INonFunctionalRequirementFullData[];
    isLoadingChapters: boolean;
}
