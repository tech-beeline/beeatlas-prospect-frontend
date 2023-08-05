import { Button } from '@beeline/design-system-react';
import React, { FC, MouseEvent, MutableRefObject, useRef } from 'react';
import ReactDOM from 'react-dom';

import { IModalProps } from './types';
import * as S from './units';

export const Modal: FC<IModalProps> = ({ isHTML = false, ...props }) => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    const handleModalClose = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (e.target === ref.current) {
            props.setVisible(false);
        }
    };

    const CloseButton = () => <Button onClick={() => props.setVisible(false)}>Закрыть</Button>;

    return ReactDOM.createPortal(
        <S.ModalOverlay
            className="ModalOverlay"
            onMouseDown={handleModalClose}
            isVisible={props.isVisible}
            {...{ ref }}
        >
            <S.ModalPaper className="ModalPaper" {...{ isHTML, props }}>
                {isHTML ? (
                    <>
                        <S.InnerHTMLContainer
                            className="InnerHTMLContainer"
                            dangerouslySetInnerHTML={{
                                // __html: props.children?.replace(/<html .*?>/g, ''),
                                // https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/#:~:text=What%20is%20dangerouslySetInnerHTML%20%3F,property%20directly%20on%20the%20element.
                                __html: props.children,
                            }}
                        />
                        <S.FooterModalContainer className="FooterModalContainer">
                            <S.ShadowLine className="ShadowLine" />

                            <CloseButton />
                        </S.FooterModalContainer>
                    </>
                ) : (
                    <>
                        {props.children}

                        <CloseButton />
                    </>
                )}
            </S.ModalPaper>
        </S.ModalOverlay>,
        document.getElementById('modal-root') as Element,
    );
};
