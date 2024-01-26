import React, { FC } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { BIForm, formValuesToData } from 'features/cx';

import { useCreateBIMutation } from 'api/queries/bi';
import { useUpdateCJStepBIsMutation } from 'api/queries/cj';
import { useSnackbarStore } from 'widgets/Snackbar';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiCreate } from './types';

export const BiCreate: FC<IBiCreate> = ({
    productId,
    stepId,
    stepBisLength,
    setStage,
    onClose,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: createBi } = useCreateBIMutation();
    const { mutateAsync: updateStepBis } = useUpdateCJStepBIsMutation();

    return (
        <>
            <S.FlexWrapper>
                <S.TitleFlexWrapper>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() => setStage(Stage.BISEARCH)}
                    />
                    <S.SideBlockTitle>Создание BI</S.SideBlockTitle>
                </S.TitleFlexWrapper>
                <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
            </S.FlexWrapper>
            <BIForm
                onClose={() => setStage(Stage.SETTINGS)}
                onSave={async (values) => {
                    const { biId } = await createBi({
                        ...formValuesToData(values),
                        draft: true,
                        productId,
                    });
                    await updateStepBis({
                        stepId: String(stepId),
                        data: { id_bi: Number(biId), order: stepBisLength },
                    });
                    showSnackbar({ message: 'BI создан и добавлен в шаг' });
                }}
            />
        </>
    );
};
