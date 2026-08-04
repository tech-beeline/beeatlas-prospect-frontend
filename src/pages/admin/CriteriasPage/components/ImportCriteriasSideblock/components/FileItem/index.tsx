import React, { FC, useEffect } from 'react';

import { type FileUploaderListItemAction, FileUploaderListItem } from 'components/ui';

import { FileUploadPath } from 'api/file-import/types';
import { useUploadImportFileMutation } from 'api/queries/file-import';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { IFileItem } from './types';

export const FileItem: FC<IFileItem> = ({ file, index, onRemove }) => {
    const { mutateAsync, isPending, error, progress, abortController } =
        useUploadImportFileMutation({
            file,
        });

    useEffect(() => {
        mutateAsync(FileUploadPath.CRITERIAS);
    }, []);

    const actions: FileUploaderListItemAction[] = [];
    if (error) {
        actions.push({
            icon: Icons.Refresh,
            onClick: () => mutateAsync(FileUploadPath.CRITERIAS),
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
