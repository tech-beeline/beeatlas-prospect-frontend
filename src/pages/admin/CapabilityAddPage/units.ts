import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    padding: 0px 54px 54px;
`;

export const Content = styled.div`
    width: 100%;
    padding: 0px 128px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    margin-top: 32px;
    margin-bottom: 24px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    color: var(--color-text-active);
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    margin-top: 8px;
`;

export const Subtitle = styled.div`
    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);

    margin-bottom: -8px;
`;
