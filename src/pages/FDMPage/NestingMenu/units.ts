import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: sticky;
    top: 0;

    display: flex;

    width: max-content;
    height: 100%;
    /* тк хэдер */
    padding-top: 64px;

    /* overflow: hidden; */
`;

export const RightSide = styled.div`
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 24px 16px 16px 0;

    border-right: 1px solid ${theme.colors.divider};
`;
