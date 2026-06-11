import React, { FC, useState } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { Button, ButtonGroup, Icon, Search, Skeleton, Switch } from 'components/ui';

import { useGetTechCapabilitiesByProductIdQuery } from 'api/queries/capability';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { TechCapabilityCard } from './components';
import { CapabilityOriginOptions, COLUMNS_LENGTH, DisplayOptions } from './const';
import { ITechCapabilities } from './types';
import * as S from './units';
import { groupDataByColumns } from './utils';

export const TechCapabilities: FC<ITechCapabilities> = ({ productId, cmdb }) => {
    const [displayOption, setDisplayOption] = useState(DisplayOptions.GRID);
    const [showWithApi, setShowWithApi] = useState(false);
    const [searchText, setSearchText] = useState('');

    const { data, isLoading } = useGetTechCapabilitiesByProductIdQuery(productId);

    const uniqueTechCapabilities = data
        ? Array.from(
              new Set([
                  ...data.implemented.map((tc) => tc.id),
                  ...data.responsibility.map((tc) => tc.id),
              ]),
          ).map((id) => {
              const implemented = data.implemented.find((tc) => tc.id === id);
              const responsibility = data.responsibility.find((tc) => tc.id === id)!;
              if (implemented) {
                  return { ...implemented, origin: CapabilityOriginOptions.IMPLEMENTED };
              } else {
                  return { ...responsibility, origin: CapabilityOriginOptions.RESPONSIBILITY };
              }
          })
        : [];

    const uniqueTechCapabilitiesFiltered = uniqueTechCapabilities.filter(
        (tc) =>
            (showWithApi ? tc.origin === CapabilityOriginOptions.IMPLEMENTED : true) &&
            (tc.name.toLowerCase().includes(searchText.toLowerCase()) ||
                tc.code.toLowerCase().includes(searchText.toLowerCase())),
    );

    const uniqueTechCapabilitiesByColumns = groupDataByColumns(
        uniqueTechCapabilitiesFiltered,
        COLUMNS_LENGTH,
    );

    return (
        <S.Container>
            <S.ActionsContainer>
                <S.FlexContainer>
                    <S.SearchContainer>
                        <Search
                            fullWidth
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onClear={() => setSearchText('')}
                            placeholder="Название или код возможности"
                        />
                    </S.SearchContainer>
                    <Switch
                        label="TC с интерфейсами"
                        checked={showWithApi}
                        onChange={(e) => setShowWithApi(e.target.checked)}
                    />
                    <Button
                        disabled={!showWithApi && searchText === ''}
                        variant="plain"
                        onClick={() => {
                            setShowWithApi(false);
                            setSearchText('');
                        }}
                        size="medium"
                    >
                        Сбросить
                    </Button>
                </S.FlexContainer>
                <ButtonGroup
                    alwaysSelected
                    selectedOption={{ id: displayOption }}
                    options={[
                        { startIcon: <Icon iconName={Icons.Grid} />, id: DisplayOptions.GRID },
                        { startIcon: <Icon iconName={Icons.List} />, id: DisplayOptions.LIST },
                    ]}
                    type="secondary"
                    onChange={(option) => setDisplayOption(option.id as DisplayOptions)}
                />
            </S.ActionsContainer>
            {displayOption === DisplayOptions.GRID && (
                <S.CardsContainer grid>
                    {Array.from({ length: COLUMNS_LENGTH }).map((_, i) => (
                        <S.CardsColumn key={i}>
                            {uniqueTechCapabilitiesByColumns[i].map((tc, j) => (
                                <TechCapabilityCard tc={tc} cmdb={cmdb} key={j} />
                            ))}
                            {isLoading && <Skeleton height={100} radius={12} />}
                        </S.CardsColumn>
                    ))}
                </S.CardsContainer>
            )}
            {displayOption === DisplayOptions.LIST && (
                <S.CardsContainer grid={false}>
                    <S.CardsColumn>
                        {uniqueTechCapabilitiesFiltered.map((tc, i) => (
                            <TechCapabilityCard tc={tc} cmdb={cmdb} key={i} />
                        ))}
                        {isLoading && <Skeleton height={100} radius={12} />}
                    </S.CardsColumn>
                </S.CardsContainer>
            )}
            {!isLoading && uniqueTechCapabilitiesFiltered.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Технических возможностей нет"
                        text=""
                    />
                </S.NotFoundContainer>
            )}
        </S.Container>
    );
};
