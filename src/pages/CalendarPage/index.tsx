import React, { useMemo, useState } from 'react';
import { Autocomplete, Select } from '@beeline/design-system-react';

import { CalendarCard } from './CalendarCard';
import { TOption } from './types';
import * as S from './units';

export const CalendarPage = () => {
    // const [selectOptions, setSelectOptions] = useState<TOption<string>[]>([]);

    const options = ['test1', 'test2', 'test3'];

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // useEffect(() => {
    //     // console.log('value', value);
    // }, [value]);

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

        setInputValue('');
    };

    const handleClose = () => {
        setIsOpen(false);

        console.log('inputValue', inputValue);
    };

    const convertedOptions = useMemo(
        () =>
            options
                .map((value, index) => ({
                    id: index,
                    value,
                }))
                .filter((item) => item.value.includes(inputValue)),
        [options, inputValue],
    );

    const handleInputChange = (value: string) => {
        console.log('value', value);

        setInputValue(value);
    };

    const handleChange = (option: TOption<string>) => {
        console.log('option', option);

        setValue(option as any);

        if (!!handleInputChange) {
            console.log('option', option);

            handleInputChange(option.value);
        }
    };

    const handleRenderValue = (option: TOption<string>) => option.value;

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <S.PageWrapper className="PageWrapper">
            <S.H3 className="H3">Календарь заседаний Архитектурного комитета</S.H3>

            <S.SelectContainer className="SelectContainer">
                <Autocomplete
                    // className={styles.input}
                    // error={error}
                    // helperText={helperText}
                    // label={'test'}
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
                    value={value}
                    size="small"
                    placeholder="place"
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
                    makeOption={({ value }) => <div>{value}</div>}
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
                    makeOption={({ value }) => <div>{value}</div>}
                    onChange={(option) => console.log(option)}
                />
            </S.SelectContainer>

            <S.CardContainer className="CardContainer">
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
