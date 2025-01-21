import React, { FC, useRef } from 'react';
import { Button, IconButton } from '@beeline/design-system-react';
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
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: createBi } = useCreateBIMutation();
    const { mutateAsync: updateStepBis } = useUpdateCJStepBIsMutation();

    return (
        <S.FlexContainer>
            <S.Content hasButtons>
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
                    showButtons={false}
                    ref={submitButtonRef}
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
                        showSnackbar({ message: 'BI создан и добавлен в этап' });
                    }}
                />
            </S.Content>
            <S.ButtonsContainer>
                <Button onClick={() => setStage(Stage.BISEARCH)}>Отменить</Button>

                <Button onClick={() => submitButtonRef.current?.click()} variant="contained">
                    Сохранить
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
