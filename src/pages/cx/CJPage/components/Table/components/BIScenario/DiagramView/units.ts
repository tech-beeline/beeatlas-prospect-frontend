import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ModalTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 16px;
    width: 100%;
    border-bottom: 1px solid var(--color-border);
`;

export const ButtonsWrapper = styled.div<{ gap?: string }>`
    display: flex;
    gap: ${({ gap }) => (gap ? `${gap}px` : '')};
    align-items: center;
`;

export const ButtonsWrapperRow = styled(ButtonsWrapper)`
    flex-direction: row-reverse;

    padding: 8px 16px;

    border-bottom: 1px solid var(--color-border);
`;

export const Content = styled.div<{ center?: boolean }>`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 24px;
    display: flex;
    ${({ center }) =>
        center
            ? css`
                  justify-content: center;
                  align-items: center;
              `
            : css`
                  justify-content: flex-start;
                  align-items: flex-start;
              `}
`;

export const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;
`;

export const PreWrapper = styled.pre`
    white-space: pre-wrap;
    word-break: break-word;
`;

export const ImgStyled = styled.img`
    width: 100%;
    height: auto;
    overflow: auto;
`;
