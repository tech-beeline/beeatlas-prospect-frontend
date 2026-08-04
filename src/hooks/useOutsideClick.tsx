import { MutableRefObject, useEffect } from 'react';
import { Nullable } from 'types/common';

const GLOBAL_EXCEPTION_IDS = ['dsb__positioner'];

export const useOutsideClick = (
    ref: MutableRefObject<Nullable<HTMLDivElement | HTMLFormElement>>,
    isOpen: boolean,
    stateSetter: (bool: boolean) => void,
    exceptionRef?: MutableRefObject<Nullable<HTMLElement>>,
    exceptionIds?: string[],
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const exceptionElements = GLOBAL_EXCEPTION_IDS.map((id) => document.getElementById(id));

            const conditionOutside =
                !!ref.current &&
                !ref.current.contains(event.target as Node) &&
                !exceptionRef?.current?.contains(event.target as Node) &&
                !(exceptionIds ?? []).some((id) => id === (event.target as Element).id) &&
                isOpen &&
                (!!exceptionRef?.current
                    ? !exceptionRef.current.isEqualNode(event.target as Node)
                    : true) &&
                !exceptionElements.some((element) => element?.contains(event.target as Node));

            conditionOutside && stateSetter(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, isOpen, stateSetter]);
};
