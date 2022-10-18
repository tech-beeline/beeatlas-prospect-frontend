import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    width: 711px;
    padding: 24px;

    border: 1px solid ${theme.colors.divider};
    border-radius: ${theme.borderRadius};
`;

export const Title = styled.p`
    margin-bottom: 12px;

    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textLink};
`;

export const Text = styled(Title)`
    font-weight: 400;

    color: ${theme.colors.textActive};
`;

export const TitleSecond = styled.p`
    font-weight: 400;
    font-size: 15px;
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
