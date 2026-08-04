import React, { FC, useEffect } from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Checkbox, TextField } from 'components/form';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Banner, Button, Icon, Radio } from 'components/ui';

import { usePutCriteriaMutation } from 'api/queries/maps';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { emptyValues, METRICS } from './const';
import { CalculationMetricType, FormValues, validationSchema } from './form';
import { ICreateCriteriaSideblock } from './types';
import * as S from './units';
import { formValuesToCriteriaForm, mapCriteriaToFormValues } from './utils';

export const CreateCriteriaSideblock: FC<ICreateCriteriaSideblock> = ({
    isOpen,
    onClose,
    criteriaToEdit = null,
}) => {
    const form = useForm<FormValues>({
        defaultValues: emptyValues,
        resolver: yupResolver(validationSchema) as Resolver<FormValues>,
    });

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { handleSubmit, reset, watch, setValue, getValues } = form;

    const { mutateAsync: updateCriteria, isPending: isUpdatingCriteria } = usePutCriteriaMutation();

    const calculationMetric = watch('calculationMetric');

    const isEditMode = criteriaToEdit != null;

    useEffect(() => {
        if (!isOpen) return;

        reset(criteriaToEdit ? mapCriteriaToFormValues(criteriaToEdit) : emptyValues);
    }, [criteriaToEdit, isOpen, reset]);

    const handleClose = () => {
        reset(emptyValues);
        onClose();
    };

    const selectMetric = (value: CalculationMetricType) => {
        const current = getValues('calculationMetric');
        if (current === value) return;
        setValue('calculationMetric', value, { shouldDirty: true, shouldValidate: true });
    };

    const onSubmit = handleSubmit(async (values) => {
        await updateCriteria(formValuesToCriteriaForm(values));
        showSnackbar({
            message: isEditMode ? 'Изменения сохранены' : 'Критерий создан',
        });
        handleClose();
    });

    return (
        <SideBlock hasBackdrop large isOpen={isOpen} onClose={handleClose}>
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.SideblockContainer>
                        <S.ContentContainer>
                            <S.TitleContainer>
                                <Text variant="h5">
                                    {isEditMode ? 'Редактирование критерия' : 'Создание критерия'}
                                </Text>
                                <IconButton
                                    iconName={Icons.Close}
                                    size="large"
                                    onClick={handleClose}
                                />
                            </S.TitleContainer>

                            <S.FlexContainer gapPX={32}>
                                {isEditMode && (
                                    <Banner
                                        title="Внимание! При изменении параметров оси критерия (интервал, шаг) существующая визуализации карты возможностей будет перестроена в соответствии с новыми параметрами под уже загруженные результаты расчёта"
                                        iconName={Icons.InfoCircled}
                                        color="info"
                                    />
                                )}

                                <TextField name="name" label="Название*" />

                                <S.StyledTextField
                                    name="code"
                                    label="Код*"
                                    helperText="Код может состоять только из строчных латинских букв, цифр и символов"
                                    helperPosition="block"
                                    disabled={isEditMode}
                                />

                                <S.FlexContainer gapPX={12}>
                                    <Text variant="subtitle1">Настройка оси</Text>

                                    <S.MetricCard>
                                        <Checkbox
                                            name="reverseAxis"
                                            label={
                                                <>
                                                    <S.CheckboxContainer>
                                                        <Text variant="body2">Обратная ось</Text>
                                                        <Text inactive variant="caption">
                                                            Инвертирует оценку: чем меньше значение,
                                                            тем выше оценка (например, для жалоб)
                                                        </Text>
                                                    </S.CheckboxContainer>
                                                </>
                                            }
                                        />

                                        <S.FlexContainer gapPX={16}>
                                            <TextField
                                                name="axisMin"
                                                label="Название минимальной точки оси*"
                                            />

                                            <TextField
                                                name="axisMax"
                                                label="Название максимальной точки оси*"
                                            />
                                        </S.FlexContainer>
                                    </S.MetricCard>
                                </S.FlexContainer>

                                <S.FlexContainer gapPX={12}>
                                    <Text variant="subtitle1">Метрика расчёта</Text>

                                    <S.FlexContainer gapPX={20}>
                                        {METRICS.map((metric) => {
                                            const selected = calculationMetric === metric.id;
                                            const isContinuous = metric.id === 'continuous';
                                            const isEvaluative = metric.id === 'evaluative';
                                            const isDiscrete = metric.id === 'discrete';

                                            return (
                                                <S.MetricCard
                                                    key={metric.id}
                                                    onClick={() => selectMetric(metric.id)}
                                                    isPointer
                                                >
                                                    <S.MetricCardTop>
                                                        <Radio
                                                            name="calculationMetric"
                                                            checked={selected}
                                                            onChange={() => selectMetric(metric.id)}
                                                        />
                                                        <div>
                                                            <Text variant="body2">
                                                                {metric.title}
                                                            </Text>
                                                            <Text inactive variant="caption">
                                                                {metric.hint}
                                                            </Text>
                                                        </div>
                                                    </S.MetricCardTop>
                                                    {isContinuous && (
                                                        <S.TwoFieldsRow
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <TextField
                                                                name="continuousInterval"
                                                                label="Порог*"
                                                                disabled={!selected}
                                                                type="number"
                                                                endIcon={
                                                                    <Icon
                                                                        data-tooltip-id="criteria-continuous-interval"
                                                                        iconName={Icons.InfoCircled}
                                                                        size="large"
                                                                    />
                                                                }
                                                            />
                                                            <TooltipContainer
                                                                largePadding
                                                                id="criteria-continuous-interval"
                                                                offset={8}
                                                                place="top"
                                                                noArrow
                                                                displayFlex
                                                            >
                                                                <div>
                                                                    <Text variant="subtitle3">
                                                                        Порог
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        Максимальное значение для
                                                                        оценки. Всё, что выше
                                                                        порога, получает высшую
                                                                        оценку.
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        {`Пример: если порог для критерия 500, то критерий может варьироваться от 0 до 500, а всё, что выше, автоматически получает высшую оценку`}
                                                                    </Text>
                                                                </div>
                                                            </TooltipContainer>
                                                            <TextField
                                                                name="continuousStep"
                                                                label="Шаг*"
                                                                disabled={!selected}
                                                                type="number"
                                                                endIcon={
                                                                    <Icon
                                                                        data-tooltip-id="criteria-continuous-step"
                                                                        iconName={Icons.InfoCircled}
                                                                        size="large"
                                                                    />
                                                                }
                                                            />
                                                            <TooltipContainer
                                                                largePadding
                                                                id="criteria-continuous-step"
                                                                offset={8}
                                                                place="top"
                                                                noArrow
                                                                displayFlex
                                                            >
                                                                <div>
                                                                    <Text variant="subtitle3">
                                                                        Шаг
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        {`Шкала оценки разбивается на отрезки этой длины (от 0 до порога).`}
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        {`Пример: если порог для критерия 500 и шаг 100, то для критерия шкала оценки от 1 до 5. Если для TC/BC значение критерия >500, он автоматически получает высшую оценку (5) по этому критерию`}
                                                                    </Text>
                                                                </div>
                                                            </TooltipContainer>
                                                        </S.TwoFieldsRow>
                                                    )}
                                                    {isEvaluative && (
                                                        <div onClick={(e) => e.stopPropagation()}>
                                                            <TextField
                                                                name="evaluativeInterval"
                                                                label="Интервал*"
                                                                disabled={!selected}
                                                                type="number"
                                                                endIcon={
                                                                    <Icon
                                                                        data-tooltip-id="criteria-evaluative-interval"
                                                                        iconName={Icons.InfoCircled}
                                                                        size="large"
                                                                    />
                                                                }
                                                            />
                                                            <TooltipContainer
                                                                largePadding
                                                                id="criteria-evaluative-interval"
                                                                offset={8}
                                                                place="bottom"
                                                                noArrow
                                                                displayFlex
                                                            >
                                                                <div>
                                                                    <Text variant="subtitle3">
                                                                        Интервал
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        Количество уровней оценки
                                                                        критерия. Определяет, на
                                                                        сколько градаций разбита
                                                                        шкала оценки — от
                                                                        минимальной до максимальной
                                                                        Интервал всегда является
                                                                        целым числом ≥ 1 и задаётся
                                                                        для каждого критерия
                                                                        независимо от его типа
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        Пример: если критерий
                                                                        оценивается по 10-балльной
                                                                        шкале — интервал = 10. Если
                                                                        критерий имеет 3 уровня
                                                                        оценки («низкий», «средний»,
                                                                        «высокий») — интервал = 3
                                                                    </Text>
                                                                </div>
                                                            </TooltipContainer>
                                                        </div>
                                                    )}
                                                    {isDiscrete && (
                                                        <div onClick={(e) => e.stopPropagation()}>
                                                            <TextField
                                                                name="discreteInterval"
                                                                label="Интервал*"
                                                                disabled={!selected}
                                                                type="number"
                                                                endIcon={
                                                                    <Icon
                                                                        data-tooltip-id="criteria-discrete-interval"
                                                                        iconName={Icons.InfoCircled}
                                                                        size="large"
                                                                    />
                                                                }
                                                            />
                                                            <TooltipContainer
                                                                largePadding
                                                                id="criteria-discrete-interval"
                                                                offset={8}
                                                                place="bottom"
                                                                noArrow
                                                                displayFlex
                                                            >
                                                                <div>
                                                                    <Text variant="subtitle3">
                                                                        Интервал
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        Количество уровней оценки
                                                                        критерия. Определяет, на
                                                                        сколько градаций разбита
                                                                        шкала оценки — от
                                                                        минимальной до максимальной
                                                                        Интервал всегда является
                                                                        целым числом ≥ 1 и задаётся
                                                                        для каждого критерия
                                                                        независимо от его типа
                                                                    </Text>
                                                                </div>
                                                                <div>
                                                                    <Text variant="caption">
                                                                        Пример: если критерий
                                                                        оценивается по 10-балльной
                                                                        шкале — интервал = 10. Если
                                                                        критерий имеет 3 уровня
                                                                        оценки («низкий», «средний»,
                                                                        «высокий») — интервал = 3
                                                                    </Text>
                                                                </div>
                                                            </TooltipContainer>
                                                        </div>
                                                    )}
                                                </S.MetricCard>
                                            );
                                        })}
                                    </S.FlexContainer>
                                </S.FlexContainer>
                            </S.FlexContainer>
                        </S.ContentContainer>
                        <S.ButtonsContainer>
                            <S.ButtonWrapper>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="outlined"
                                    type="button"
                                    onClick={handleClose}
                                >
                                    Отменить
                                </Button>
                            </S.ButtonWrapper>
                            <S.ButtonWrapper>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    type="submit"
                                    disabled={isUpdatingCriteria}
                                >
                                    {isEditMode ? 'Сохранить' : 'Создать'}
                                </Button>
                            </S.ButtonWrapper>
                        </S.ButtonsContainer>
                    </S.SideblockContainer>
                </form>
            </FormProvider>
        </SideBlock>
    );
};
