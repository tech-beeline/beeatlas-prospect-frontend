import { Divider } from '@beeline/design-system-react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    color: ${theme.colors.warning};
    background-color: ${theme.colors.backgroundWarning};

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;

    border-radius: ${theme.borderRadius};

    user-select: none;
    cursor: pointer;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 52px;
    right: 24px;

    width: 280px;
    height: 171px;
    padding: 8px 0;

    border-radius: ${theme.borderRadius};

    background-color: ${theme.colors.backgroundLow};

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

    color: ${theme.colors.backgroundInverse};

    font-weight: 400;
    font-size: 17px;
    line-height: 22px;

    &:hover {
        background-color: ${theme.colors.backgroundHover};
    }
`;

export const DividerStyled = styled(Divider)`
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
