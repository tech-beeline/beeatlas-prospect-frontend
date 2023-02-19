import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { Nullable } from 'types/common';

export const useOutsideClick = (
    ref: MutableRefObject<Nullable<HTMLDivElement>>,
    isOpen: boolean,
    stateSetter: Dispatch<SetStateAction<boolean>>,
) => {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            const conditionOutside =
                ref.current && !ref.current.contains(event.target as Node) && isOpen;

            conditionOutside && stateSetter(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, isOpen]);
};
