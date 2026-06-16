import styled from '@emotion/styled';
import { Resizable } from 're-resizable';

import { Skeleton } from 'components/ui';

// @ts-ignore
export const ResizableStyled = styled(Resizable)`
    position: static !important;

    overflow: hidden auto;
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

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const RightSide = styled.div`
    width: 100%;
    padding: 16px 16px 16px 16px;

    /* border-right: 1px solid var(--color-divider); */
`;

export const SkeletonStyled = styled(Skeleton)`
    margin-bottom: 4px;
`;
