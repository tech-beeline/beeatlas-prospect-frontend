import styled from '@emotion/styled';
import { Resizable } from 're-resizable';

import { theme } from 'styles';

// @ts-ignore
export const ResizableStyled = styled(Resizable)`
    position: static !important;

    overflow: hidden auto;

    &::-webkit-scrollbar-thumb {
        background-color: #b6b7bf;

        border-radius: 16px;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const Wrapper = styled.div`
    position: sticky;
    top: 0;

    display: flex;

    width: max-content;
    height: 100%;

    /* overflow: hidden auto; */

    /* тк хэдер */
    /* padding-top: 64px; */

    /* overflow: hidden; */
`;

export const RightSide = styled.div`
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 88px 16px 16px 0;

    /* border-right: 1px solid ${theme.colors.divider}; */
`;
