import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Avatar,
    Banner,
    Button,
    Icon,
    Label,
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { FileStatus } from 'api/file-import/types';
import { useGetAllFilesQuery, useGetTemplateFilesQuery } from 'api/queries/file-import';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { ImportSideblock } from './components';
import { fileStatusToLabelTitleMap, fileStatusToLabelTypeMap } from './const';
import * as S from './units';

export const FileImportPage = () => {
    const [showAllTemplates] = useState(false);
    const [refetchFiles, setRefetchFiles] = useState(false);

    const { openModal, closeModal, modalOpened } = useModal();

    const { data, isLoading } = useGetTemplateFilesQuery();

    const { data: filesData, isLoading: isLoadingFiles } = useGetAllFilesQuery({
        retry: refetchFiles,
    });

    useEffect(() => {
        if (
            filesData &&
            filesData.some(
                (file) =>
                    !file.package_info ||
                    [FileStatus.PROCESS, FileStatus.ERROR, FileStatus.WARNING].includes(
                        file.package_info?.status as FileStatus,
                    ),
            )
        ) {
            setRefetchFiles(true);
        } else {
            setRefetchFiles(false);
        }
    }, [filesData]);

    return (
        <S.PageWrapper>
            <S.Container>
                <S.TitleContainer>
                    <Text variant="h4">Импорт файлов</Text>
                    <Button
                        size="medium"
                        variant="contained"
                        startIcon={<Icon iconName={Icons.Import} />}
                        onClick={openModal}
                    >
                        Импорт файла
                    </Button>
                </S.TitleContainer>
                <Banner
                    iconName={Icons.InfoCircled}
                    title="Для загрузки данных используйте шаблоны. Файлы с другой структурой загружаться не будут"
                    color="info"
                />
                <Text variant="subtitle1">Шаблоны для заполнения данных</Text>
                <S.TemplatesContainer restrictHeight={!showAllTemplates}>
                    {data &&
                        data.map((template, i) => (
                            <S.TemplateCard key={i}>
                                <S.FileUploaderListItemStyled
                                    type={template.type}
                                    name={template.title}
                                    actions={[]}
                                />
                                <Button
                                    startIcon={<Icon iconName={Icons.Download} size="small" />}
                                    data-tooltip-id={`download-${i}`}
                                    onClick={() =>
                                        (window.location.href = `/templates/import/${template.name}`)
                                    }
                                />
                                <TooltipContainer
                                    id={`download-${i}`}
                                    // @ts-ignore
                                    place="bottom-end"
                                    noArrow
                                >
                                    Скачать шаблон
                                </TooltipContainer>
                            </S.TemplateCard>
                        ))}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} height={88} radius={12} />
                        ))}
                </S.TemplatesContainer>
                {/* <S.ButtonContainer> */}
                {/*     <S.ExpandButton onClick={() => setShowAllTemplates(!showAllTemplates)}> */}
                {/*         <Text link variant="body2"> */}
                {/*             {showAllTemplates ? 'Свернуть' : 'Показать все'} */}
                {/*         </Text> */}
                {/*         <S.IconStyled */}
                {/*             size="large" */}
                {/*             iconName={showAllTemplates ? Icons.FastArrowTop : Icons.FastArrowDown} */}
                {/*         /> */}
                {/*     </S.ExpandButton> */}
                {/* </S.ButtonContainer> */}
                <Text variant="subtitle1">Загруженные файлы</Text>
                {isLoadingFiles && <Skeleton height={200} radius={12} />}
                {filesData && filesData.length !== 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <S.TableHeaderDataMaxWidth>Название</S.TableHeaderDataMaxWidth>
                                <TableHeaderData>Формат</TableHeaderData>
                                <TableHeaderData>Дата</TableHeaderData>
                                <TableHeaderData>Статус</TableHeaderData>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filesData.map((file) => (
                                <TableRow key={file.id}>
                                    <TableData>
                                        <S.FileNameContainer>
                                            <Avatar
                                                icon={<Icon iconName={Icons.Page} />}
                                                color="green"
                                            />
                                            <Text variant="body3">
                                                {
                                                    [...file.key.split('/')]
                                                        .reverse()[0]
                                                        .split('.')[0]
                                                }
                                            </Text>
                                        </S.FileNameContainer>
                                    </TableData>
                                    <S.TableDataMinWidth>
                                        {[...file.key.split('/')].reverse()[0].split('.')[1]}
                                    </S.TableDataMinWidth>
                                    <S.TableDataMinWidth>
                                        {dayjs(file.created_date).format('DD.MM.YYYY')}
                                    </S.TableDataMinWidth>
                                    <S.TableDataMinWidth>
                                        <Label
                                            title={
                                                file.package_info
                                                    ? fileStatusToLabelTitleMap[
                                                          file.package_info.status
                                                      ] ?? file.package_info.status
                                                    : 'Загрузка'
                                            }
                                            type={
                                                file.package_info
                                                    ? fileStatusToLabelTypeMap[
                                                          file.package_info.status
                                                      ]
                                                    : 'warning'
                                            }
                                            variant="contained"
                                        />
                                    </S.TableDataMinWidth>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {filesData && filesData.length === 0 && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Нет загруженных файлов"
                            text=""
                        />
                    </S.NotFoundContainer>
                )}
            </S.Container>
            <ImportSideblock isOpen={modalOpened} onClose={closeModal} />
        </S.PageWrapper>
    );
};
