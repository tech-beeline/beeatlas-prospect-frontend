import React, { FC, useId } from 'react';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ICopyButton } from './types';

export const CopyButton: FC<ICopyButton> = ({ text, message }) => {
    const id = useId();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleButtonClick = async () => {
        await navigator.clipboard.writeText(text);
        showSnackbar({ message: message });
    };

    return (
        <>
            <IconButton
                data-tooltip-id={`copy-${id}`}
                onClick={handleButtonClick}
                iconName={Icons.Copy}
                size="medium"
            />
            <TooltipContainer id={`copy-${id}`} offset={8} place="top" noArrow>
                Копировать
            </TooltipContainer>
        </>
    );
};
