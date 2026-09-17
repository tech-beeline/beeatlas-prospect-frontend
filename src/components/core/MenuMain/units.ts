import styled from '@emotion/styled';

import { NavigationDrawer } from 'components/ui';

export const NavigationDrawerStyled = styled(NavigationDrawer)`
    flex-shrink: 0;

    height: calc(100vh - var(--header-height, 64px) - var(--top-banner-height, 0px));
    max-height: calc(100vh - var(--header-height, 64px) - var(--top-banner-height, 0px));
    overflow: hidden;

    .dsb-navigation-drawer__container {
        height: 100%;
        max-height: 100%;
        overflow: hidden;
    }

    &.dsb-navigation-drawer--expanded .list-top {
        ::-webkit-scrollbar-thumb {
            visibility: visible;
        }
    }

    .list-top {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;

        ::-webkit-scrollbar-thumb {
            visibility: hidden;
        }
    }

    .list {
        overflow: visible;
    }
`;
