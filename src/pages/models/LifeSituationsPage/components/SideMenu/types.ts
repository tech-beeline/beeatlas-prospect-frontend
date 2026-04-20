import { IActiveItem } from '../../types';

export interface ISideMenu {
    activeItem: IActiveItem | null;
    isAdmin: boolean;
}

export enum SearchItemType {
    CHAPTER = 'CHAPTER',
    NFR = 'NFR',
}

export type ISearchItem =
    | {
          type: SearchItemType.CHAPTER;
          chapterId: number;
          name: string;
          code: string;
      }
    | {
          type: SearchItemType.NFR;
          chapterId: number;
          chapterName: string;
          nfrId: string;
          name: string;
          code: string;
      };
