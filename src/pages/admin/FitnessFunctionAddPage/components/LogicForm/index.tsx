import React, { FC } from 'react';

import { AsyncMethodForm, ScriptForm, SyncMethodForm } from './components';
import { ILogicForm } from './types';

export const LogicForm: FC<ILogicForm> = ({ setStepVariant, savedData, setSavedData }) => {
    return (
        <>
            {savedData.type === 0 && (
                <ScriptForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
            {savedData.type === 1 && (
                <SyncMethodForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
            {savedData.type === 2 && (
                <AsyncMethodForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
        </>
    );
};
