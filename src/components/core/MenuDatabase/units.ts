import { NavigationDrawer } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const NavigationDrawerStyled = styled(NavigationDrawer)`
    flex-shrink: 0;

    /* Скрыть последний Divider */
    nav .list .list__divider:nth-last-of-type(1) {
        display: none;
    }
`;
