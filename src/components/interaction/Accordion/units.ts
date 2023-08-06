import styled from '@emotion/styled';

import { Expand } from 'components/other';

export const Container = styled.div`
    height: max-content;
    width: 100%;
    /* padding: 24px 0; */

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x8);

    & > *:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TitleBlock = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 80px;
    width: 100%;

    padding: 0 24px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    cursor: pointer;
`;

export const ExpandStyled = styled(Expand)`
    padding: 24px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);
`;

export const TextBlock = styled.div`
    display: inline;
`;
