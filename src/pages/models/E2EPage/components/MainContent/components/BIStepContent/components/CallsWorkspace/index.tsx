import React, { FC, useEffect, useState } from 'react';

import { CallDetailsPanel, CallTreeRow } from './components';
import { ICallsWorkspace } from './types';
import * as S from './units';
import { findCall } from './utils';

export const CallsWorkspace: FC<ICallsWorkspace> = ({ calls }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        setSelectedId(null);
    }, [calls]);

    return (
        <S.Panels>
            <S.TreePanel>
                {calls.map((call) => (
                    <CallTreeRow
                        key={call.id}
                        call={call}
                        level={0}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                ))}
            </S.TreePanel>
            <CallDetailsPanel call={findCall(calls, selectedId)} />
        </S.Panels>
    );
};
