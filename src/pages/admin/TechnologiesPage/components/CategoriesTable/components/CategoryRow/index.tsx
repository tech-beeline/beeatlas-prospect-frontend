import React, { FC, useRef } from 'react';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Checkbox, InlineEdit, TableData, TableRow } from 'components/ui';

import { useDeleteCategoryMutation, useUpdateCategoryMutation } from 'api/queries/technologies';
import { getTechnologiesByCategoryId } from 'api/technologies';
import { ICategory } from 'api/technologies/types';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ICategoryRow } from './types';

export const CategoryRow: FC<ICategoryRow> = ({
    category,
    selectedCategories,
    setSelectedCategories,
    onCheckboxClick,
}) => {
    const { modalOpened, openModal, closeModal } = useModal();
    const {
        modalOpened: dialogOpened,
        openModal: openDialog,
        closeModal: closeDialog,
    } = useModal();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: deleteCategory } = useDeleteCategoryMutation();
    const { mutateAsync: updateCategory } = useUpdateCategoryMutation();

    const handleDeleteClick = async (category: ICategory) => {
        const data = await getTechnologiesByCategoryId(category.id).then((res) => res.data);
        if (data.length === 0) {
            await deleteCategory(category.id);
            setSelectedCategories(selectedCategories.filter((c) => c.id !== category.id));
            showSnackbar({ message: 'Группа удалена' });
        } else {
            openDialog();
        }
    };

    const handleSubmit = async (value: string | number | readonly string[] | undefined) => {
        if (value) {
            await updateCategory({ id: category.id, data: { name: String(value) } });
            showSnackbar({ message: 'Группа отредактирована' });
            closeModal();
        }
    };

    const nameRef = useRef(null);

    return (
        <>
            <TableRow key={category.id}>
                <TableData>
                    <Checkbox
                        checked={selectedCategories
                            .map((category) => category.id)
                            .includes(category.id)}
                        onChange={() => onCheckboxClick(category)}
                    />
                </TableData>
                <TableData>
                    <InlineEdit
                        controlRef={nameRef}
                        open={modalOpened}
                        onCancel={closeModal}
                        value={category.name}
                        onSubmit={handleSubmit}
                    >
                        <div ref={nameRef}>{formatNullableString(category.name)}</div>
                    </InlineEdit>
                </TableData>
                <TableData>
                    <IconButton
                        size="medium"
                        iconName={Icons.Edit}
                        onClick={openModal}
                        data-tooltip-id={`${category.id}-edit`}
                    />
                    <TooltipContainer
                        noArrow
                        // @ts-ignore Ошибка в .d.ts
                        place="top-end"
                        offset={8}
                        id={`${category.id}-edit`}
                    >
                        Редактировать
                    </TooltipContainer>
                </TableData>
                <TableData>
                    <IconButton
                        size="medium"
                        iconName={Icons.Delete}
                        onClick={() => handleDeleteClick(category)}
                        data-tooltip-id={`${category.id}-delete`}
                    />
                    <TooltipContainer
                        noArrow
                        // @ts-ignore Ошибка в .d.ts
                        place="top-end"
                        offset={8}
                        id={`${category.id}-delete`}
                    >
                        Удалить
                    </TooltipContainer>
                </TableData>
            </TableRow>
            <Dialog
                title="Группа не может быть удалена"
                opened={dialogOpened}
                onClose={closeDialog}
                onConfirm={closeDialog}
                showDeclineButton={false}
                confirmText="Понятно"
            >
                Группа связана с технологиями, чтобы удалить её, вам нужно отвязать технологии или
                объединить эту группу с другой
            </Dialog>
        </>
    );
};
