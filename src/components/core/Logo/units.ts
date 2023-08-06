import styled from '@emotion/styled';

import { ReactComponent as LogoSVG } from './images/logo-beeline.svg';

export const LogoIcon = styled(LogoSVG)`
    height: ${({ height }) => `${height}px`};

    & > path {
        fill: var(--color-text-logo);
    }
`;
