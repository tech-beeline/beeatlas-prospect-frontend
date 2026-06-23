import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    flex: 1;
    min-width: 0;
`;

export const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
`;

export const DocumentationContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;
