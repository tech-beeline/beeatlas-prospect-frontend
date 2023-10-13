import React, { FC } from 'react';
import { Button, IconButton, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Stage } from '../../types';
import * as S from '../../units';

import emptyBox from './images/empty-box.png';

import { BiItem } from './components';
import { IStepSettings } from './types';

export const StepSettings: FC<IStepSettings> = ({
    onClose,
    setStage,
    setSelectedBiId,
    name,
    setName,
    stepBIs,
    setStepBIs,
    updateStep,
}) => {
    const handleSave = () => {
        updateStep(name, stepBIs);
        onClose();
    };

    const moveBi = (index: number, up: boolean) => {
        const copyOfData = [...stepBIs];
        const temp = copyOfData[index];

        if (!up) {
            copyOfData[index] = copyOfData[index + 1];
            copyOfData[index + 1] = temp;
        } else {
            copyOfData[index] = copyOfData[index - 1];
            copyOfData[index - 1] = temp;
        }

        setStepBIs(copyOfData);
    };

    const removeBI = (id: number) => {
        setStepBIs(stepBIs.filter((bi) => bi.id !== id));
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

                {stepBIs.length === 0 && (
                    <S.EmptyState>
                        <img src={emptyBox} />
                        <S.Subtitle3Inactive>Добавьте первый BI</S.Subtitle3Inactive>
                    </S.EmptyState>
                )}

                {stepBIs.map((bi, index) => (
                    <BiItem
                        key={bi.id}
                        bi={bi}
                        index={index}
                        totalLength={stepBIs.length}
                        setSelectedBiId={setSelectedBiId}
                        setStage={setStage}
                        removeBi={removeBI}
                        moveBi={moveBi}
                    />
                ))}
            </div>

            <S.ButtonsContainer>
                <Button onClick={onClose}>Отменить</Button>

                <Button onClick={handleSave} variant="contained">
                    Сохранить
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
