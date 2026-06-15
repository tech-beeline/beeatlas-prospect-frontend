import React, { FC, useRef } from 'react';
import { BIForm, dataToFormValues, formValuesToData } from 'features/cx';
import { FormValues } from 'features/cx/components/BIForm/form';
import { BIFormRef } from 'features/cx/components/BIForm/types';

import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { useGetBIByIdQuery, useUpdateBIMutation } from 'api/queries/bi';
import { Icons } from 'styles/design-tokens/js/iconfont';
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
    const formRef = useRef<BIFormRef>(null);
    const saveModeRef = useRef<'draft' | 'publish'>('draft');
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data } = useGetBIByIdQuery(selectedBiId ? String(selectedBiId) : null);
    const { mutateAsync: updateBi } = useUpdateBIMutation();

    const handleSave = async (values: FormValues, draft: boolean) => {
        if (selectedBiId && data) {
            await updateBi({
                id: String(selectedBiId),
                data: { ...formValuesToData(values), draft },
            });
            showSnackbar({
                message: 'Изменения сохранены',
            });
            setStage(previousStage);
        }
    };

    return (
        <S.FlexContainer>
            <S.Content hasButtons column>
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
                    showButtons={false}
                    ref={formRef}
                    onClose={() => setStage(previousStage)}
                    onSave={async (values) => {
                        const isDraft = saveModeRef.current === 'draft';
                        await handleSave(values, isDraft);
                    }}
                    defaultValues={data ? dataToFormValues(data) : undefined}
                />
            </S.Content>
            <S.ButtonsContainer column>
                <Button
                    onClick={async () => {
                        saveModeRef.current = 'publish';
                        formRef.current?.onSubmit();
                    }}
                    variant="contained"
                >
                    Опубликовать
                </Button>
                <Button
                    onClick={async () => {
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
