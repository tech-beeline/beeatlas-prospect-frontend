import React, { FC } from 'react';

import { Button } from 'components/ui';

import { IFormFooter } from './types';
import * as S from './units';

export const FormFooter: FC<IFormFooter> = ({
    submitButtonText,
    submitButtonDisabled = false,
    cancelButtonDisabled = false,
    showCancelButton = true,
    onCancelButtonClick,
}) => {
    return (
        <S.Footer>
            <S.Container>
                <S.ButtonsContainer>
                    {showCancelButton && (
                        <Button
                            disabled={cancelButtonDisabled}
                            size="medium"
                            onClick={onCancelButtonClick}
                            type="button"
                        >
                            Назад
                        </Button>
                    )}
                    <Button
                        disabled={submitButtonDisabled}
                        variant="contained"
                        size="medium"
                        type="submit"
                    >
                        {submitButtonText}
                    </Button>
                </S.ButtonsContainer>
            </S.Container>
        </S.Footer>
    );
};
