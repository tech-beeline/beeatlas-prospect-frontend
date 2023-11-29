import React, { FC, useEffect, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { BIForm, dataToFormValues, formValuesToData } from 'features/cx';

import { SideBlock } from 'components/containers';

import { useCreateBIMutation, useGetBIByIdQuery, useUpdateBIMutation } from 'api/queries/bi';

import { BiSelect, BiView, StepSettings } from './components';
import { IStepForm, Stage } from './types';
import * as S from './units';

export const StepForm: FC<IStepForm> = ({ cjId, step, isOpen, onClose }) => {
    const [stage, setStage] = useState<Stage>(Stage.SETTINGS);
    const [name, setName] = useState('');
    const [selectedBiId, setSelectedBiId] = useState<number | null>(null);

    const { data } = useGetBIByIdQuery(selectedBiId ? String(selectedBiId) : null);
    const { mutateAsync: createBi } = useCreateBIMutation();
    const { mutateAsync: updateBi } = useUpdateBIMutation();

    useEffect(() => {
        setName(step.name);
    }, [step]);

    const handleCloseClick = () => {
        onClose();
        setStage(Stage.SETTINGS);
        setName(step.name);
    };

    return (
        <SideBlock isOpen={isOpen} onClose={handleCloseClick}>
            {stage === Stage.SETTINGS && (
                <StepSettings
                    key={String(isOpen)}
                    cjId={cjId}
                    step={step}
                    name={name}
                    setName={setName}
                    onClose={handleCloseClick}
                    setSelectedBiId={setSelectedBiId}
                    setStage={setStage}
                />
            )}
            {stage === Stage.BISEARCH && (
                <BiSelect
                    setStage={setStage}
                    setSelectedBiId={setSelectedBiId}
                    selectedBiIds={step.bi.map((bi) => bi.id)}
                />
            )}
            {stage === Stage.BIVIEW && selectedBiId && (
                <BiView
                    stepId={step.id ?? 0}
                    stepBisLength={step.bi.length}
                    setStage={setStage}
                    selectedBiId={selectedBiId}
                />
            )}
            {stage === Stage.SELECTEDBIVIEW && selectedBiId && (
                <BiView
                    stepId={step.id ?? 0}
                    stepBisLength={step.bi.length}
                    setStage={setStage}
                    selectedBiId={selectedBiId}
                    showButtons={false}
                    goBackStage={Stage.SETTINGS}
                />
            )}

            {stage === Stage.BICREATE && (
                <>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(Stage.BISEARCH)}
                        />
                        <S.SideBlockTitle>Создание BI</S.SideBlockTitle>
                    </S.TitleFlexWrapper>
                    <BIForm
                        onClose={() => setStage(Stage.BISEARCH)}
                        onSave={(values) => createBi(formValuesToData(values))}
                    />
                </>
            )}
            {stage === Stage.BIEDIT && (
                <>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(Stage.BIVIEW)}
                        />
                        <S.SideBlockTitle>Редактирование BI</S.SideBlockTitle>
                    </S.TitleFlexWrapper>
                    <BIForm
                        onClose={() => setStage(Stage.BIVIEW)}
                        onSave={(values) =>
                            selectedBiId &&
                            updateBi({ id: String(selectedBiId), data: formValuesToData(values) })
                        }
                        defaultValues={data ? dataToFormValues(data) : undefined}
                    />
                </>
            )}
        </SideBlock>
    );
};
