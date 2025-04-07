import styled from '@emotion/styled';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100vh;
`;

export const ContentContainer = styled.div`
    padding: 20px 16px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;

    padding: 16px 16px 24px;

    border-top: 1px solid var(--color-divider);
`;
