import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 8px;
`;

export const Image = styled.img`
    width: 100px;
    height: 100px;
`;

export const Title = styled.div`
    margin-top: 16px;

    text-align: center;

    font-size: var(--font-size-h6);
    font-weight: var(--font-weight-h6);
    line-height: var(--font-line-height-h6);
    letter-spacing: var(--font-letter-spacing-h6);
`;

export const Subtitle = styled.div`
    margin-top: 8px;

    color: var(--color-text-inactive);

    font-size: var(--font-size-body2);
    font-weight: var(--font-weight-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body2);
`;
