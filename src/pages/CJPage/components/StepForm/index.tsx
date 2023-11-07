import React, { FC, useEffect, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { IBIData } from 'api/bi/types';
// import { useCreateBIMutation, useGetBIByIdQuery, useUpdateBIMutation } from 'api/queries/bi';
// import { dataToFormValues, formValuesToData } from 'pages/BIAddPage/helpers';
import { BI, useMockBIStore } from 'pages/CJPage/mocks';

import { BIForm } from '../BIForm';
import { SideBlock } from '../SideBlock';

import { BiSelect, BiView, StepSettings } from './components';
import { IStepForm, Stage } from './types';
import * as S from './units';

export const StepForm: FC<IStepForm> = ({
    cjId,
    step,
    defaultName,
    isOpen,
    updateStep,
    onClose,
    initialBIs,
}) => {
    const { createBi, updateBi, getBiById } = useMockBIStore();

    const [name, setName] = useState(defaultName);
    const [stage, setStage] = useState<Stage>(Stage.SETTINGS);
    const [selectedBiId, setSelectedBiId] = useState<number | null>(null);
    const selectedBi = getBiById(selectedBiId ?? -1);
    const [stepBIs, setStepBIs] = useState(initialBIs);

    // const { data } = useGetBIByIdQuery(selectedBiId ? String(selectedBiId) : null);
    // const { mutateAsync: createBi } = useCreateBIMutation();
    // const { mutateAsync: updateBi } = useUpdateBIMutation();

    useEffect(() => {
        setStepBIs(initialBIs);
    }, [initialBIs]);

    useEffect(() => {
        setName(defaultName);
    }, [defaultName]);

    const addBI = (bi: BI) => {
        setStepBIs([...stepBIs, bi]);
    };

    const [newStepBIs, setNewStepBIs] = useState<IBIData[]>([]);
    // const addNewBI = (bi: IBIData) => {
    //     setNewStepBIs([...newStepBIs, bi]);
    // };

    const handleCloseClick = () => {
        onClose();
        setStage(Stage.SETTINGS);
        setStepBIs(initialBIs);
        setName(defaultName);
    };

    return (
        <SideBlock isOpen={isOpen} setOpen={handleCloseClick}>
            {stage === Stage.SETTINGS && (
                <StepSettings
                    key={String(isOpen)}
                    cjId={cjId}
                    stepId={step.id ?? 0}
                    stepOrder={step.order ?? 0}
                    name={name}
                    setName={setName}
                    stepBIs={stepBIs}
                    setStepBIs={setStepBIs}
                    newStepBis={newStepBIs}
                    setNewStepBis={setNewStepBIs}
                    onClose={handleCloseClick}
                    updateStep={updateStep}
                    setSelectedBiId={setSelectedBiId}
                    setStage={setStage}
                />
            )}
            {stage === Stage.BISEARCH && (
                <BiSelect
                    setStage={setStage}
                    setSelectedBiId={setSelectedBiId}
                    selectedBiIds={stepBIs.map((bi) => bi.id)}
                />
            )}
            {stage === Stage.BIVIEW && selectedBiId && (
                <BiView setStage={setStage} selectedBiId={selectedBiId} addBi={addBI} />
            )}
            {/* {stage === Stage.BIVIEW && selectedBiId && (
                <BiView setStage={setStage} selectedBiId={selectedBiId} addNewBi={addNewBI} />
            )} */}
            {stage === Stage.SELECTEDBIVIEW && selectedBiId && (
                <BiView
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
                        onSave={(values) => createBi(values)}
                    />
                    {/* <BIForm
                        onClose={() => setStage(Stage.BISEARCH)}
                        onSave={(values) => createBi(formValuesToData(values))}
                    /> */}
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
                        onSave={(values) => selectedBiId && updateBi(selectedBiId, values)}
                        defaultValues={selectedBi}
                    />
                    {/* <BIForm
                        onClose={() => setStage(Stage.BIVIEW)}
                        onSave={(values) =>
                            selectedBiId &&
                            updateBi({ id: String(selectedBiId), data: formValuesToData(values) })
                        }
                        defaultValues={data ? dataToFormValues(data) : undefined}
                    /> */}
                </>
            )}
        </SideBlock>
    );
};
