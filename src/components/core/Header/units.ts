import { Icon, Search } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { theme } from 'styles';

// TODO: с токенами
export const Container = styled.div`
    position: fixed;

    display: flex;
    align-items: center;

    width: 100%;
    height: 64px;
    padding: 18px 24px;

    font-weight: 500;
    font-size: 25px;
    line-height: 28px;

    background-color: ${theme.colors.backgroundLow};
    color: rgba(25, 28, 52, 0.7);

    border-bottom: 1px solid ${theme.colors.divider};

    z-index: 100;
`;

export const BaseIcon = styled(Icon)`
    color: ${theme.colors.textInactive};

    user-select: none;
    cursor: pointer;
`;

export const MenuIconStyled = styled(BaseIcon)`
    position: fixed;
    top: 86px;
    left: 24px;
`;

export const Title = styled.p`
    margin-right: 20px;

    color: ${theme.colors.textInactive};
`;

export const ControlPanel = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    margin-left: auto;
`;

export const SearchStyled = styled(Search)`
    margin-right: 16px;
`;
