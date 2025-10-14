import styled from '@emotion/styled';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    overflow: auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const NotFoundContainer = styled.div`
    margin-top: 130px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;

    padding: 16px 24px 24px 24px;

    border-top: 1px solid var(--color-divider);
`;
