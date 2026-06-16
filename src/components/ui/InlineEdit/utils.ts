import { INLINE_EDIT_MODAL_MAX_HEIGHT } from './const';
import type { ChildrenWithRef, ModalCoords } from './types';

const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

const isForwardRef = (component: unknown) =>
    component !== null &&
    typeof component === 'object' &&
    '$$typeof' in component &&
    (component as { $$typeof: symbol }).$$typeof === REACT_FORWARD_REF_TYPE;

export const isElementAcceptingRef = (element: ChildrenWithRef) =>
    isForwardRef(element.type) || element.ref != null;

export const classNames = (...values: Array<string | false | null | undefined>) =>
    values.filter(Boolean).join(' ');

export const validateInlineEditChildren = (
    children: ChildrenWithRef | undefined,
    controlRef: React.RefObject<HTMLElement> | undefined,
) => {
    if (!children && !controlRef) {
        throw new Error(
            'InlineEdit children is not valid element! Children should be a valid react element or set controlRef.',
        );
    }

    if (children && !isElementAcceptingRef(children) && !controlRef) {
        throw new Error(
            "InlineEdit children don't have ref props. Use React.forwardRef() " +
                'on children or children must have ref or controlRef props! ' +
                'Example: https://ru.reactjs.org/docs/forwarding-refs.html',
        );
    }
};

export const getModalCoords = (contentRect: DOMRect, modalWidth: number): ModalCoords => {
    const bodyCoords = document.querySelector('body')?.getBoundingClientRect();

    if (!bodyCoords) {
        return { x: 0, y: 0 };
    }

    const x =
        bodyCoords.width - contentRect.x < modalWidth
            ? bodyCoords.width - modalWidth
            : contentRect.x;

    const y = contentRect.y - (INLINE_EDIT_MODAL_MAX_HEIGHT / 2 - contentRect.height / 2);

    return { x, y };
};
