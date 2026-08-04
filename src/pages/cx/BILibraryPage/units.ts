import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    position: relative;

    width: 100%;
    height: 100%;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px;

    overflow: auto;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const FiltersContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
    gap: 24px;

    margin: 24px 0;
`;
export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: space-between;
    min-width: 0;
`;

export const ToggleContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 0;
`;

export const ButtonContainer = styled.div`
    display: flex;

    gap: 24px;
`;

export const CardContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
    gap: 24px;

    margin-top: 24px;
`;

export const BITableContainer = styled.div`
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
