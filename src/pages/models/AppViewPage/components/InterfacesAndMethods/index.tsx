import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { NotFoundBlock } from 'components/other';

import { getEntityParent } from 'api/product';
import { useGetUserInfoQuery } from 'api/queries/profile';
import { useModal } from 'hooks';

import { CreateStructurizrWorkspaceSideblock, MapicTable, StructurizrTable } from './components';
import { InterfaceOptions } from './const';
import { IInterfacesAndMethods } from './types';
import * as S from './units';

export const InterfacesAndMethods: FC<IInterfacesAndMethods> = ({
    cmdb,
    structurizrApiUrl,
    productId,
}) => {
    const [params, setParams] = useSearchParams();
    const paramSubtab = params.get('subtab');
    const paramId = params.get('id');
    const paramType = params.get('type');

    const [interfaceOption, setInterfaceOption] = useState(InterfaceOptions.STRUCTURIZR);

    useEffect(() => {
        if (Object.values(InterfaceOptions).includes(paramSubtab as InterfaceOptions)) {
            setInterfaceOption(paramSubtab as InterfaceOptions);
        }
    }, [paramSubtab]);

    const { openModal, closeModal, modalOpened } = useModal();

    const { data: userInfoData } = useGetUserInfoQuery();

    useEffect(() => {
        (async () => {
            if (paramId && paramType && !cmdb) {
                const data = await getEntityParent(paramId, paramType).then((res) => res.data);
                setParams({ ...Object.fromEntries(params), cmdb: data.alias });
            }
        })();
    }, [paramId, paramType, cmdb]);

    return (
        <S.Container>
            {cmdb &&
            structurizrApiUrl === null &&
            (userInfoData?.productsIds ?? []).includes(productId) ? (
                <>
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            title="Чтобы получить доступ ко всем данным приложения, создайте рабочее пространство"
                            text="Данные будут перенесены из Structurizr"
                            buttonText="Создать"
                            buttonProps={{ onClick: openModal }}
                        />
                    </S.NotFoundContainer>
                    <CreateStructurizrWorkspaceSideblock
                        isOpen={modalOpened}
                        onClose={closeModal}
                        cmdb={cmdb}
                    />
                </>
            ) : (
                <>
                    {cmdb && interfaceOption === InterfaceOptions.STRUCTURIZR && (
                        <StructurizrTable interfaceOption={interfaceOption} cmdb={cmdb} />
                    )}

                    {cmdb && interfaceOption === InterfaceOptions.MAPIC && (
                        <MapicTable interfaceOption={interfaceOption} cmdb={cmdb} />
                    )}
                </>
            )}
        </S.Container>
    );
};
