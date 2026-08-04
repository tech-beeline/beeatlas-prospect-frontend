import styled from '@emotion/styled';

import { Button } from 'components/ui';

export const PageWrapper = styled.div`
    height: var(--app-height);

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Name = styled.div`
    width: max-content;
    max-width: 500px;
    height: var(--font-line-height-body2);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    color: var(--color-text-active);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Desription = styled.div`
    width: max-content;
    max-width: 500px;
    height: var(--font-line-height-body2);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    cursor: pointer;
`;

export const ButtonStyled = styled(Button)`
    pointer-events: auto !important;
`;

export const Content = styled.div`
    display: flex;
`;
