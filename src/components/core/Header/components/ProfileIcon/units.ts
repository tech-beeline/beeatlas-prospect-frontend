import styled from '@emotion/styled';

import { Divider } from 'components/ui';

export const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    color: var(--color-status-warning);
    background-color: var(--color-status-warning-background);

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-subtitle3);

    border-radius: var(--size-border-radius-x6);

    user-select: none;
    cursor: pointer;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 56px;
    right: 24px;

    width: 280px;
    padding: 8px 0;

    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-medium);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    user-select: none;
    cursor: pointer;

    z-index: 10;
`;

export const DropdownItem = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 46px;
    padding: 12px 16px;

    color: var(--color-background-inverse);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const DividerStyled = styled(Divider)`
    width: 100%;
    margin: 8px 0;
`;

export const BlurContainer = styled.div`
    position: fixed;
    top: 64px;

    height: 100vh;
    /* width: 100vw; */

    background: rgba(217, 217, 217, 0.4);
    backdrop-filter: blur(2px);
`;
