import styled from '@emotion/styled';

import { Divider, Icon } from 'components/ui';
export const MenuBlock = styled.div`
    position: absolute;
    bottom: -10px;
    left: 0;

    transform: translateY(100%);

    flex-direction: column;

    padding: 8px 0px;
    width: 280px;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 12px 16px;

    transition: background-color 0.25s ease-in-out;

    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: var(--color-background-base-hover);
        }
    }
`;

export const MenuItemText = styled.div`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const MenuItemRemoveText = styled(MenuItemText)`
    color: var(--color-border-error);
`;

export const MenuDivider = styled(Divider)`
    width: 100%;
    margin: 8px 0;
`;

export const MenuItemStyled = styled(MenuItem)`
    justify-content: space-between;
`;

export const DeleteIcon = styled(Icon)`
    color: var(--color-border-error);
`;

export const IconStyled = styled(Icon)`
    cursor: pointer;
`;
