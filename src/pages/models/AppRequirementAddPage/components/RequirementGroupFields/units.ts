import styled from '@emotion/styled';

export const GroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const GroupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const GroupCard = styled.div`
    width: 100%;
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const RequirementsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const RequirementRow = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start;
`;

export const SelectContainer = styled.div`
    flex: 1;
`;

export const IconButtonContainer = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
`;
