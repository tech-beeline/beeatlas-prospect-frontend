import { useCallback, useState } from 'react';

import type { RatingProps } from './types';

export const useRating = ({ onHover }: Pick<RatingProps, 'onHover'>) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const handleMouseLeave = useCallback(() => {
        setHoverIndex(null);
        onHover?.(null);
    }, [onHover]);

    const handleMouseEnter = useCallback(
        (index: number) => {
            setHoverIndex(index);
            onHover?.(index);
        },
        [onHover],
    );

    return {
        hoverIndex,
        handleMouseLeave,
        handleMouseEnter,
    };
};
