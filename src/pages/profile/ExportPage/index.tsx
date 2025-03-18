import React from 'react';
import {
    Avatar,
    IconButton,
    Label,
    Progress,
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { useDownloadFileMutation, useGetExportFilesQuery } from 'api/queries/file-export';
import { formatNullableString } from 'utils/formatters';

import { ExportButton } from './components';
import * as S from './units';

export const ExportPage = () => {
    const { data, isLoading } = useGetExportFilesQuery();

    const { mutate: downloadFile } = useDownloadFileMutation();

    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <Text variant="h4">Экспорт файлов</Text>
                    <ExportButton />
                </S.Header>

                {isLoading && <Skeleton radius={12} height={200} />}

                {data && data.length !== 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <S.TableHeaderDataMaxWidth>Название</S.TableHeaderDataMaxWidth>
                                <TableHeaderData>Формат</TableHeaderData>
                                <TableHeaderData>Дата</TableHeaderData>
                                <TableHeaderData>Статус</TableHeaderData>
                                <TableHeaderData></TableHeaderData>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((file) => (
                                <TableRow key={file.id}>
                                    <TableData>
                                        <S.FileNameContainer>
                                            {!file.key && (
                                                <Progress size="mini" shape="circle" cycled />
                                            )}
                                            <Avatar iconName={Icons.Page} color="green" />

                                            <Text inactive={!file.key} variant="body3">
                                                {file.key
                                                    ? [...file.key.split('/')]
                                                          .reverse()[0]
                                                          .split('.')[0]
                                                    : 'Документ'}
                                            </Text>
                                        </S.FileNameContainer>
                                    </TableData>
                                    <TableData>
                                        {file.key ? (
                                            <>
                                                {
                                                    [...file.key.split('/')]
                                                        .reverse()[0]
                                                        .split('.')[1]
                                                }
                                            </>
                                        ) : (
                                            <Text inactive variant="body3">
                                                {formatNullableString(null)}
                                            </Text>
                                        )}
                                    </TableData>
                                    <TableData>
                                        <Text inactive={!file.key} variant="body3">
                                            {dayjs(file.created_date).format('DD.MM.YYYY')}
                                        </Text>
                                    </TableData>
                                    <TableData>
                                        <Label
                                            title={file.key ? 'Готово' : 'В обработке'}
                                            type={file.key ? 'success' : 'default'}
                                            variant="contained"
                                        />
                                    </TableData>
                                    <TableData>
                                        <IconButton
                                            disabled={!file.key}
                                            onClick={() => {
                                                downloadFile(file.id);
                                            }}
                                            data-tooltip-id={`download-${file.id}`}
                                            size="medium"
                                            iconName={Icons.Download}
                                        />
                                        <S.TooltipContainer
                                            noArrow
                                            place="top"
                                            offset={8}
                                            id={`download-${file.id}`}
                                        >
                                            Скачать
                                        </S.TooltipContainer>
                                    </TableData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {data && data.length === 0 && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Пока здесь пусто"
                            text="Тут появятся экспортированные файлы"
                        />
                    </S.NotFoundContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
