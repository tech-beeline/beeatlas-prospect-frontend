import React, { FC, useEffect, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Select } from 'components/ui';
import { Button } from 'components/ui';

import { usePostNfrsToProductMutation } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IAssignToProductSideblock } from './types';
import * as S from './units';

export const AssignToProductSideblock: FC<IAssignToProductSideblock> = ({
    isOpen,
    onClose,
    nfrId,
    products,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: postNfrsToProduct } = usePostNfrsToProductMutation();

    const [selectedApplication, setSelectedApplication] = useState<{ id: string; value: string }[]>(
        [],
    );

    useEffect(() => {
        if (!isOpen) {
            setSelectedApplication([]);
        }
    }, [isOpen]);

    const productOptions = products
        .filter((product) => !product.nfrs.some((nfr) => String(nfr.id) === String(nfrId)))
        .map((product) => ({
            id: product.id,
            value: product.name,
        }));

    const handleAssignClick = async () => {
        if (selectedApplication.length > 0) {
            await postNfrsToProduct({
                productId: selectedApplication[0].id,
                nfrIds: [nfrId],
            });
            showSnackbar({
                message: `Нефункциональное требование назначено на приложение ${selectedApplication[0].value}`,
            });
        }
        onClose();
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Назначение на приложение</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                    </S.TitleContainer>
                    <S.DescriptionText inactive variant="body3">
                        Назначать требования можно только в приложения, за которыми вы закреплены
                    </S.DescriptionText>
                    <Select
                        fullWidth
                        label="Приложение"
                        options={productOptions}
                        values={selectedApplication}
                        onChange={(values) => setSelectedApplication(values)}
                    />
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button fullWidth size="medium" variant="outlined" onClick={onClose}>
                        Отменить
                    </Button>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        onClick={handleAssignClick}
                        disabled={selectedApplication.length === 0}
                    >
                        Назначить
                    </Button>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
