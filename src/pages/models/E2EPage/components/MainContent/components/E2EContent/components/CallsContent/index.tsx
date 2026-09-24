import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCallsTreeData } from 'features/e2e';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Icon, Skeleton } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { CallTreeItem } from './components';
import { ICallsContent } from './types';
import * as S from './units';

export const CallsContent: FC<ICallsContent> = ({ data, isLoading }) => {
    const callsTree = formatCallsTreeData(data);

    const navigate = useNavigate();

    const isSparx = data && data.e2e.source === 'SPARX';

    return (
        <>
            {isLoading && <Skeleton radius={12} height={100} />}
            {data && data.operationsRelations.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Нет данных"
                        text={isSparx ? '' : 'Импортируйте PlantUml в созданный E2E '}
                        buttonText={isSparx ? undefined : 'Импорт PlantUml'}
                        buttonProps={
                            isSparx
                                ? undefined
                                : {
                                      startIcon: <Icon iconName={Icons.Import} />,
                                      onClick: () =>
                                          navigate(
                                              `${R.MODELS_PATH}${R.E2E_PATH}${
                                                  R.IMPORT_PATH
                                              }?${new URLSearchParams({
                                                  code: data.e2e.code,
                                                  id: String(data.e2e.id),
                                              }).toString()}`,
                                          ),
                                  }
                        }
                    />
                </S.NotFoundContainer>
            )}
            {data && data.operationsRelations.length !== 0 && (
                <>
                    <Text variant="subtitle3">Последовательность вызовов ({data.e2e.source})</Text>
                    <S.CallsContainer>
                        {callsTree.map((item) => (
                            <CallTreeItem key={item.id} item={item} level={0} />
                        ))}
                    </S.CallsContainer>
                </>
            )}
        </>
    );
};
