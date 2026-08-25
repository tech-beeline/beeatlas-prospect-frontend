import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    max-height: 100vh;

    padding: 24px;

    overflow-y: auto;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const RawDataContainer = styled.div`
    padding: 16px;

    background-color: var(--color-control-background);
    border-radius: 12px;

    text-overflow: ellipsis;
    white-space: break-spaces;
    max-width: 100%;
`;
