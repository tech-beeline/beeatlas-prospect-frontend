import { useEffect, useState } from 'react';

import { BannerTypeVariants } from './types';

const EXTRA_SMALL_DEVICE_QUERY = '(max-width: 600px)';

export const useResolvedBannerType = (type: BannerTypeVariants): BannerTypeVariants => {
    const [isExtraSmallDevice, setIsExtraSmallDevice] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(EXTRA_SMALL_DEVICE_QUERY).matches : false,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(EXTRA_SMALL_DEVICE_QUERY);
        const handleChange = (event: MediaQueryListEvent) => {
            setIsExtraSmallDevice(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    if (type === 'horizontal' && isExtraSmallDevice) {
        return 'vertical';
    }

    return type;
};
