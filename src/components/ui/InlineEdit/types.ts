import type { InputHTMLAttributes, KeyboardEvent, ReactElement, RefObject } from 'react';

export interface ChildrenWithRef extends ReactElement {
    ref?: RefObject<HTMLElement>;
}

import type { HelperPositionType } from '../TextField/types';

export type { HelperPositionType };

export interface InlineEditFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSubmit'> {
    error?: boolean;
    helperText?: string;
    helperPosition?: HelperPositionType;
    disabled?: boolean;
    dataTestId?: string;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export interface InlineEditProps extends InlineEditFieldProps {
    /** Состояние отображения: открыт / скрыт */
    open?: boolean;
    /** Обработчик события клика по кнопке отмены (крестик) */
    onCancel?: () => void;
    /** Обработчик события клика по кнопке подтверждения (галочка) */
    onSubmit?: (value: string | number | readonly string[] | undefined) => void;
    /** ref на компонент, который может служить в качестве указателя вместо дочернего элемента */
    controlRef?: RefObject<HTMLElement>;
    children?: ChildrenWithRef;
}

export interface InlineEditModalProps {
    contentRect: DOMRect;
    applicationRootElement?: string;
    children: ReactElement;
}

export interface ModalCoords {
    x: number;
    y: number;
}
