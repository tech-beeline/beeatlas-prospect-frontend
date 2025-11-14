import styled from '@emotion/styled';

export const NotFoundBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`;

export const Image = styled.img<{ setMinSize: boolean; smallImage: boolean }>`
    ${({ setMinSize }) => (setMinSize ? 'min-width: 200px;' : '')}
    ${({ setMinSize }) => (setMinSize ? 'min-height: 200px;' : '')}

    ${({ smallImage }) => (smallImage ? 'max-width: 88px;' : '')}
    ${({ smallImage }) => (smallImage ? 'max-height: 88px;' : '')}
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.div`
    font-weight: var(--font-weight-subtitle2);
    font-size: var(--font-size-subtitle2);
    line-height: var(--font-line-height-subtitle2);
    letter-spacing: var(--font-letter-spacing-subtitle2);
    text-align: center;
`;

export const Text = styled.div<{ marginTop?: boolean }>`
    color: var(--color-text-inactive);

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body2);
    text-align: center;

    margin-top: ${({ marginTop }) => (marginTop ? '8px' : '0px')};
`;

export const ButtonContainer = styled.div`
    margin-top: 24px;
`;
