import type { ButtonSizeVariants } from '../Button/types';

import type { IconButtonVariant } from './types';

export const buildIconButtonClassName = ({
    size,
    variant,
    className,
}: {
    size: ButtonSizeVariants;
    variant: IconButtonVariant;
    className?: string;
}): string =>
    ['dsb_icon-button', `dsb_icon-button__${size}`, `dsb_icon_button-${variant}`, className]
        .filter(Boolean)
        .join(' ');
