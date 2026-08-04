import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const Container = styled.div`
    position: relative;
`;

export const MenuBlock = styled.div<{ topPlacement?: boolean }>`
    position: absolute;
    ${({ topPlacement }) => (topPlacement ? 'bottom: 0px;' : 'top: 0px;')}
    right: 24px;

    padding: 8px 0px;

    width: 280px;
    max-height: 350px;

    z-index: 100;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    overflow: hidden;
`;

export const ItemsContainer = styled.div`
    position: relative;

    max-height: 338px;

    overflow: auto;
    overflow-x: hidden;
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 12px 16px;

    @media (hover: hover) {
        &:hover {
            background-color: var(--color-background-base-hover);
        }
    }
`;

export const IconStyled = styled(Icon)`
    cursor: pointer;
`;
