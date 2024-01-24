import React, { FC } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { BIForm, formValuesToData } from 'features/cx';

import { useCreateBIMutation } from 'api/queries/bi';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiCreate } from './types';

export const BiCreate: FC<IBiCreate> = ({ productId, setStage, onClose }) => {
    const { mutateAsync: createBi } = useCreateBIMutation();

    return (
        <>
            <S.FlexWrapper>
                <S.TitleFlexWrapper>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() => setStage(Stage.BISEARCH)}
                    />
                    <S.SideBlockTitle>Создание BI</S.SideBlockTitle>
                </S.TitleFlexWrapper>
                <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
            </S.FlexWrapper>
            <BIForm
                onClose={() => setStage(Stage.BISEARCH)}
                onSave={(values) =>
                    createBi({ ...formValuesToData(values), draft: true, productId })
                }
            />
        </>
    );
};
