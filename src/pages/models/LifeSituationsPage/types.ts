import { IChapter, INonFunctionalRequirement } from 'api/product/types';

export interface ILifeSituationsPage {
    isAdmin: boolean;
}

export enum ItemTypes {
    CHAPTER = 'CHAPTER',
    NFR = 'NFR',
    ERROR = 'ERROR',
}

export type IActiveItem =
    | {
          type: ItemTypes.CHAPTER;
          id: number;
          chapterData: IChapter;
      }
    | {
          type: ItemTypes.NFR;
          id: number;
          chapterId: number;
          chapterData: IChapter;
          nfrData: INonFunctionalRequirement;
      }
    | {
          type: ItemTypes.ERROR;
      };
