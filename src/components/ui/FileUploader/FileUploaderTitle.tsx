import React, { Fragment } from 'react';

import { Typography } from 'components/ui/Typography';

import type { FileUploaderTitleProps } from './types';
import * as S from './units';

export const FileUploaderTitle = ({
    title,
    subTitle,
    dragOver,
    linkName,
    dragOverTitle,
}: FileUploaderTitleProps) => {
    const localTitleVariant = dragOver ? dragOverTitle : title;
    const isComponent = typeof localTitleVariant !== 'string';

    const localTitle = isComponent ? (
        localTitleVariant
    ) : (
        <Fragment>
            <div className="dsb_file-uploader-title_wrapper">
                <Typography variant="body3" className="dsb_file-uploader-title_text">
                    {localTitleVariant}
                </Typography>{' '}
                {linkName && !dragOver && (
                    <span className="dsb_file-uploader-title_link">{linkName}</span>
                )}
            </div>
            {subTitle && !dragOver && (
                <Typography variant="body3" className="dsb_file-uploader-title_subtitle">
                    {subTitle}
                </Typography>
            )}
        </Fragment>
    );

    return (
        <S.TitleRoot data-testid="FileUploaderTitle" className="dsb_file-uploader-title">
            {localTitle}
        </S.TitleRoot>
    );
};
