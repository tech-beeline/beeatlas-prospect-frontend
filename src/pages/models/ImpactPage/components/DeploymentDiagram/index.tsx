import React, { FC } from 'react';

import { IconButton } from 'components/ui';
import { Skeleton, TableBody, TableHead, TableRow } from 'components/ui';

import { useGetDeploymentDotGraphQuery } from 'api/queries/graph';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';

import { TabVariant } from '../../const';

import { IDeploymentDiagram } from './types';
import * as S from './units';
import { useVizRenderer } from './utils';

export const DeploymentDiagram: FC<IDeploymentDiagram> = ({ id, tabVariant }) => {
    const { modalOpened, openModal, closeModal } = useModal();

    const { data, isLoading } = useGetDeploymentDotGraphQuery({
        id,
        influence: tabVariant === TabVariant.OUT,
    });

    useVizRenderer(data, 'diagram');
    useVizRenderer(data, 'diagram-dialog', modalOpened);

    return (
        <>
            {isLoading && <Skeleton height={124} radius={12} />}
            {!!data && (
                <S.TableContainer>
                    <S.TableStyled>
                        <TableHead>
                            <TableRow>
                                <S.TableHeaderDataFullWidth>
                                    <S.FlexContainer>
                                        <div>Диаграмма зависимостей</div>
                                        <S.IconsContainer>
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
                                    <S.DiagramContainer>
                                        <S.Diagram id="diagram" />
                                    </S.DiagramContainer>
                                </S.TableDataFullWidth>
                            </TableRow>
                        </TableBody>
                    </S.TableStyled>
                    <Dialog
                        large
                        onClose={closeModal}
                        opened={modalOpened}
                        showFooter={false}
                        title={
                            <>
                                <S.FlexContainer>
                                    <div>Диаграмма зависимостей</div>
                                    <S.IconsContainer>
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
                        <S.DiagramDialogContainer>
                            <S.DiagramDialog id="diagram-dialog" />
                        </S.DiagramDialogContainer>
                    </Dialog>
                </S.TableContainer>
            )}
        </>
    );
};
