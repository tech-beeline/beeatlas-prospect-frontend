import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { downloadExportFile, getExportFiles, postExport } from 'api/file-export';
import { ExportVariant } from 'api/file-export/types';

const FILE_EXPORT_PREFIX = 'FILE_EXPORT_PREFIX';

export const useGetExportFilesQuery = () => {
    return useQuery({
        queryKey: [FILE_EXPORT_PREFIX, 'ALL'],
        queryFn: () => getExportFiles().then((res) => res.data),
    });
};

export const useDownloadFileMutation = () => {
    return useMutation({
        mutationKey: [FILE_EXPORT_PREFIX, 'DOWNLOAD'],
        mutationFn: (id: string | number) => downloadExportFile(id).then((res) => res.data),
    });
};

export function useCreateExportMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [FILE_EXPORT_PREFIX, 'create'],
        mutationFn: (variant: ExportVariant) => postExport(variant),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FILE_EXPORT_PREFIX] });
        },
    });
}
