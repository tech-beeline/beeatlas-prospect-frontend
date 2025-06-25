import { ICategory } from 'api/technologies/types';

export interface ITechnologyField {
    isLoading: boolean;
    categoriesData: ICategory[];

    fileList: File[];
    setFileList: (files: File[]) => void;
}
