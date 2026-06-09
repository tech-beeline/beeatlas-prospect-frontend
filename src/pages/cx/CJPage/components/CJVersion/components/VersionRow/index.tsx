import React, { FC } from 'react';
import dayjs from 'dayjs';
import { getFileName } from 'features/cx/utils';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';

import { useGetBPMNFileDataQuery } from 'api/queries/cj';
import { downloadBpmnFile } from 'pages/cx/CJPage/utils/formatters';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IVersion } from './types';
import * as S from './units';

export const VersionRow: FC<IVersion> = ({ version, cjId }) => {
    const { data: fileData, isLoading } = useGetBPMNFileDataQuery(version.id);

    const handleDownload = () => {
        if (!fileData) return;
        downloadBpmnFile(getFileName(version.key), fileData);
    };

    return (
        <S.FileNameContainer key={version.id}>
            <S.FileNameWrapper>
                <S.FileUploaderListItemStyled name="" />
                <S.FileMetadataContainer>
                    <Link
                        title={getFileName(version.key)}
                        url={`${R.CX_PATH}${R.CJ_PATH}${R.BPMN_PATH}?cjId=${cjId}&versionId=${version.id}`}
                        outer={false}
                    />
                    <Text inactive variant="caption">
                        {dayjs(version.created_date).local().format('DD.MM.YYYY, HH:mm')}
                    </Text>
                </S.FileMetadataContainer>
            </S.FileNameWrapper>

            <IconButton
                iconName={Icons.Download}
                size="medium"
                disabled={isLoading || !fileData}
                onClick={handleDownload}
            />
        </S.FileNameContainer>
    );
};
