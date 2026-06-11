import React from 'react';

import { FileUploaderListItem } from '../FileUploaderListItem';

import type { FileUploaderFile, FileUploaderListProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const FileUploaderList = ({
    files,
    onRemove,
    onRefresh,
    className,
    ...props
}: FileUploaderListProps) => {
    if (!files?.length) {
        return null;
    }

    return (
        <S.FileList
            data-testid="FileUploaderList"
            className={classNames('dsb_file-uploader-file-list', className)}
            role="list"
            {...props}
        >
            {files.map((file, index) => {
                const {
                    name,
                    state = 'upload',
                    type,
                    id,
                    iconName,
                    helperText,
                    percent,
                    loaded,
                    actions,
                } = file;
                const sizeLabel = (file as FileUploaderFile & { size?: string }).size;
                const displaySize = typeof sizeLabel === 'string' ? sizeLabel : undefined;

                const handleRefresh = onRefresh ? () => onRefresh(file) : undefined;
                const handleRemove = onRemove ? () => onRemove(file) : undefined;

                return (
                    <FileUploaderListItem
                        key={index}
                        id={id}
                        name={name}
                        state={state}
                        iconName={iconName}
                        helperText={helperText}
                        percent={percent}
                        size={displaySize}
                        loaded={loaded}
                        actions={actions}
                        onRefresh={handleRefresh}
                        onRemove={handleRemove}
                        type={type}
                    />
                );
            })}
        </S.FileList>
    );
};
