import styled from '@emotion/styled';

import { ReactComponent as LogoSVG } from 'styles/design-tokens/assets/logo/logo-light-theme.svg';

export const LogoIcon = styled(LogoSVG)`
    height: ${({ height }) => `${height}px`};

    & > path:first-child {
        fill: var(--color-text-logo);
    }
`;
