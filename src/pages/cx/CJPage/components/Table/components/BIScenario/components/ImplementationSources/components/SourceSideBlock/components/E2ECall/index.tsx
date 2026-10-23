import React, { FC, useState } from 'react';

import { useGetProductStructurizrContainerByCmdbQuery } from 'api/queries/product';

import { CallCard } from '../CallCard';

import { IE2ECall } from './types';
import { getE2ECallFields } from './utils';

export const E2ECall: FC<IE2ECall> = ({ call, index }) => {
    const [expanded, setExpanded] = useState(false);
    const { data, isLoading, isError } = useGetProductStructurizrContainerByCmdbQuery(
        expanded && call.operationId !== null ? call.operation?.productAlias : null,
    );

    return (
        <CallCard
            title={call.operation?.name || `Вызов ${index + 1}`}
            fields={getE2ECallFields(call, data, isLoading, isError)}
            onExpandedChange={setExpanded}
        />
    );
};
