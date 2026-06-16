import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100vh;
    padding: 24px;
    overflow-y: auto;
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 0 16px;
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 240px;
    gap: 4px;
`;

export const FileNameWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;
