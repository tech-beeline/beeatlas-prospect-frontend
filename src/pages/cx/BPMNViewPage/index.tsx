import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import drilldownModule from 'bpmn-js/lib/features/drilldown';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import dayjs from 'dayjs';
import searchModule from 'diagram-js/lib/features/search';
import { getFileName } from 'features/cx/utils';

import { Text } from 'components/core';
import { ClampedText } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Select } from 'components/ui';
import { Skeleton } from 'components/ui';

import {
    useGetBPMNFileDataQuery,
    useGetCJByIdQuery,
    useGetCJFileVersionByIdQuery,
} from 'api/queries/cj';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { downloadBpmnFile } from '../CJPage/utils/formatters';

import * as S from './units';

export const BPMNViewPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const cjId = params.get('cjId');
    const versionId = params.get('versionId');

    const { data: fileData } = useGetBPMNFileDataQuery(versionId);
    const { data: versions, isLoading: loadingVersion } = useGetCJFileVersionByIdQuery(cjId);
    const { data: cj, isLoading: isLoadingCJ } = useGetCJByIdQuery(cjId);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewerRef = useRef<any>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const versionOptions = (versions ?? []).map((v) => ({
        value: getFileName(v.key),
        id: v.id,
        created: v.created_date,
    }));

    const handleVersionChange = (options: Array<{ id: number | string; value: string }>) => {
        const first = options[0];
        if (!first) return;

        const newVersionId = String(first.id);

        navigate({
            pathname: `${R.CX_PATH}${R.CJ_PATH}${R.BPMN_PATH}`,
            search: `?cjId=${cjId}&versionId=${newVersionId}`,
        });
    };

    useEffect(() => {
        if (!containerRef.current || !fileData) return;

        if (viewerRef.current) viewerRef.current.destroy();

        viewerRef.current = new NavigatedViewer({
            container: containerRef.current,
            height: '100%',
            width: '100%',
            additionalModules: [drilldownModule, searchModule],
        });

        viewerRef.current.importXML(fileData).then(() => {
            const canvas = viewerRef.current.get('canvas');
            const eventBus = viewerRef.current.get('eventBus');

            canvas.zoom('fit-viewport', 'auto');

            eventBus.on('drilldown.rendered', () => {
                const canvas = viewerRef.current.get('canvas');
                canvas.resized();
                canvas.zoom('fit-viewport', 'auto');
            });
        });

        if (resizeObserverRef.current) resizeObserverRef.current.disconnect();

        resizeObserverRef.current = new ResizeObserver(() => {
            if (!viewerRef.current) return;
            const canvas = viewerRef.current.get('canvas');
            canvas.resized();
            canvas.zoom('fit-viewport', 'auto');
        });

        resizeObserverRef.current.observe(containerRef.current);

        return () => {
            viewerRef.current?.destroy?.();
            resizeObserverRef.current?.disconnect?.();
        };
    }, [fileData]);
    const currentVersion = versions?.find((v) => String(v.id) === versionId);
    const handleDownload = () => {
        if (!fileData || !currentVersion) return;

        const filename = getFileName(currentVersion.key);
        downloadBpmnFile(filename, fileData);
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() => navigate(-1)}
                    />
                    {isLoadingCJ && <Skeleton width={666} height={40} variant="square" />}
                    {cj && (
                        <div>
                            <S.Name>
                                <ClampedText
                                    text={cj.name}
                                    tooltipId={`bpmn-filename-${cj.name}`}
                                    noArrow
                                    place="top"
                                    offset={8}
                                />
                            </S.Name>
                            <S.Desription>
                                Cj доступен только для просмотра. Чтобы внести изменения, скачайте и
                                загрузите обновленный файл
                            </S.Desription>
                        </div>
                    )}
                    <S.SelectWrapper>
                        <Select
                            fullWidth
                            label=""
                            name="versions"
                            disabled={loadingVersion}
                            options={versionOptions}
                            values={
                                versionId
                                    ? versionOptions.filter((opt) => String(opt.id) === versionId)
                                    : []
                            }
                            onChange={handleVersionChange}
                            size="small"
                            makeOption={(option) => (
                                <S.FileMetadataContainer>
                                    <S.FileNameWrapper>
                                        <ClampedText
                                            text={option.value}
                                            tooltipId={`bpmn-filename-${option.id}`}
                                            noArrow
                                            place="top"
                                            offset={8}
                                        />
                                        <Text inactive variant="caption">
                                            {dayjs(option.created)
                                                .local()
                                                .format('DD.MM.YYYY, HH:mm')}
                                        </Text>
                                    </S.FileNameWrapper>
                                    <IconButton
                                        iconName={Icons.Download}
                                        size="large"
                                        onClick={handleDownload}
                                    />
                                </S.FileMetadataContainer>
                            )}
                        />
                    </S.SelectWrapper>
                </S.FlexSideContainer>
                <IconButton iconName={Icons.Close} size="large" onClick={() => navigate(-1)} />
            </S.Header>
            <S.Content ref={containerRef} />
        </S.PageWrapper>
    );
};
