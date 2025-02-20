import React, { useState } from 'react';
import {
    Avatar,
    Banner,
    Button,
    Icon,
    Label,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { Text } from 'components/core';

import { useModal } from 'hooks';

import { ImportSideblock } from './components';
// import { ImageVariants, NotFoundBlock } from 'components/other';
import * as S from './units';

export const FileImportPage = () => {
    const [showAllTemplates, setShowAllTemplates] = useState(false);

    const { openModal, closeModal, modalOpened } = useModal();

    // @ts-ignore

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
                    {Array.from({ length: 10 }).map((_, i) => (
                        <S.TemplateCard key={i}>
                            <S.FileUploaderListItemStyled
                                type="text/plain"
                                name="Технологии"
                                actions={[]}
                            />
                            <Button
                                startIcon={<Icon iconName={Icons.Download} size="small" />}
                                data-tooltip-id={`download-${i}`}
                            />
                            <S.TooltipContainer
                                id={`download-${i}`}
                                // @ts-ignore
                                place="bottom-end"
                                noArrow
                            >
                                Скачать шаблон
                            </S.TooltipContainer>
                        </S.TemplateCard>
                    ))}
                </S.TemplatesContainer>
                <S.ButtonContainer>
                    <S.ExpandButton onClick={() => setShowAllTemplates(!showAllTemplates)}>
                        <Text link variant="body2">
                            {showAllTemplates ? 'Свернуть' : 'Показать все'}
                        </Text>
                        <S.IconStyled
                            size="large"
                            iconName={showAllTemplates ? Icons.FastArrowTop : Icons.FastArrowDown}
                        />
                    </S.ExpandButton>
                </S.ButtonContainer>
                <Text variant="subtitle1">Загруженные файлы</Text>
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
                        {Array.from({ length: 10 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableData>
                                    <S.FileNameContainer>
                                        <Avatar iconName={Icons.Page} color="blue" />
                                        <Text variant="body3">Название файла может быть любым</Text>
                                    </S.FileNameContainer>
                                </TableData>
                                <S.TableDataMinWidth>xlsx</S.TableDataMinWidth>
                                <S.TableDataMinWidth>23.01.2025</S.TableDataMinWidth>
                                <S.TableDataMinWidth>
                                    <Label title="Успешно" type="success" variant="contained" />
                                </S.TableDataMinWidth>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <S.NotFoundContainer> */}
                {/*     <NotFoundBlock */}
                {/*         imageVariant={ImageVariants.EMPTY_BOX} */}
                {/*         title="Нет загруженных файлов" */}
                {/*         text="" */}
                {/*     /> */}
                {/* </S.NotFoundContainer> */}
            </S.Container>
            <ImportSideblock isOpen={modalOpened} onClose={closeModal} />
        </S.PageWrapper>
    );
};
