import styled from '@emotion/styled';

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const MySpaceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;

    @media only screen and (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const SpaceCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    min-height: 178px;
    padding: 24px;

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: var(--size-border-radius-x6);
`;

export const SpaceCardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const SpaceCardBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
`;

export const AppsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1;
`;

export const AppContainer = styled.div`
    cursor: pointer;
`;

export const ButtonStyled = styled.button`
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;

    height: 18px;
    padding: 0px;

    color: var(--color-text-link);
    & > span {
        color: var(--color-text-link);
    }
`;
