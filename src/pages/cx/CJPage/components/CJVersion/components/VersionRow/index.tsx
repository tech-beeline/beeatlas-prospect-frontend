import React, { FC } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { useGetBPMNFileDataQuery } from 'api/queries/cj';
import { downloadBpmnFile } from 'pages/cx/CJPage/utils/formatters';
import * as ROUTER from 'router/const';

import { IVersion } from './types';
import * as S from './units';

export const VersionRow: FC<IVersion> = ({ version, cjId }) => {
    const { data: fileData, isLoading } = useGetBPMNFileDataQuery(version.id);

    const getFileName = (key?: string): string => {
        if (!key) return 'diagram.bpmn';

        const filePart = key.split('/').pop() || '';
        const withoutExt = filePart.replace('.bpmn', '');
        const base = withoutExt.split('_')[0];

        return `${decodeURI(base)}.bpmn`;
    };

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
                        url={`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.BPMN_PATH}?cjId=${cjId}&versionId=${version.id}`}
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
