import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: fixed;
    left: 0;

    width: 256px;
    height: 100vh;
    padding: calc(64px + 24px) 16px 0;

    background-color: ${theme.colors.backgroundLow};
`;
