import styled from '@emotion/styled';

import { ReactComponent as LoaderSVG } from './images/loader.svg';

import * as T from './types';

export const Loader = styled(LoaderSVG)<T.ILoader>`
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
`;
