import styled from '@emotion/styled';

import { Icon, Label, Search } from 'components/ui';
export const Container = styled.div`
    position: fixed;

    display: flex;
    align-items: center;

    width: 100%;
    height: 64px;
    padding: 18px 24px;

    font-weight: var(--font-weight-medium);
    /* TODO: нет такого токена */
    font-size: 25px;
    line-height: var(--font-line-height-product-name);

    background-color: var(--color-background-base);
    color: rgba(25, 28, 52, 0.7);

    border-bottom: 1px solid var(--color-divider);

    z-index: 100;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 48px;

    cursor: pointer;
`;

export const LabelStyled = styled(Label)`
    margin-left: -24px;
`;

export const BaseIcon = styled(Icon)`
    color: var(--color-text-inactive);

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

    color: var(--color-text-inactive);
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

export const LinksContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const Link = styled.div`
    display: flex;
    gap: 8px;

    cursor: pointer;

    color: var(--color-text-link);
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;
