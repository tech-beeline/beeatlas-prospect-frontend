import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Select } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';

import { CalendarCard } from './CalendarCard';
import { TOption } from './types';
import * as S from './units';

export const CalendarPage = observer(() => {
    // const [selectOptions, setSelectOptions] = useState<TOption<string>[]>([]);

    const {
        generalStore: { setCalendarData },
    } = useRootStore();

    const options = ['test1', 'test2', 'test3'];

    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // console.log('value', value);
    }, [value]);

    useEffect(() => {
        setCalendarData();
    }, []);

    // const onSelectItem = (values: TOption<string>[]) => {
    //     setSelectOptions(values);
    // };

    // const renderValue = (values: TOption<string>[]) => {
    //     return values.map((v) => v.value).join(', ');
    // };

    const makeOption = (option: TOption<string>) => {
        return <span>{option.value}</span>;
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const convertedOptions = useMemo(
        () =>
            options.map((value, index) => ({
                id: index,
                value,
            })),
        [options],
    );

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleChange = (option: TOption<string>) => {
        setValue(option as any);

        if (handleInputChange) {
            handleInputChange(option.value);
        }
    };

    const handleRenderValue = (option: TOption<string>) => option.value;

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <S.PageWrapper>
            <S.H3>Календарь заседаний Архитектурного комитета</S.H3>

            <S.SelectContainer>
                <Autocomplete
                    // className={styles.input}
                    // error={error}
                    // helperText={helperText}
                    label={'test'}
                    makeOption={makeOption}
                    onChange={handleChange}
                    onClose={handleClose}
                    onInputChange={handleInputChange}
                    onInputClear={handleClear}
                    onOpen={handleOpen}
                    open={isOpen}
                    options={convertedOptions}
                    renderValue={handleRenderValue}
                    type="select"
                    value={inputValue as any}
                />
                {/* <Autocomplete
                    label="Выберите значение"
                    // placeholder="test"
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
                /> */}
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
});
