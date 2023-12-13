import styled from '@emotion/styled';

export const NotFoundBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`;

export const Image = styled.img`
    min-width: 200px;
    min-height: 200px;
`;

export const Text = styled.div`
    color: var(--color-text-inactive);

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body2);
    text-align: center;
`;
