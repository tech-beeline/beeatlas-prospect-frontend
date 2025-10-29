import React, { FC, useState } from 'react';

import { NotFoundBlock } from 'components/other';

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
    const [interfaceOption, setInterfaceOption] = useState(InterfaceOptions.STRUCTURIZR);

    const { openModal, closeModal, modalOpened } = useModal();

    const { data: userInfoData } = useGetUserInfoQuery();

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
                        <StructurizrTable
                            interfaceOption={interfaceOption}
                            setInterfaceOption={setInterfaceOption}
                            cmdb={cmdb}
                        />
                    )}

                    {cmdb && interfaceOption === InterfaceOptions.MAPIC && (
                        <MapicTable
                            interfaceOption={interfaceOption}
                            setInterfaceOption={setInterfaceOption}
                            cmdb={cmdb}
                        />
                    )}
                </>
            )}
        </S.Container>
    );
};
