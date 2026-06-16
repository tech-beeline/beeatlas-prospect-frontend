import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAllFiles, getTemplateFilesList, uploadImportFile } from 'api/file-import';

import { FileUploadPath } from '../../file-import/types';

const FILE_IMPORT_PREFIX = 'FILE_IMPORT_PREFIX';

export const useGetTemplateFilesQuery = () => {
    return useQuery({
        queryKey: [FILE_IMPORT_PREFIX, 'TEMPLATES'],
        queryFn: () => getTemplateFilesList().then((res) => res.data),
        gcTime: Infinity,
        staleTime: Infinity,
    });
};

interface IGetAllPackagesParams {
    retry?: boolean;
}

export const useGetAllFilesQuery = (params: IGetAllPackagesParams) => {
    return useQuery({
        queryKey: [FILE_IMPORT_PREFIX, 'ALL'],
        queryFn: () => getAllFiles().then((res) => res.data),
        refetchInterval: params.retry ? 5 * 1000 : false,
    });
};

interface IUploadFileParams {
    file: File;
}

export const useUploadImportFileMutation = (params: IUploadFileParams) => {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);

    const abortController = new AbortController();

    const mutation = useMutation({
        mutationKey: [FILE_IMPORT_PREFIX, 'upload', params],
        mutationFn: async (filePath: FileUploadPath) => {
            await uploadImportFile(
                params.file,
                filePath,
                (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
                abortController,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FILE_IMPORT_PREFIX] });
        },
    });
    return { ...mutation, progress, abortController };
};
