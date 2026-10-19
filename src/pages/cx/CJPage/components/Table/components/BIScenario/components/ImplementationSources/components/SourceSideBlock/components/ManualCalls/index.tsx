import React, { FC, useState } from 'react';

import { TooltipContainer as HoverTooltip } from 'components/interaction';
import { IconButton } from 'components/ui';

import { useUpdateBIStepRelations } from 'api/queries/bi';
import { buildRelationsRemoval } from 'pages/cx/CJPage/components/BIEditScenario/utils';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CallCard } from '../CallCard';

import { IManualCalls } from './types';
import * as S from './units';
import { canShowSequenceDiagram, getManualCallFields } from './utils';

export const ManualCalls: FC<IManualCalls> = ({ relations, biStepId, onOpenDiagram, onEdit }) => {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const { mutateAsync, isPending } = useUpdateBIStepRelations();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleDelete = async () => {
        if (deletingId === null || isPending) return;
        try {
            await mutateAsync({
                id: String(biStepId),
                data: buildRelationsRemoval(relations, deletingId),
            });
            setDeletingId(null);
            showSnackbar({ message: 'Вызов удален' });
        } catch {
            showSnackbar({ message: 'Не удалось удалить вызов' });
        }
    };

    return (
        <>
            <S.CallsList>
                {relations.map((relation, index) => (
                    <CallCard
                        key={relation.id}
                        title={
                            relation.description ||
                            relation.tcName ||
                            relation.operation ||
                            relation.interfaceName ||
                            relation.productName ||
                            `Вызов ${index + 1}`
                        }
                        fields={getManualCallFields(relation)}
                        actions={
                            <>
                                <IconButton
                                    aria-label="Удалить вызов"
                                    title="Удалить вызов"
                                    variant="outlined"
                                    iconName={Icons.Delete}
                                    size="medium"
                                    disabled={isPending}
                                    onClick={() => setDeletingId(relation.id)}
                                />
                                <IconButton
                                    aria-label="Просмотр диаграммы"
                                    data-tooltip-id={`source-sequence-diagram-${relation.id}`}
                                    variant="outlined"
                                    iconName={Icons.GraphDown}
                                    size="medium"
                                    disabled={isPending || !canShowSequenceDiagram(relation)}
                                    onClick={() => onOpenDiagram(relation)}
                                />
                                <HoverTooltip
                                    id={`source-sequence-diagram-${relation.id}`}
                                    offset={8}
                                    place="bottom"
                                    noArrow
                                >
                                    Просмотр диаграммы последовательности
                                </HoverTooltip>
                                <IconButton
                                    aria-label="Редактировать вызов"
                                    title="Редактировать вызов"
                                    variant="outlined"
                                    iconName={Icons.Edit}
                                    size="medium"
                                    disabled={isPending}
                                    onClick={() => onEdit(relation.id)}
                                />
                            </>
                        }
                    />
                ))}
            </S.CallsList>
            <Dialog
                opened={deletingId !== null}
                title="Удалить вызов?"
                confirmText="Удалить"
                onConfirm={handleDelete}
                onClose={() => {
                    if (!isPending) setDeletingId(null);
                }}
                isPending={isPending}
            >
                Удалённый вызов нельзя будет восстановить
            </Dialog>
        </>
    );
};
