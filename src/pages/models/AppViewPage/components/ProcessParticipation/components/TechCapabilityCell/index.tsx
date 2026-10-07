import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ITechCapabilityCell } from './types';

export const TechCapabilityCell: FC<ITechCapabilityCell> = ({ techCapability }) => {
    if (!techCapability) return <>{formatNullableString(null)}</>;

    const title = techCapability.name ?? techCapability.code ?? '';

    return (
        <div>
            {techCapability.id ? (
                <Link
                    title={title}
                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${techCapability.id}&type=TECH`}
                />
            ) : (
                <Text variant="body3">{title}</Text>
            )}
            {techCapability.name && techCapability.code && (
                <Text inactive variant="body3">
                    {techCapability.code}
                </Text>
            )}
        </div>
    );
};
