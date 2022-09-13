import styled from '@emotion/styled';

import { theme } from 'styles';

import { ReactComponent as LogoSVG } from './images/logo-beeline.svg';

export const LogoIcon = styled(LogoSVG)`
    height: ${({ height }) => `${height}px`};

    & > path {
        fill: ${theme.colors.textLogo};
    }
`;
