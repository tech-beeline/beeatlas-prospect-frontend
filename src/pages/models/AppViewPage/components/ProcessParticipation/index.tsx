import React, { FC, useState } from 'react';

import { ButtonGroup } from 'components/ui';

import { E2EStepsTable, UseCasesTable } from './components';
import { PARTICIPATION_VIEW_OPTIONS, ParticipationView } from './const';
import { IProcessParticipation } from './types';
import * as S from './units';

export const ProcessParticipation: FC<IProcessParticipation> = ({ cmdb }) => {
    const [view, setView] = useState<ParticipationView>(ParticipationView.E2E);

    return (
        <S.Container>
            <S.Toolbar>
                <S.ViewSwitcher>
                    <ButtonGroup
                        alwaysSelected
                        size="small"
                        selectedOption={{ id: view }}
                        options={PARTICIPATION_VIEW_OPTIONS}
                        onChange={(option) => setView(option.id as ParticipationView)}
                    />
                </S.ViewSwitcher>
            </S.Toolbar>
            {view === ParticipationView.E2E && <E2EStepsTable cmdb={cmdb} />}
            {view === ParticipationView.USE_CASE && <UseCasesTable cmdb={cmdb} />}
        </S.Container>
    );
};
