import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const Container = styled.div`
    position: relative;

    height: 24px;

    color: var(--color-text-active);
`;

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    right: 0;

    width: 100vw;
    height: 100vh;

    background-color: transparent;

    z-index: 1;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 40px;
    right: 0px;

    width: 440px;

    overflow: hidden;

    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-medium);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 2;
`;

export const Header = styled.div`
    padding: 16px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Content = styled.div`
    max-height: 356px;

    overflow-y: auto;
`;

export const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 125px 0px 90px;
`;

export const Subtitle3 = styled.div`
    margin-top: 16px;

    font-weight: var(--font-weight-subtitle3);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);

    color: var(--color-text-inactive);
`;

export const Body3 = styled.div`
    width: 260px;
    margin-top: 8px;

    text-align: center;

    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);
`;

export const ButtonContainer = styled.div`
    margin-top: 16px;
`;

export const Footer = styled.div`
    padding: 12px 24px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: end;
    gap: 16px;
`;

export const TooltipStyled = styled(Tooltip)`
    position: fixed;

    width: max-content;
    padding: 4px 8px;

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: 8px;

    font-weight: var(--font-weight-caption);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);

    z-index: 5;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-inactive);

    cursor: pointer;

    :hover {
        color: var(--color-text-active);
    }
`;
