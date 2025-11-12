import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 320px;
    min-width: 320px;
    height: 100%;

    border-left: 1px solid var(--color-divider);

    z-index: 99;
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: calc(100% - 81px);

    padding: 20px 16px;

    overflow: auto;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;

    padding: 16px;

    border-top: 1px solid var(--color-divider);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
