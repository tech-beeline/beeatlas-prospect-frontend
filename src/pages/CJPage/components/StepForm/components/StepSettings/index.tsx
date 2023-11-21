import React, { FC } from 'react';
import { Button, IconButton, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useUpdateCJStepMutation } from 'api/queries/cj';
import { useSnackbarStore } from 'widgets/Snackbar';

import { Stage } from '../../types';
import * as S from '../../units';

import emptyBox from './images/empty-box.png';

import { BiItem } from './components';
import { IStepSettings } from './types';

export const StepSettings: FC<IStepSettings> = ({
    cjId,
    step,
    onClose,
    setStage,
    setSelectedBiId,
    name,
    setName,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { mutateAsync: updateStep, isLoading: updatingStep } = useUpdateCJStepMutation();

    const handleSave = async () => {
        await updateStep({
            cjId: String(cjId),
            stepId: String(step.id),
            data: { name, order: step.order },
        });
        showSnackbar({ message: 'Изменения сохранены' });
        onClose();
    };

    return (
        <S.FlexContainer>
            <div>
                <S.FlexWrapper>
                    <S.SideBlockTitle>Настройка шага</S.SideBlockTitle>

                    <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                </S.FlexWrapper>

                <S.TextFieldContainer>
                    <TextField
                        fullWidth
                        value={name}
                        label="Название"
                        onChange={(e) => setName(e.target.value)}
                    />
                </S.TextFieldContainer>

                <S.SubtitleFlexWrapper>
                    <S.Subtitle>BI для шага</S.Subtitle>

                    <IconButton
                        iconName={Icons.Add}
                        size="large"
                        onClick={() => setStage(Stage.BISEARCH)}
                    />
                </S.SubtitleFlexWrapper>

                {step.bi.length === 0 && (
                    <S.EmptyState>
                        <img src={emptyBox} />
                        <S.Subtitle3Inactive>Добавьте первый BI</S.Subtitle3Inactive>
                    </S.EmptyState>
                )}

                {step.bi.map((bi, index) => (
                    <BiItem
                        stepId={step.id}
                        key={bi.id}
                        bi={bi}
                        index={index}
                        totalLength={step.bi.length}
                        setSelectedBiId={setSelectedBiId}
                        setStage={setStage}
                    />
                ))}
            </div>

            <S.ButtonsContainer>
                <Button onClick={onClose}>Отменить</Button>

                <Button onClick={handleSave} disabled={updatingStep} variant="contained">
                    Сохранить
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
