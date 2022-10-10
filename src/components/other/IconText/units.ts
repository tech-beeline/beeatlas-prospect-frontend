import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isSecondary: boolean }>`
    display: flex;

    ${({ isSecondary }) =>
        !isSecondary
            ? css`
                  align-items: center;
                  gap: 12px;

                  font-weight: 700;
                  font-size: 17px;
                  line-height: 22px;
                  letter-spacing: 0.2px;
              `
            : css`
                  gap: 16px;

                  font-weight: 400;
                  font-size: 19px;
                  line-height: 24px;
                  letter-spacing: 0.2px;

                  color: ${theme.colors.textInactive};
              `}
`;

export const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    width: 40px;
    height: 40px;

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.2px;

    background-color: ${theme.colors.info};
    color: ${theme.colors.textInfo};

    border-radius: 12px;
`;
