import React, { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { ButtonGroup } from 'components/ui';

import { E2EContentOptions } from '../../types';

import { CJData, E2EData } from './components';
import { ISideMenu } from './types';
import * as S from './units';

export const SideMenu: FC<ISideMenu> = ({
    activeTreeItem,
    activeBiStep,
    treeData,
    flatTreeData,
    biSteps,
    isLoading,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    const contentOption = useMemo(() => {
        return (tab as E2EContentOptions) ?? E2EContentOptions.CJ;
    }, [tab]);

    const handleButtonClick = (option: E2EContentOptions) => {
        setSearchParams(new URLSearchParams({ tab: option as E2EContentOptions }));
    };

    return (
        <S.SideMenuContainer>
            <S.ResizableStyled
                enable={{ right: true }}
                defaultSize={{
                    width: 410,
                    height: 'calc(100vh - 64px)',
                }}
                minWidth={340}
                maxWidth={640}
            >
                <S.FiltersContainer>
                    <Text variant="h5">Каталог E2E сценариев</Text>
                    <ButtonGroup
                        alwaysSelected
                        fullWidth
                        selectedOption={{ id: contentOption }}
                        size="small"
                        options={[
                            {
                                id: E2EContentOptions.CJ,
                                label: `CJ`,
                            },
                            {
                                id: E2EContentOptions.E2E,
                                label: `E2E`,
                            },
                        ]}
                        type="secondary"
                        onChange={(option) => handleButtonClick(option.id as E2EContentOptions)}
                    />
                </S.FiltersContainer>
                {contentOption === E2EContentOptions.CJ && (
                    <CJData
                        activeTreeItem={activeTreeItem}
                        treeData={treeData}
                        flatTreeData={flatTreeData}
                        isLoading={isLoading}
                    />
                )}
                {contentOption === E2EContentOptions.E2E && (
                    <E2EData activeBiStep={activeBiStep} biSteps={biSteps} isLoading={isLoading} />
                )}
            </S.ResizableStyled>
        </S.SideMenuContainer>
    );
};
