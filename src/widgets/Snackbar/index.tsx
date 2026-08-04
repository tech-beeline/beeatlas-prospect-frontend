import React, { FC, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useMountEffect } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { useSnackbarStore } from './store';
import * as S from './units';

export const Snackbar: FC = () => {
    const activeSnackbar = useSnackbarStore((state) => state.activeSnackbar);
    const clearSnackbar = useSnackbarStore((state) => state.clearSnackbar);

    const snackbarRef = useRef(null);
    const [themeElement, setThemeElement] = useState<HTMLElement | null>(null);

    useOutsideClick(
        snackbarRef,
        activeSnackbar.isOpen && !activeSnackbar.showCloseButton,
        clearSnackbar,
    );

    useMountEffect(() => {
        setThemeElement(document.getElementById('root'));
    });

    return (
        themeElement &&
        createPortal(
            <S.Wrapper isOpen={activeSnackbar.isOpen} ref={snackbarRef}>
                {activeSnackbar.message}

                <S.TextButton onClick={activeSnackbar.onClickButton}>
                    {activeSnackbar.textButton}
                </S.TextButton>

                {activeSnackbar.showCloseButton && (
                    <S.IconButtonWrapper
                        iconName={Icons.Close}
                        onClick={(e) => {
                            e.stopPropagation();
                            clearSnackbar();
                        }}
                        size="small"
                    />
                )}
            </S.Wrapper>,
            themeElement,
        )
    );
};

export { useSnackbarStore } from './store';
