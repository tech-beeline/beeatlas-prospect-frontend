import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Tab, Tabs } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';

import { CallsContent, RelatedCJs } from './components';
import { TABS, TabVariants } from './const';
import { IE2EContent } from './types';
import * as S from './units';
import { formatTabLabel } from './utils';

export const E2EContent: FC<IE2EContent> = ({ activeBiStep }) => {
    const [tabVariant, setTabVariant] = useState<TabVariants>(TabVariants.CALLS);

    const { data, isLoading } = useGetSequenceCallsByIdQuery(activeBiStep.uid);

    return (
        <>
            <Text variant="h4">{activeBiStep.name}</Text>
            <S.TabsContainer>
                <Tabs selectedTabIndex={TABS.findIndex((tab) => tab.id === tabVariant)}>
                    {TABS.map((tab) => (
                        <Tab
                            key={tab.id}
                            label={formatTabLabel(tab.id, data)}
                            value={tab.id}
                            onClick={() => setTabVariant(tab.id)}
                        />
                    ))}
                </Tabs>
            </S.TabsContainer>
            {tabVariant === TabVariants.CALLS && <CallsContent data={data} isLoading={isLoading} />}
            {tabVariant === TabVariants.RELATED_CJS && (
                <RelatedCJs data={data} isLoading={isLoading} />
            )}
        </>
    );
};
