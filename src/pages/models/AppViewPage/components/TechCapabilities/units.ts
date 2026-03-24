import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    flex: 1;
`;

export const SearchContainer = styled.div`
    flex: 1;
    max-width: 648px;
`;

export const CardsContainer = styled.div<{ grid: boolean }>`
    display: grid;
    grid-template-columns: repeat(${({ grid }) => (grid ? 3 : 1)}, 1fr);
    gap: 24px;
`;

export const CardsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 80px;
`;
