import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const GeneralInfo = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const SearchContainer = styled.div`
    max-width: 648px;

    margin: 8px 0px;
`;
