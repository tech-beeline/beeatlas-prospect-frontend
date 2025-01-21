import React, { FC, useEffect, useState } from 'react';

import { SideBlock } from 'components/containers';

import { BiCreate, BiEdit, BiSelect, BiView, StepSettings } from './components';
import { IStepForm, Stage } from './types';

export const StepForm: FC<IStepForm> = ({ productId, cjId, step, isOpen, onClose }) => {
    const [stage, setStage] = useState<Stage>(Stage.SETTINGS);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBiId, setSelectedBiId] = useState<number | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setName(step.name);
            setDescription(step.description ?? '');
        }
    }, [isOpen, step]);

    useEffect(() => {
        setName(step.name);
        setDescription(step.description ?? '');
    }, [step.id]);

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
                    description={description}
                    setDescription={setDescription}
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
                    onClose={handleCloseClick}
                />
            )}
            {stage === Stage.BIVIEW && selectedBiId && (
                <BiView
                    stepId={step.id ?? 0}
                    stepBisLength={step.bi.length}
                    setStage={setStage}
                    selectedBiId={selectedBiId}
                    onClose={handleCloseClick}
                />
            )}
            {stage === Stage.SELECTEDBIVIEW && selectedBiId && (
                <BiView
                    biSelected
                    stepId={step.id ?? 0}
                    stepBisLength={step.bi.length}
                    setStage={setStage}
                    selectedBiId={selectedBiId}
                    previousStage={Stage.SETTINGS}
                    onClose={handleCloseClick}
                />
            )}
            {stage === Stage.BIEDIT && (
                <BiEdit
                    selectedBiId={selectedBiId}
                    setStage={setStage}
                    onClose={handleCloseClick}
                />
            )}
            {stage === Stage.SELECTEDBIEDIT && (
                <BiEdit
                    selectedBiId={selectedBiId}
                    setStage={setStage}
                    onClose={handleCloseClick}
                    previousStage={Stage.SELECTEDBIVIEW}
                />
            )}
            {stage === Stage.BICREATE && (
                <BiCreate
                    productId={productId}
                    stepId={step.id}
                    stepBisLength={step.bi.length}
                    setStage={setStage}
                    onClose={handleCloseClick}
                />
            )}
        </SideBlock>
    );
};
