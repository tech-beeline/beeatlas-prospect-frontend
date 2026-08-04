import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const IconStyled = styled(Icon)`
    margin-right: 8px;
`;

export const Container = styled.div`
    position: relative;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 40px;
    right: 0px;

    width: 220px;

    padding: 8px 0px;

    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-base);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 2;
`;

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 16px;
`;
