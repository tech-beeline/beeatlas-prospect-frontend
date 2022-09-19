import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    background-color: #fff4e1;
    color: #ff9419;

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;

    border-radius: ${theme.borderRadius};

    user-select: none;
    cursor: pointer;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 64px;
    right: 24px;

    width: 280px;
    height: 125px;

    border-radius: ${theme.borderRadius};

    background-color: ${theme.colors.backgroundLow};

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    user-select: none;
    cursor: pointer;

    z-index: 10;

    & > *:first-child {
        border-bottom: 1px solid ${theme.colors.divider};
    }
`;

export const DropdownItem = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 50%;
    padding: 20px 16px;

    color: ${theme.colors.backgroundInverse};

    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
`;
