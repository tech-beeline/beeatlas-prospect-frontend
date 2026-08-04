import styled from '@emotion/styled';

import { NavigationDrawer } from 'components/ui';

export const NavigationDrawerStyled = styled(NavigationDrawer)`
    flex-shrink: 0;

    /* Скрыть последний Divider */
    nav .list .list__divider:nth-last-of-type(1) {
        display: none;
    }
`;
