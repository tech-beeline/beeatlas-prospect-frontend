import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import {
    useGetAllChaptersQuery,
    useGetNfrsByProductAliasQuery,
    usePostNfrsToProductMutation,
} from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { RequirementGroupFields } from './components';
import { type FormValues, createGroup, getValidationSchema } from './form';
import * as S from './units';

export const AppRequirementAddPage = () => {
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const paramCmdb = params.get('cmdb');

    const { data: chapters, isLoading: isLoadingChapters } = useGetAllChaptersQuery();
    const { data: productNfrs, isLoading: isLoadingProductNfrs } =
        useGetNfrsByProductAliasQuery(paramCmdb);
    const isLoading = isLoadingChapters || isLoadingProductNfrs;
    const { mutateAsync: postNfrsToProduct } = usePostNfrsToProductMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigateBack = () => {
        navigate(`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=REQUIREMENTS&cmdb=${paramCmdb}`);
    };

    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(getValidationSchema()),
        defaultValues: {
            groups: [createGroup()],
        },
    });

    const { control, handleSubmit, watch } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'groups',
    });

    const groups = watch('groups');
    const hasRequirements = groups.some(
        (group) =>
            group.requirements.filter((requirement) => requirement.requirementId !== null).length >
            0,
    );

    const onSubmit = handleSubmit(async (values) => {
        if (!paramCmdb) return;

        await postNfrsToProduct({
            productAlias: paramCmdb,
            nfrIds: values.groups
                .flatMap((group) =>
                    group.requirements.map((requirement) => requirement.requirementId),
                )
                .filter((id): id is number => id !== null),
        });

        showSnackbar({ message: 'Требования добавлены' });
        navigateBack();
    });

    return (
        <S.PageWrapper>
            <S.Header>
                <IconButton size="large" iconName={Icons.ArrowLeft} onClick={navigateBack} />
                <Text variant="body2">Назад</Text>
            </S.Header>

            <FormProvider {...form}>
                <S.Form onSubmit={onSubmit}>
                    <S.Content>
                        <S.ContentContainer>
                            <Text variant="h4">Добавление требования</Text>
                            <Text variant="subtitle2">Жизненная ситуация и требования</Text>

                            <S.GroupsContainer>
                                {fields.map((field, groupIndex) => (
                                    <RequirementGroupFields
                                        key={field.id}
                                        groupIndex={groupIndex}
                                        fieldsCount={fields.length}
                                        onDeleteGroup={remove}
                                        chapters={chapters ?? []}
                                        productNfrs={productNfrs ?? []}
                                        isLoadingChapters={isLoading}
                                    />
                                ))}
                            </S.GroupsContainer>

                            <S.AddGroupButtonContainer>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    size="medium"
                                    onClick={() => append(createGroup())}
                                >
                                    Добавить жизненную ситуацию и требования
                                </Button>
                            </S.AddGroupButtonContainer>
                        </S.ContentContainer>
                    </S.Content>

                    <S.Footer>
                        <S.FooterContent>
                            <Button
                                size="medium"
                                variant="outlined"
                                onClick={navigateBack}
                                type="button"
                            >
                                Отмена
                            </Button>
                            <Button
                                size="medium"
                                variant="contained"
                                type="submit"
                                disabled={!hasRequirements}
                            >
                                Добавить
                            </Button>
                        </S.FooterContent>
                    </S.Footer>
                </S.Form>
            </FormProvider>
        </S.PageWrapper>
    );
};
