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
    font-weight: 500;
    font-size: var(--font-size-body2);
    line-height: 22px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textLink};

    cursor: pointer;
`;

export const Text = styled(Title)`
    font-weight: 400;
    white-space: pre-wrap;

    color: ${theme.colors.textActive};

    cursor: inherit;

    overflow: hidden;
`;

export const TitleSecond = styled.p`
    font-weight: 400;
    font-size: var(--font-size-body3);
    line-height: 18px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;

export const DomenText = styled(Title)`
    font-weight: 400;
`;

export const FlexBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;
