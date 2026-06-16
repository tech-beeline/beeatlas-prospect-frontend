import React, { FC, useRef } from 'react';
import { BIForm, formValuesToData } from 'features/cx';
import { BIFormRef } from 'features/cx/components/BIForm/types';

import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { useCreateBIMutation } from 'api/queries/bi';
import { useUpdateCJStepBIsMutation } from 'api/queries/cj';
import { Icons } from 'styles/design-tokens/js/iconfont';
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
    const formRef = useRef<BIFormRef>(null);
    const saveModeRef = useRef<'draft' | 'publish'>('draft');
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: createBi } = useCreateBIMutation();
    const { mutateAsync: updateStepBis } = useUpdateCJStepBIsMutation();

    return (
        <S.FlexContainer>
            <S.Content hasButtons column>
                <S.FlexWrapper>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(Stage.BISEARCH)}
                        />
                        <S.SideBlockTitle>Создать BI</S.SideBlockTitle>
                    </S.TitleFlexWrapper>
                    <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                </S.FlexWrapper>
                <BIForm
                    showButtons={false}
                    ref={formRef}
                    onClose={() => setStage(Stage.SETTINGS)}
                    onSave={async (values) => {
                        const isDraft = saveModeRef.current === 'draft';

                        const { biId } = await createBi({
                            ...formValuesToData(values),
                            draft: isDraft,
                            productId,
                        });

                        await updateStepBis({
                            stepId: String(stepId),
                            data: { id_bi: Number(biId), order: stepBisLength },
                        });

                        showSnackbar({
                            message: isDraft
                                ? 'BI сохранён как черновик'
                                : 'BI опубликован и добавлен в этап',
                        });
                    }}
                />
            </S.Content>
            <S.ButtonsContainer column>
                <Button
                    variant="contained"
                    onClick={() => {
                        saveModeRef.current = 'publish';
                        formRef.current?.onSubmit();
                    }}
                >
                    Опубликовать
                </Button>

                <Button
                    onClick={() => {
                        saveModeRef.current = 'draft';
                        formRef.current?.onSubmit();
                    }}
                >
                    Сохранить как черновик
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
