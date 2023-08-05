import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    width: 715px;
    padding: 24px;

    border: 1px solid ${theme.colors.divider};
    border-radius: var(--size-border-radius-x6);

    /* overflow: hidden; */
`;

export const Title = styled.div`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body2);
    line-height: 22px;
    letter-spacing: var(--font-letter-spacing-body3);

    color: ${theme.colors.textLink};

    cursor: pointer;
`;

export const Text = styled(Title)`
    font-weight: var(--font-weight-regular);
    white-space: pre-wrap;

    color: ${theme.colors.textActive};

    cursor: inherit;

    overflow: hidden;
`;

export const TitleSecond = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: 18px;
    letter-spacing: var(--font-letter-spacing-body3);

    color: ${theme.colors.textInactive};
`;

export const DomenText = styled(Title)`
    font-weight: var(--font-weight-regular);
`;

export const FlexBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;
