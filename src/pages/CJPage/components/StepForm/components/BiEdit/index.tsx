import React, { FC } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { BIForm, dataToFormValues, formValuesToData } from 'features/cx';

import { useGetBIByIdQuery, useUpdateBIMutation } from 'api/queries/bi';
import { useSnackbarStore } from 'widgets/Snackbar';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiEdit } from './types';

export const BiEdit: FC<IBiEdit> = ({
    selectedBiId,
    setStage,
    onClose,
    previousStage = Stage.BIVIEW,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data } = useGetBIByIdQuery(selectedBiId ? String(selectedBiId) : null);
    const { mutateAsync: updateBi } = useUpdateBIMutation();

    return (
        <>
            <S.FlexWrapper>
                <S.TitleFlexWrapper>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() => setStage(previousStage)}
                    />
                    <S.SideBlockTitle>Редактирование BI</S.SideBlockTitle>
                </S.TitleFlexWrapper>
                <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
            </S.FlexWrapper>
            <BIForm
                onClose={() => setStage(previousStage)}
                onSave={async (values) => {
                    if (selectedBiId && data) {
                        await updateBi({
                            id: String(selectedBiId),
                            data: { ...formValuesToData(values), draft: data.draft },
                        });
                        showSnackbar({ message: 'Изменения сохранены' });
                    }
                }}
                defaultValues={data ? dataToFormValues(data) : undefined}
            />
        </>
    );
};
