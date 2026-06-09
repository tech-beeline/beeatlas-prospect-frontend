import React, { Fragment, isValidElement } from 'react';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { Progress } from '../Progress';
import { Typography } from '../Typography';

import type {
    FileState,
    FileUploaderListItemAction,
    FileUploaderListItemFile,
    FileUploaderListItemProps,
} from './types';
import * as S from './units';
import { classNames, mapFileIcon } from './utils';

export const FileUploaderListItem = ({
    name,
    state = 'upload',
    onRefresh,
    onRemove,
    iconName,
    id,
    type,
    className,
    helperText,
    percent,
    size,
    loaded,
    actions,
    ...props
}: FileUploaderListItemProps) => {
    const fileInfo: FileUploaderListItemFile = { id, name, state, iconName, type };

    const handleRefresh = () => {
        onRefresh?.(fileInfo);
    };

    const handleRemove = () => {
        onRemove?.(fileInfo);
    };

    const fileIcon = mapFileIcon(type);

    const renderActions = (
        fileActions: FileUploaderListItemAction[] | React.ReactNode,
        fileState: FileState,
    ) => {
        if (isValidElement(fileActions)) {
            return fileActions;
        }

        return (fileActions as FileUploaderListItemAction[]).map(
            (fileAction) =>
                (!fileAction.showStatuses || fileAction.showStatuses.includes(fileState)) && (
                    <S.ActionDelete
                        key={String(fileAction.icon)}
                        className="dsb_file-uploader-file-delete"
                    >
                        <Icon
                            iconName={fileAction.icon}
                            size="large"
                            onClick={() => fileAction.onClick(fileInfo)}
                        />
                    </S.ActionDelete>
                ),
        );
    };

    const defaultActions = actions ? (
        renderActions(actions, state)
    ) : (
        <Fragment>
            {state === 'error' && (
                <S.ActionRefresh className="dsb_file-uploader-file-refresh">
                    <Icon iconName={Icons.Refresh} size="large" onClick={handleRefresh} />
                </S.ActionRefresh>
            )}
            <S.ActionDelete className="dsb_file-uploader-file-delete">
                <Icon iconName={Icons.Close} size="large" onClick={handleRemove} />
            </S.ActionDelete>
        </Fragment>
    );

    return (
        <S.Root className="dsb_file-uploader_file" role="listitem">
            <S.Description
                data-testid="FileUploaderListItem"
                className={classNames('dsb_file-uploader-file-description', className)}
                {...props}
            >
                <S.NameWrapper className="dsb_file-uploader-file_name-wrapper">
                    <S.NameRow className="dsb_file-uploader-file_name">
                        <S.FileIcon className="dsb_file-uploader-file-icon">{fileIcon}</S.FileIcon>
                        <Typography variant="body2" className="dsb_file-uploader-file_name-text">
                            {name}
                            {helperText && (
                                <span className={classNames(state === 'error' && 'error-text')}>
                                    {helperText}
                                </span>
                            )}
                        </Typography>
                    </S.NameRow>
                </S.NameWrapper>
                {defaultActions}
            </S.Description>
            <S.ProgressSection className="dsb_file-uploader-file-progress">
                {state === 'process' && (
                    <Progress
                        className="progress-style"
                        cycled={!!percent}
                        value={percent ? percent : 0}
                    />
                )}
                {percent && (
                    <S.SizeLine className="size-line">
                        <span>
                            {size} из {loaded}
                        </span>
                        <span className="percent">{percent}%</span>
                    </S.SizeLine>
                )}
            </S.ProgressSection>
        </S.Root>
    );
};

FileUploaderListItem.displayName = 'FileUploaderListItem';
