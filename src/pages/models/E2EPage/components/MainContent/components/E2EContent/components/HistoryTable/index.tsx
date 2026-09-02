import React, { FC, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';
import {
    IconButton,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useDownloadE2EPlantUmlFileMutation } from 'api/queries/staging-service';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IHistoryTable } from './types';
import * as S from './units';

const getFileName = (key: string | null) => {
    if (!key) return `plantuml.puml`;

    const fileName = key.split('/').pop() ?? `plantuml.puml`;

    try {
        return decodeURIComponent(fileName);
    } catch {
        return fileName;
    }
};

export const HistoryTable: FC<IHistoryTable> = ({ versions, isLoading, e2eCode }) => {
    const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
    const { mutateAsync: downloadPlantUml } = useDownloadE2EPlantUmlFileMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleDownload = async (documentId: string | number, fileName: string) => {
        setDownloadingId(documentId);

        try {
            const file = await downloadPlantUml(documentId);
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 0);
        } catch {
            showSnackbar({
                message: 'Не удалось скачать PlantUML-файл',
                showCloseButton: true,
            });
        } finally {
            setDownloadingId(null);
        }
    };

    if (isLoading) {
        return <Skeleton height={220} radius={12} />;
    }

    if (versions.length === 0) {
        return (
            <Text inactive variant="body3">
                Загруженных PlantUML-файлов пока нет
            </Text>
        );
    }

    return (
        <S.TableStyled>
            <TableHead>
                <TableRow>
                    <TableHeaderData>Название</TableHeaderData>
                    <TableHeaderData>Дата</TableHeaderData>
                    <TableHeaderData>Отчёт</TableHeaderData>
                    <S.TableHeaderDataFixed />
                </TableRow>
            </TableHead>
            <TableBody>
                {versions.map((version) => {
                    const fileName = getFileName(version.key);

                    return (
                        <TableRow key={version.id}>
                            <S.TableDataStyled>
                                <S.NameContainer>{fileName}</S.NameContainer>
                            </S.TableDataStyled>
                            <TableData>
                                {dayjs(version.created_date).local().format('DD.MM.YYYY, HH:mm')}
                            </TableData>
                            <TableData>
                                <Link
                                    title="Посмотреть"
                                    outer={false}
                                    url={`${R.MODELS_PATH}${R.E2E_PATH}${R.IMPORT_PATH}${
                                        R.VERSION_PATH
                                    }?${new URLSearchParams({
                                        docId: String(version.id),
                                        code: e2eCode,
                                    }).toString()}`}
                                />
                            </TableData>
                            <TableData>
                                <IconButton
                                    iconName={Icons.Download}
                                    disabled={downloadingId === version.id}
                                    onClick={() => handleDownload(version.id, fileName)}
                                    aria-label={`Скачать ${fileName}`}
                                />
                            </TableData>
                        </TableRow>
                    );
                })}
            </TableBody>
        </S.TableStyled>
    );
};
