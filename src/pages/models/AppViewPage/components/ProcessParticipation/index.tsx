import React, { FC, useState } from 'react';

import { ButtonGroup, Search } from 'components/ui';

import { E2EStepsTable, UseCasesTable } from './components';
import { PARTICIPATION_VIEW_OPTIONS, ParticipationView, SEARCH_PLACEHOLDERS } from './const';
import { IProcessParticipation } from './types';
import * as S from './units';

export const ProcessParticipation: FC<IProcessParticipation> = ({ cmdb }) => {
    const [view, setView] = useState<ParticipationView>(ParticipationView.E2E);
    const [search, setSearch] = useState('');

    return (
        <S.Container>
            <S.Toolbar>
                <S.ViewSwitcher>
                    <ButtonGroup
                        alwaysSelected
                        size="small"
                        type="secondary"
                        selectedOption={{ id: view }}
                        options={PARTICIPATION_VIEW_OPTIONS}
                        onChange={(option) => setView(option.id as ParticipationView)}
                    />
                </S.ViewSwitcher>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        value={search}
                        placeholder={SEARCH_PLACEHOLDERS[view]}
                        onChange={(event) => setSearch(event.target.value)}
                        onClear={() => setSearch('')}
                    />
                </S.SearchContainer>
            </S.Toolbar>
            {view === ParticipationView.E2E && <E2EStepsTable cmdb={cmdb} search={search} />}
            {view === ParticipationView.USE_CASE && <UseCasesTable cmdb={cmdb} search={search} />}
        </S.Container>
    );
};
