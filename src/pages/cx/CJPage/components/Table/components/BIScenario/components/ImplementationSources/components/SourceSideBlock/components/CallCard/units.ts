import styled from '@emotion/styled';

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Value = styled.div`
    overflow-wrap: anywhere;
`;
