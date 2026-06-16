import React, { FC } from 'react';

import { IconButton } from 'components/ui';
import { Button, TextArea, TextField } from 'components/ui';

import { useUpdateCJStepMutation } from 'api/queries/cj';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { Stage } from '../../types';
import * as S from '../../units';

import emptyBox from '../../images/empty-box.png';

import { BiItem } from './components';
import { IStepSettings } from './types';

export const StepSettings: FC<IStepSettings> = ({
    step,
    onClose,
    setStage,
    setSelectedBiId,
    name,
    setName,
    description,
    setDescription,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { mutateAsync: updateStep, isPending: updatingStep } = useUpdateCJStepMutation();

    const handleSave = async () => {
        await updateStep({
            stepId: String(step.id),
            data: { name, order: step.order, description },
        });
        showSnackbar({ message: 'Изменения сохранены' });
        onClose();
    };

    return (
        <S.FlexContainer>
            <S.Content hasButtons>
                <S.FlexWrapper>
                    <S.SideBlockTitle>Настройка этапа</S.SideBlockTitle>

                    <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                </S.FlexWrapper>

                <S.TextFieldContainer>
                    <TextField
                        fullWidth
                        value={name}
                        label="Название"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextArea
                        fullWidth
                        value={description}
                        label="Описание этапа"
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={300}
                        helperText={`${description.length}/300`}
                    />
                </S.TextFieldContainer>

                <S.SubtitleFlexWrapper>
                    <S.Subtitle>BI для этапа</S.Subtitle>

                    <Button variant="plain" size="large" onClick={() => setStage(Stage.BISEARCH)}>
                        {' '}
                        Добавить BI
                    </Button>
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
            </S.Content>

            <S.ButtonsContainer>
                <Button onClick={onClose}>Отменить</Button>

                <Button onClick={handleSave} disabled={updatingStep} variant="contained">
                    Сохранить
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
