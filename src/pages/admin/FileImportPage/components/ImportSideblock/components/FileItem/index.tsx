import React, { FC, useEffect } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { type FileUploaderListItemAction, FileUploaderListItem } from 'components/ui';

import { useUploadImportFileMutation } from 'api/queries/file-import';

import { fileTypeToPathMap } from './const';
import { IFileItem } from './types';

export const FileItem: FC<IFileItem> = ({ file, fileType, index, onRemove }) => {
    const { mutateAsync, isPending, error, progress, abortController } =
        useUploadImportFileMutation({
            file,
        });

    useEffect(() => {
        mutateAsync(fileTypeToPathMap[fileType]);
    }, []);

    const actions: FileUploaderListItemAction[] = [];
    if (error) {
        actions.push({
            icon: Icons.Refresh,
            onClick: () => mutateAsync(fileTypeToPathMap[fileType]),
        });
    }
    if (isPending) {
        actions.push({
            icon: Icons.Close,
            onClick: () => {
                abortController.abort();
                onRemove(index);
            },
        });
    }

    return (
        <FileUploaderListItem
            name={file.name}
            type={file.type}
            state={error ? 'error' : isPending ? 'process' : 'upload'}
            helperText={error ? 'Ошибка загрузки' : undefined}
            onRemove={() => onRemove(index)}
            percent={isPending && progress ? progress : undefined}
            actions={actions}
        />
    );
};
