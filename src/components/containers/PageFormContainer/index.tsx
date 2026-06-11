import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IPageFormContainer } from './types';
import * as S from './units';

export const PageFormContainer: FC<IPageFormContainer> = ({
    title = 'Назад',
    children,
    footer,
    confirmButtonText = 'Создать',
    cancelButtonText = 'Отмена',
    confirmButtonClick,
    cancelButtonClick,
    disableConfirmButton,
}) => {
    const navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1);
    };
    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={navigateBack}
                        style={{ cursor: 'pointer' }}
                    />

                    <Text variant="subtitle1">{title}</Text>
                </S.FlexSideContainer>
            </S.Header>
            <S.Content>
                <S.FormContainer>{children}</S.FormContainer>
            </S.Content>

            {footer && (
                <S.Footer>
                    <S.FooterInner>
                        <Button type="button" onClick={cancelButtonClick} size="medium">
                            {cancelButtonText}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={confirmButtonClick}
                            disabled={disableConfirmButton}
                            size="medium"
                        >
                            {confirmButtonText}
                        </Button>
                    </S.FooterInner>
                </S.Footer>
            )}
        </S.PageWrapper>
    );
};
