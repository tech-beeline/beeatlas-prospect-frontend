import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton, Label, Search } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField } from 'components/form';
import { FeelingTypes, IconFeeling } from 'components/other';

import { businessInteraction, SEARCH_BIS } from 'pages/CJPage/mocks';

import { SideBlock } from '../SideBlock';

import emptyBox from './images/empty-box.png';

import { FormValues, validationSchema } from './form';
import { IStepForm } from './types';
import * as S from './units';

enum Stage {
    SETTINGS = 'SETTINGS',
    BISEARCH = 'BISEARCH',
    BIVIEW = 'BIVIEW',
    BIEDIT = 'BIEDIT',
}

export const StepForm: FC<IStepForm> = ({
    defaultName,
    isOpen,
    renameColumn,
    addBI,
    onClose,
    stepBIs,
}) => {
    // COMMON
    const [stage, setStage] = useState<Stage>(Stage.SETTINGS);
    const [selectedBiId, setSelectedBiId] = useState<number | null>(null);

    // SETTINGS
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset } = form;

    const handleCloseClick = () => {
        onClose();
        setStage(Stage.SETTINGS);
        reset();
    };

    const onSubmit = handleSubmit(({ name }) => {
        renameColumn(name);
        onClose();
        reset();
    });

    // BISEARCH
    const [search, setSearch] = useState('');
    const [searchBis, setSearchBis] = useState(SEARCH_BIS);

    useEffect(() => {
        setSearchBis(SEARCH_BIS.filter((bi) => bi.name.includes(search)));
    }, [search]);

    const productSearchBis = searchBis.filter((bi) => !bi.communal);
    const communalSearchBis = searchBis.filter((bi) => bi.communal);

    useEffect(() => reset({ name: defaultName }), [defaultName]);

    // BIVIEW
    const currentBi = SEARCH_BIS.find((bi) => bi.id === selectedBiId);

    return (
        <SideBlock isOpen={isOpen} setOpen={handleCloseClick}>
            {stage === Stage.SETTINGS && (
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FlexWrapper>
                            <S.SideBlockTitle>Настройка шага</S.SideBlockTitle>

                            <IconButton
                                iconName={Icons.Close}
                                size="large"
                                onClick={handleCloseClick}
                            />
                        </S.FlexWrapper>

                        <S.TextFieldContainer>
                            <TextField name="name" label="Название" />
                        </S.TextFieldContainer>

                        <S.SubtitleFlexWrapper>
                            <S.Subtitle>BI для шага</S.Subtitle>

                            <IconButton
                                iconName={Icons.Add}
                                size="large"
                                onClick={() => setStage(Stage.BISEARCH)}
                            />
                        </S.SubtitleFlexWrapper>

                        {stepBIs.length === 0 && (
                            <S.EmptyState>
                                <img src={emptyBox} />
                                <S.Subtitle3Inactive>Добавьте первый BI</S.Subtitle3Inactive>
                            </S.EmptyState>
                        )}

                        {stepBIs.map((bi) => (
                            <S.BIFlexWrapper key={bi.id}>
                                <div>
                                    <S.Body2>{bi.name}</S.Body2>
                                    <S.Body3>Номер BI</S.Body3>
                                </div>
                                <IconButton
                                    iconName={Icons.NavArrowRight}
                                    size="large"
                                    onClick={() => {
                                        setSelectedBiId(bi.id);
                                        setStage(Stage.BIVIEW);
                                    }}
                                />
                            </S.BIFlexWrapper>
                        ))}

                        <S.ButtonContainer>
                            <Button type="button" onClick={handleCloseClick}>
                                Отменить
                            </Button>

                            <Button type="submit" variant="contained">
                                Сохранить
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            )}
            {stage === Stage.BISEARCH && (
                <>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(Stage.SETTINGS)}
                        />
                        <S.SideBlockTitle>Выбор BI для шага</S.SideBlockTitle>
                    </S.TitleFlexWrapper>

                    <S.TextFieldContainer>
                        <Search
                            placeholder="Номер или название"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClear={() => setSearch('')}
                            fullWidth
                        />
                    </S.TextFieldContainer>

                    <S.SubtitleFlexWrapper2>
                        <S.Subtitle>Продуктовые</S.Subtitle>

                        <Button onClick={() => setStage(Stage.BIEDIT)} variant="plain">
                            Создать BI
                        </Button>
                    </S.SubtitleFlexWrapper2>

                    {productSearchBis.map((bi) => (
                        <S.BIFlexWrapper key={bi.id}>
                            <div>
                                <S.Body2>{bi.name}</S.Body2>
                                <S.Body3>Номер BI</S.Body3>
                            </div>
                            <IconButton
                                iconName={Icons.NavArrowRight}
                                size="large"
                                onClick={() => {
                                    setSelectedBiId(bi.id);
                                    setStage(Stage.BIVIEW);
                                }}
                            />
                        </S.BIFlexWrapper>
                    ))}
                    <S.SubtitleFlexWrapper2>
                        <S.Subtitle>Коммунальные</S.Subtitle>
                    </S.SubtitleFlexWrapper2>

                    {communalSearchBis.map((bi) => (
                        <S.BIFlexWrapper key={bi.id}>
                            <div>
                                <S.Body2>{bi.name}</S.Body2>
                                <S.Body3>Номер BI</S.Body3>
                            </div>
                            <IconButton
                                iconName={Icons.NavArrowRight}
                                size="large"
                                onClick={() => {
                                    setSelectedBiId(bi.id);
                                    setStage(Stage.BIVIEW);
                                }}
                            />
                        </S.BIFlexWrapper>
                    ))}
                </>
            )}
            {stage === Stage.BIVIEW && (
                <>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(Stage.BISEARCH)}
                        />
                        <S.SideBlockTitle>Атрибуты BI</S.SideBlockTitle>
                    </S.TitleFlexWrapper>

                    <S.LabelsContainer>
                        <Label title="Целевой" variant="contained" type="teal" />
                        <Label title="Коммунальный" variant="contained" type="magenta" />
                    </S.LabelsContainer>

                    <S.Body3>Название</S.Body3>
                    <S.Body2>{currentBi?.name}</S.Body2>

                    <S.Body3>Описание</S.Body3>
                    <S.Body2>Описание BI</S.Body2>

                    <S.Body3>Стадия ЖЦ</S.Body3>
                    <S.Body2>Передан в экспулатацию</S.Body2>

                    <S.Subtitle>Участники взаимодействия</S.Subtitle>
                    <S.Subtitle3>Участник 1</S.Subtitle3>

                    <S.Body3>Сторона</S.Body3>
                    <S.Body2>Пример</S.Body2>

                    <S.Body3>Описание участника</S.Body3>
                    <S.Body2>Пример</S.Body2>

                    <S.Body3>Ценностный результат</S.Body3>
                    <S.Body2>Пример</S.Body2>

                    <S.Subtitle>Чувства и эмоции клиента</S.Subtitle>
                    <IconFeeling type={FeelingTypes.HAPPY} />

                    <S.Subtitle>Входы и выходы</S.Subtitle>
                    <S.Subtitle3>Вход 1</S.Subtitle3>

                    <S.Body3>Вход</S.Body3>
                    <S.Body2>Пример</S.Body2>

                    <S.Body3>Выход</S.Body3>
                    <S.Body2>Пример</S.Body2>

                    <S.ButtonContainer>
                        <Button type="button">Редактировать</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                addBI(businessInteraction);
                                handleCloseClick();
                            }}
                        >
                            Выбрать
                        </Button>
                    </S.ButtonContainer>
                </>
            )}
        </SideBlock>
    );
};
