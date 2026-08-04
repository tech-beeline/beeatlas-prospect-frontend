import React, { FC, useState } from 'react';

import { useGetProcessesByCmdbQuery } from 'api/queries/camunda';

import { CommonInfo, PublicationsTable } from './components';
import { DisplayOptions } from './const';
import { IGeneralInfo } from './types';
import * as S from './units';

export const GeneralInfo: FC<IGeneralInfo> = ({
    productData,
    productId,
    structurizrApiUrl,
    cmdb,
}) => {
    const [displayOption, setDisplayOption] = useState(DisplayOptions.GENERALINFO);

    const { data: processesData } = useGetProcessesByCmdbQuery(cmdb);
    const processes = processesData ?? [];

    return (
        <>
            <S.ButtonGroupMargin
                alwaysSelected
                selectedOption={{ id: displayOption }}
                size="small"
                options={[
                    {
                        id: DisplayOptions.GENERALINFO,
                        label: 'Информация о приложении',
                    },
                    {
                        id: DisplayOptions.PIPELINE,
                        label: 'Публикация pipeline ',
                    },
                ]}
                onChange={(option) => setDisplayOption(option.id as DisplayOptions)}
            />

            {displayOption === DisplayOptions.GENERALINFO ? (
                <CommonInfo
                    productData={productData}
                    structurizrApiUrl={structurizrApiUrl}
                    productId={productId}
                    processesData={processesData}
                    cmdb={cmdb}
                />
            ) : (
                <PublicationsTable data={processes} />
            )}
        </>
    );
};
