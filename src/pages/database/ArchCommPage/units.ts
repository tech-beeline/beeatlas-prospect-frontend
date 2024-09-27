import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { GrayText, H4 } from 'styles/units';

import { HumanCard } from './HumanCard';

export const PageWrapper = styled.div`
    padding: 52px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 50%;
`;

export const H3 = styled.h3`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

    width: 798px;
    margin: 0 0 12px;
`;

export const GrayTextStyled = styled(GrayText)`
    margin-bottom: 32px;
`;

export const H4Styled = styled(H4)`
    margin-bottom: 12px;
`;

export const List = styled.ul`
    margin-bottom: 50px;
`;

export const BorderContainerStyled = styled(BorderContainer)`
    margin-bottom: 24px;
`;

export const HumanCardStyled = styled(HumanCard)`
    gap: 0;
`;

export const H4mb40Styled = styled(H4)`
    margin-bottom: 40px;
`;
