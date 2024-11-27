import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px 68px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
    gap: 24px;

    margin-top: 24px;
`;

export const CardColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 100px;
`;
