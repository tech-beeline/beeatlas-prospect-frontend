import React, { FC, useEffect, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { BI, useMockCJtore } from 'pages/CJPage/mocks';

import { BIForm } from '../BIForm';
import { SideBlock } from '../SideBlock';

import { BiSelect, BiView, StepSettings } from './components';
import { IStepForm, Stage } from './types';
import * as S from './units';

export const StepForm: FC<IStepForm> = ({
    defaultName,
    isOpen,
    updateStep,
    onClose,
    initialBIs,
}) => {
    const { createBi, updateBi, getBiById } = useMockCJtore();

    const [name, setName] = useState(defaultName);
    const [stage, setStage] = useState<Stage>(Stage.SETTINGS);
    const [selectedBiId, setSelectedBiId] = useState<number | null>(null);
    const selectedBi = getBiById(selectedBiId ?? -1);
    const [stepBIs, setStepBIs] = useState(initialBIs);

    useEffect(() => {
        setStepBIs(initialBIs);
    }, [initialBIs]);

    useEffect(() => {
        setName(defaultName);
    }, [defaultName]);

    const addBI = (bi: BI) => {
        setStepBIs([...stepBIs, bi]);
    };

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
                    name={name}
                    setName={setName}
                    stepBIs={stepBIs}
                    setStepBIs={setStepBIs}
                    onClose={handleCloseClick}
                    updateStep={updateStep}
                    setSelectedBiId={setSelectedBiId}
                    setStage={setStage}
                />
            )}
            {stage === Stage.BISEARCH && (
                <BiSelect setStage={setStage} setSelectedBiId={setSelectedBiId} />
            )}
            {stage === Stage.BIVIEW && selectedBiId && (
                <BiView setStage={setStage} selectedBiId={selectedBiId} addBi={addBI} />
            )}
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
                </>
            )}
        </SideBlock>
    );
};
