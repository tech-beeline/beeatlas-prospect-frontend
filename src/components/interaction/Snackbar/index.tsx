import React, { FC, useRef } from 'react';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { ISnackbar } from './types';
import * as S from './units';

export const Snackbar: FC<ISnackbar> = (props) => {
    // const [isDisplay, setDisplay] = useState(true);

    const snackbarRef = useRef(null);

    useOutsideClick(snackbarRef, props.isOpen, props.setOpen);

    // useEffect(() => {
    //     if (!props.isOpen) {
    //         setTimeout(() => {
    //             setDisplay(false);
    //         }, 250);
    //     }
    // }, [props.isOpen]);

    return (
        <S.Wrapper isOpen={props.isOpen} ref={snackbarRef}>
            {props.message}

            <S.TextButton onClick={props.onClickButton}>{props.textButton}</S.TextButton>
        </S.Wrapper>
    );
};
