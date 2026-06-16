import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
    padding: 0px 54px 54px;

    color: var(--color-text-active);
`;

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;
`;

export const Content = styled.div`
    width: 740px;
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
    gap: 24px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    margin-top: 8px;

    padding-bottom: 32px;
`;
