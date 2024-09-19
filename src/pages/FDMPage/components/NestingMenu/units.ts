import { Skeleton } from '@beeline/design-system-react';
import styled from '@emotion/styled';
import { Resizable } from 're-resizable';

// @ts-ignore
export const ResizableStyled = styled(Resizable)`
    position: static !important;

    overflow: hidden auto;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const Wrapper = styled.div`
    border-left: 1px solid var(--color-divider);

    position: sticky;
    top: 0;

    display: flex;

    width: max-content;
    height: calc(100vh - 64px);

    /* overflow: hidden auto; */

    /* тк хэдер */
    /* padding-top: 64px; */

    /* overflow: hidden; */
`;

export const RightSide = styled.div`
    width: 100%;
    padding: 16px 16px 16px 16px;

    /* border-right: 1px solid var(--color-divider); */
`;

export const SkeletonStyled = styled(Skeleton)`
    margin-bottom: 4px;
`;
