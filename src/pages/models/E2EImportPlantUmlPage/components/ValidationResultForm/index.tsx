import React, { FC } from 'react';
import { PlantUmlValidationResult } from 'features/e2e';

import { Button } from 'components/ui';

import { IValidationResultForm } from './types';
import * as S from './units';

export const ValidationResultForm: FC<IValidationResultForm> = ({ result, onBack, onSave }) => {
    return (
        <S.Form
            onSubmit={(event) => {
                event.preventDefault();
                void onSave();
            }}
        >
            <PlantUmlValidationResult result={result} />

            <S.Footer>
                <Button type="button" variant="outlined" size="medium" onClick={onBack}>
                    Назад
                </Button>
                <Button type="submit" variant="contained" size="medium" disabled={!result.valid}>
                    Сохранить
                </Button>
            </S.Footer>
        </S.Form>
    );
};
