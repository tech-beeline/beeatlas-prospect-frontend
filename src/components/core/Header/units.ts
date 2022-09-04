import { Search } from '@beeline/lk-ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

import { ReactComponent as DashboardSVG } from './images/dashboard.svg';
import { ReactComponent as NotificationSVG } from './images/notification.svg';
import { ReactComponent as ProfileSVG } from './images/profile.svg';
import { ReactComponent as ThemeSVG } from './images/theme.svg';

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

const controlButtonStyle = css`
    cursor: pointer;
    user-select: none;
`;

export const ThemeIcon = styled(ThemeSVG)`
    ${controlButtonStyle};

    & > path {
        fill: ${theme.colors.textInactive};
    }
`;
export const NotificationIcon = styled(NotificationSVG)`
    ${controlButtonStyle};

    & > path {
        fill: ${theme.colors.textInactive};
    }
`;

export const DashboardIcon = styled(DashboardSVG)`
    ${controlButtonStyle};

    & > path {
        fill: ${theme.colors.textInactive};
    }
`;

export const ProfileIcon = styled(ProfileSVG)`
    ${controlButtonStyle};

    & > path:nth-child(1) {
        fill: ${theme.colors.backgroundControl};
    }
`;
