import React, { useState } from 'react';
import { Select } from '@beeline/lk-ui';

import { CalendarCard } from './CalendarCard';
import { TOption } from './types';
import * as S from './units';

export const CalendarPage = () => {
    const [selectOptions, setSelectOptions] = useState<TOption<string>[]>([]);

    const onSelectItem = (values: TOption<string>[]) => {
        setSelectOptions(values);
    };

    const renderValue = (values: TOption<string>[]) => {
        return values.map((v) => v.value).join(', ');
    };

    const makeOption = (option: TOption<string>) => {
        return <span>{option.value}</span>;
    };

    return (
        <S.PageWrapper>
            <S.H3>Календарь заседаний Архитектурного комитета</S.H3>

            <S.SelectContainer>
                <Select
                    label="Выберите значение"
                    options={[
                        {
                            id: 1,
                            value: 'Значение 1',
                        },
                        {
                            id: 2,
                            value: 'Значение 2',
                        },
                        {
                            id: 3,
                            value: 'Значение 3',
                        },
                    ]}
                    values={selectOptions}
                    renderValue={renderValue}
                    makeOption={makeOption}
                    onChange={onSelectItem}
                    size="small"
                />
                <Select
                    label="sds"
                    options={[
                        {
                            id: 1,
                            value: 'Значение 1',
                        },
                        {
                            id: 2,
                            value: 'Значение 2',
                        },
                        {
                            id: 3,
                            value: 'Значение 3',
                        },
                    ]}
                    size="small"
                    values={[]}
                    makeOption={makeOption}
                    onChange={(option) => console.log(option)}
                />
                <Select
                    label="sds"
                    options={[
                        {
                            id: 1,
                            value: 'Значение 1',
                        },
                        {
                            id: 2,
                            value: 'Значение 2',
                        },
                        {
                            id: 3,
                            value: 'Значение 3',
                        },
                    ]}
                    size="small"
                    values={[]}
                    makeOption={({ id, value }) => <div>{value}</div>}
                    onChange={(option) => console.log(option)}
                />
                <Select
                    label="sds"
                    options={[
                        {
                            id: 1,
                            value: 'Значение 1',
                        },
                        {
                            id: 2,
                            value: 'Значение 2',
                        },
                        {
                            id: 3,
                            value: 'Значение 3',
                        },
                    ]}
                    size="small"
                    values={[]}
                    makeOption={({ id, value }) => <div>{value}</div>}
                    onChange={(option) => console.log(option)}
                />
            </S.SelectContainer>

            <S.CardContainer>
                <CalendarCard
                    date={'12 ноября 2021'}
                    title={'Дизайн-система (Отчёт о поручениях АК от 21.12.2021)'}
                    subTitle={'Дизайн система | Концепция продукта'}
                />

                <CalendarCard
                    date={'12 ноября 2021'}
                    title={'Дизайн-система (Отчёт о поручениях АК от 21.12.2021)'}
                    subTitle={'Дизайн система | Концепция продукта'}
                />

                <CalendarCard
                    date={'12 ноября 2021'}
                    title={'Дизайн-система (Отчёт о поручениях АК от 21.12.2021)'}
                    subTitle={'Дизайн система | Концепция продукта'}
                />
            </S.CardContainer>
        </S.PageWrapper>
    );
};
