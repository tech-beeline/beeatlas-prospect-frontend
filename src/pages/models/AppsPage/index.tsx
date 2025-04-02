import React, { useState } from 'react';
import { Search } from '@beeline/design-system-react';
import { OldVersionBanner } from 'features/apps';

import { Text } from 'components/core';

import { ApplicationsTableRow } from './components';
import { APPLICATIONS } from './const';
import * as S from './units';

export const AppsPage = () => {
    const [search, setSearch] = useState('');

    return (
        <S.PageWrapper>
            <S.Container>
                <OldVersionBanner />
                <S.Header>
                    <Text variant="h4">Каталог приложений</Text>
                </S.Header>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Название приложения или CMDB Мнемонику"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        onClear={() => setSearch('')}
                    />
                </S.SearchContainer>
                <S.TableStyled>
                    {APPLICATIONS.map((application, i) => (
                        <ApplicationsTableRow key={i} level={0} application={application} />
                    ))}
                </S.TableStyled>
            </S.Container>
        </S.PageWrapper>
    );
};
