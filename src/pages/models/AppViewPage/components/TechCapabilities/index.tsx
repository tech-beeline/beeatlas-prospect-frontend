import React, { useState } from 'react';
import { ButtonGroup, Icon, Search, Switch } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TechCapabilityCard } from './components';
import { DisplayOptions } from './const';
import * as S from './units';

export const TechCapabilities = () => {
    const [displayOption, setDisplayOption] = useState(DisplayOptions.GRID);
    const [showWithApi, setShowWithApi] = useState(false);
    const [searchText, setSearchText] = useState('');

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
                        label="Показать ТС с API"
                        checked={showWithApi}
                        onChange={(e) => setShowWithApi(e.target.checked)}
                    />
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
            <S.CardsContainer grid={displayOption === DisplayOptions.GRID}>
                {Array.from({ length: displayOption === DisplayOptions.GRID ? 3 : 1 }).map(
                    (_, i) => (
                        <S.CardsColumn key={i}>
                            {Array.from({ length: 3 }).map((_, j) => (
                                <TechCapabilityCard key={j} />
                            ))}
                        </S.CardsColumn>
                    ),
                )}
            </S.CardsContainer>
        </S.Container>
    );
};
