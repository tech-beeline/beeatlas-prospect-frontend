import React, { FC } from 'react';

import { AsyncMethodForm, ScriptForm, SyncMethodForm } from './components';
import { ITestForm } from './types';
import * as S from './units';

export const TestForm: FC<ITestForm> = ({ setStepVariant, savedData, setSavedData, paramId }) => {
    return (
        <S.Container>
            {savedData.type === 0 && (
                <ScriptForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                    paramId={paramId}
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
        </S.Container>
    );
};
