import React, { FC } from 'react';
import { IconButton, Skeleton, TableBody, TableHead, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

// import { TooltipContainer } from 'components/interaction';
import { useGetDeploymentDiagramQuery } from 'api/queries/graph';
import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';

import { IDeploymentDiagram } from './types';
import * as S from './units';
import { useStructurizrRenderer } from './utils';

export const DeploymentDiagram: FC<IDeploymentDiagram> = ({
    cmdb,
    deploymentName,
    environmentName,
}) => {
    const { modalOpened, openModal, closeModal } = useModal();

    const { data, isLoading } = useGetDeploymentDiagramQuery(cmdb, environmentName, deploymentName);

    useStructurizrRenderer(data, 'diagram');
    useStructurizrRenderer(data, 'diagram-dialog', modalOpened);

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
                                        <div>Контекстная диаграмма</div>
                                        <S.IconsContainer>
                                            {/* <IconButton
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
                                    </TooltipContainer> */}
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
                                    <div>Контекстная диаграмма</div>
                                    <S.IconsContainer>
                                        {/* <IconButton
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
                                </TooltipContainer> */}
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
