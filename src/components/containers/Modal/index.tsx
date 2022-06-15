import React, { FC, MouseEvent, MutableRefObject, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'components/interaction';

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
        <S.ModalOverlay onMouseDown={handleModalClose} isVisible={props.isVisible} {...{ ref }}>
            <S.ModalPaper {...{ isHTML, props }}>
                {isHTML ? (
                    <>
                        <S.InnerHTMLContainer
                            dangerouslySetInnerHTML={{
                                // __html: props.children?.replace(/<html .*?>/g, ''),
                                // https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/#:~:text=What%20is%20dangerouslySetInnerHTML%20%3F,property%20directly%20on%20the%20element.
                                __html: props.children,
                            }}
                        />
                        <S.FooterModalContainer>
                            <S.ShadowLine />

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
