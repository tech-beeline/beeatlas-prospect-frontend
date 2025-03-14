import React from 'react';
import {
    Avatar,
    IconButton,
    Label,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { ExportButton } from './components';
import * as S from './units';

export const ExportPage = () => {
    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <Text variant="h4">Экспорт файлов</Text>
                    <ExportButton />
                </S.Header>

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
                        <TableRow>
                            <TableData>
                                <S.FileNameContainer>
                                    <Avatar iconName={Icons.Page} color="green" />
                                    <Text variant="body3">Бизнес-возможности</Text>
                                </S.FileNameContainer>
                            </TableData>
                            <TableData>xlsx</TableData>
                            <TableData>23.01.2025</TableData>
                            <TableData>
                                <Label title="Готово" type="success" variant="contained" />
                            </TableData>
                            <TableData>
                                <IconButton
                                    data-tooltip-id="download"
                                    size="medium"
                                    iconName={Icons.Download}
                                />
                                <S.TooltipContainer noArrow place="top" offset={8} id={`download`}>
                                    Скачать
                                </S.TooltipContainer>
                            </TableData>
                        </TableRow>
                    </TableBody>
                </Table>

                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Пока здесь пусто"
                        text="Тут появятся экспортированные файлы"
                    />
                </S.NotFoundContainer>
            </S.Container>
        </S.PageWrapper>
    );
};
