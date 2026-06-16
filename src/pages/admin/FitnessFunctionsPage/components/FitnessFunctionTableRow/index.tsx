import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FitnessFunctionStatus,
    fitnessFunctionStatuses,
    fitnessFunctionStatusToNameMap,
    fitnessFunctionStatusToSemanticMap,
    fitnessFunctionTypeToNameMap,
    getFitnessFunctionType,
} from 'features/fitness-functions';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Badge, TableData, TableRow } from 'components/ui';

import { usePostFitnessFunctionStatusMutation } from 'api/queries/fitness-functions';
import { useModal, useShowTooltip } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString, formatYesNo } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';

import { IFitnessFunctionTableRow } from './types';
import * as S from './units';

export const FitnessFunctionTableRow: FC<IFitnessFunctionTableRow> = ({ fitnessFunction }) => {
    const navigate = useNavigate();
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<FitnessFunctionStatus | null>(null);
    const { modalOpened, openModal, closeModal } = useModal();

    const { mutateAsync: postFitnessFunctionStatus, isPending: isStatusChanging } =
        usePostFitnessFunctionStatusMutation();

    const currentStatus = fitnessFunction.status as FitnessFunctionStatus;
    const isEditable = currentStatus !== FitnessFunctionStatus.TEST;

    const handleStatusSelect = (status: FitnessFunctionStatus) => {
        setPendingStatus(status);
        openModal();
    };

    const handleConfirmStatusChange = async () => {
        if (!pendingStatus) {
            return;
        }

        await postFitnessFunctionStatus({ code: fitnessFunction.code, status: pendingStatus });
        setIsEditingStatus(false);
        closeModal();
        setPendingStatus(null);
    };

    const handleCloseStatusDialog = () => {
        closeModal();
        setPendingStatus(null);
    };

    const handleEditClick = () => {
        navigate({
            pathname: `${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}${R.ADD_PATH}`,
            search: new URLSearchParams({ id: String(fitnessFunction.id) }).toString(),
        });
    };

    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const showDescriptionTooltip = useShowTooltip(descriptionRef);

    const applicabilityRef = useRef<HTMLParagraphElement>(null);
    const showApplicabilityTooltip = useShowTooltip(applicabilityRef);

    const statusEditorRef = useRef<HTMLDivElement>(null);

    useOutsideClick(statusEditorRef, isEditingStatus, setIsEditingStatus);

    return (
        <>
            <TableRow>
                <TableData>{fitnessFunction.code}</TableData>
                <TableData>
                    <S.OverflowContainer
                        ref={descriptionRef}
                        data-tooltip-id={`description-${fitnessFunction.id}`}
                    >
                        {formatNullableString(fitnessFunction.description)}
                    </S.OverflowContainer>
                    {showDescriptionTooltip && (
                        <TooltipContainer
                            largePadding
                            id={`description-${fitnessFunction.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {formatNullableString(fitnessFunction.description)}
                        </TooltipContainer>
                    )}
                </TableData>
                <TableData>
                    {fitnessFunctionTypeToNameMap[getFitnessFunctionType(fitnessFunction)]}
                </TableData>
                <TableData>{formatYesNo(fitnessFunction.auxiliary_check)}</TableData>
                {isEditingStatus && (
                    <S.TableDataInput>
                        <S.RelativeContainer ref={statusEditorRef}>
                            <S.StatusEditor tabIndex={0}>
                                <Badge semantic={fitnessFunctionStatusToSemanticMap[currentStatus]}>
                                    {fitnessFunctionStatusToNameMap[currentStatus]}
                                </Badge>
                            </S.StatusEditor>
                            <S.Dropdown>
                                {fitnessFunctionStatuses
                                    .filter((status) => status !== currentStatus)
                                    .map((status) => (
                                        <S.DropdownItem
                                            key={status}
                                            onMouseDown={() => handleStatusSelect(status)}
                                        >
                                            {fitnessFunctionStatusToNameMap[status]}
                                        </S.DropdownItem>
                                    ))}
                            </S.Dropdown>
                        </S.RelativeContainer>
                    </S.TableDataInput>
                )}
                {!isEditingStatus && (
                    <S.TableDataHovered
                        editable={isEditable}
                        onClick={() => isEditable && setIsEditingStatus(true)}
                    >
                        <S.StatusContainer>
                            <Badge semantic={fitnessFunctionStatusToSemanticMap[currentStatus]}>
                                {fitnessFunctionStatusToNameMap[currentStatus]}
                            </Badge>
                            {isEditable && <IconButton iconName={Icons.Edit} size="medium" />}
                        </S.StatusContainer>
                    </S.TableDataHovered>
                )}
                <TableData>
                    <S.OverflowContainer
                        ref={applicabilityRef}
                        data-tooltip-id={`applicability-${fitnessFunction.id}`}
                    >
                        {formatNullableString(fitnessFunction.applicability)}
                    </S.OverflowContainer>
                    {showApplicabilityTooltip && (
                        <TooltipContainer
                            largePadding
                            id={`applicability-${fitnessFunction.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {formatNullableString(fitnessFunction.applicability)}
                        </TooltipContainer>
                    )}
                </TableData>
                <TableData>
                    <S.ButtonsContainer>
                        <IconButton
                            iconName={Icons.Edit}
                            size="medium"
                            data-tooltip-id={`edit-${fitnessFunction.id}`}
                            onClick={handleEditClick}
                        />
                        <TooltipContainer
                            noArrow
                            // @ts-ignore Ошибка в .d.ts
                            place="top-end"
                            offset={8}
                            id={`edit-${fitnessFunction.id}`}
                        >
                            Редактировать
                        </TooltipContainer>
                    </S.ButtonsContainer>
                </TableData>
            </TableRow>
            <Dialog
                title="Смена статуса"
                opened={modalOpened}
                onClose={handleCloseStatusDialog}
                onConfirm={handleConfirmStatusChange}
                isPending={isStatusChanging}
                confirmText="Сменить"
            >
                Смена статуса с Trial на Adopt и обратно не требует повторного тестирования. Если же
                статус был изменён на Test, а затем потребовался переход на Trial, повторное
                тестирование необходимо
            </Dialog>
        </>
    );
};
