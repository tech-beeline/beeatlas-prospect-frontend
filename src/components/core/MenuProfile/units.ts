import styled from '@emotion/styled';

import { NavigationDrawer } from 'components/ui';

export const NavigationDrawerStyled = styled(NavigationDrawer)`
    flex-shrink: 0;

    p {
        text-align: start;
    }

    button {
        max-height: 48px;
    }
`;
