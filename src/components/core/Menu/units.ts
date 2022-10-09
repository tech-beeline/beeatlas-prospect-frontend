import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: fixed;
    left: 0;

    width: 256px;
    height: 100vh;
    padding-top: calc(64px + 24px);

    background-color: ${theme.colors.backgroundLow};
`;
