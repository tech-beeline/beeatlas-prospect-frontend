import { Icon } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 348px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const IconButtonWrappet = styled(Icon)`
    cursor: pointer;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
