import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { downloadExportFile, getExportFiles, postExport } from 'api/file-export';
import { ExportVariant } from 'api/file-export/types';

const FILE_EXPORT_PREFIX = 'FILE_EXPORT_PREFIX';

interface IGetExportFilesParams {
    refetch?: boolean;
}

export const useGetExportFilesQuery = (params: IGetExportFilesParams) => {
    return useQuery({
        queryKey: [FILE_EXPORT_PREFIX, 'ALL'],
        queryFn: () => getExportFiles().then((res) => res.data),
        refetchInterval: params.refetch ? 5 * 1000 : false,
    });
};

export const useDownloadFileMutation = () => {
    return useMutation({
        mutationKey: [FILE_EXPORT_PREFIX, 'DOWNLOAD'],
        mutationFn: async (id: string | number) => {
            const response = await downloadExportFile(id);
            const blob = response.data;

            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : 'download_file';

            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        },
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
