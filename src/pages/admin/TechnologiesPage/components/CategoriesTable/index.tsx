import React, { FC, useState } from 'react';

import { Button, Skeleton, Table, TableBody } from 'components/ui';

import { useGetTechnologyCategoriesQuery } from 'api/queries/technologies';
import { ICategory } from 'api/technologies/types';
import { useModal } from 'hooks';

import { CategoryRow, CreateCategorySideblock, MergeCategoriesSideblock } from './components';
import * as S from './units';

export const CategoriesTable: FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

    const { data, isLoading } = useGetTechnologyCategoriesQuery();

    const {
        modalOpened: createSideblockOpened,
        closeModal: closeCreateSideblock,
        openModal: openCreateSideblock,
    } = useModal();

    const {
        modalOpened: mergeSideblockOpened,
        closeModal: closeMergeSideblock,
        openModal: openMergeSideblock,
    } = useModal();

    const handleCheckboxClick = (category: ICategory) => {
        if (selectedCategories.map((category) => category.id).includes(category.id)) {
            setSelectedCategories(selectedCategories.filter((c) => c.id !== category.id));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <>
            <S.FlexContainer>
                <Button
                    size="medium"
                    variant="outlined"
                    disabled={selectedCategories.length < 2}
                    onClick={openMergeSideblock}
                >
                    Объединить в группу
                </Button>
                <Button size="medium" variant="contained" onClick={openCreateSideblock}>
                    Создать группу
                </Button>
            </S.FlexContainer>

            {isLoading && <Skeleton radius={12} height={200} />}

            {data && (
                <Table>
                    <TableBody>
                        {data.map((category) => (
                            <CategoryRow
                                key={category.id}
                                category={category}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                onCheckboxClick={handleCheckboxClick}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}

            <CreateCategorySideblock
                isOpen={createSideblockOpened}
                onClose={closeCreateSideblock}
            />

            <MergeCategoriesSideblock
                isOpen={mergeSideblockOpened}
                onClose={closeMergeSideblock}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />
        </>
    );
};
