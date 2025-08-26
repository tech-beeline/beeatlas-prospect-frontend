import React from 'react';
import { IconButton, Table, TableBody, TableHead, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';

import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';

import diagram from './images/diagram.png';

import * as S from './units';

export const ContextDiagram = () => {
    const { modalOpened, openModal, closeModal } = useModal();

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <S.TableHeaderDataFullWidth>
                            <S.FlexContainer>
                                <div>Контекстная диаграмма</div>
                                <S.IconsContainer>
                                    <IconButton
                                        size="medium"
                                        iconName={Icons.Copy}
                                        data-tooltip-id="copy-image"
                                    />
                                    <TooltipContainer
                                        noArrow
                                        place="top"
                                        offset={8}
                                        id="copy-image"
                                    >
                                        Копировать изображение
                                    </TooltipContainer>
                                    <IconButton
                                        size="medium"
                                        iconName={Icons.Expand}
                                        onClick={openModal}
                                    />
                                </S.IconsContainer>
                            </S.FlexContainer>
                        </S.TableHeaderDataFullWidth>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <S.TableDataFullWidth>
                            <S.DiagramImage src={diagram} />
                        </S.TableDataFullWidth>
                    </TableRow>
                </TableBody>
            </Table>
            <Dialog
                onClose={closeModal}
                opened={modalOpened}
                showFooter={false}
                title={
                    <>
                        <S.FlexContainer>
                            <div>Контекстная диаграмма</div>
                            <S.IconsContainer>
                                <IconButton
                                    size="medium"
                                    iconName={Icons.Copy}
                                    data-tooltip-id="copy-image-dialog"
                                />
                                <TooltipContainer
                                    noArrow
                                    place="top"
                                    offset={8}
                                    id="copy-image-dialog"
                                >
                                    Копировать изображение
                                </TooltipContainer>
                                <IconButton
                                    size="medium"
                                    iconName={Icons.Collapse}
                                    onClick={closeModal}
                                />
                            </S.IconsContainer>
                        </S.FlexContainer>
                    </>
                }
            >
                <S.DiagramImage src={diagram} />
            </Dialog>
        </>
    );
};
