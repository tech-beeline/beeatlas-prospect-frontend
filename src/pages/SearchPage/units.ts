import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    min-height: 100vh;
    padding: 124px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    width: 717px;
    height: 100%;
    min-width: 700px;

    text-align: justify;
`;

export const H4 = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    letter-spacing: var(--font-letter-spacing-body3);

    margin-bottom: 8px;
`;

export const SearchContainer = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    margin-top: 32px;
`;

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
