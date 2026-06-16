import styled from '@emotion/styled';

export const NoFoundBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    width: 410px;
    margin-top: 30px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
    text-align: center;
`;

export const Image = styled.img`
    min-width: 150px;
    min-height: 150px;
    max-width: 150px;
    max-height: 150px;
`;
