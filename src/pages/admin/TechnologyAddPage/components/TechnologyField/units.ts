import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const FormRow = styled.div`
    display: flex;
    gap: 24px;
`;

export const GrowContainer = styled.div`
    flex: 1;
`;

export const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: -20px;
`;

export const BannerContainer = styled.div`
    display: flex;
    gap: 16px;

    background-color: var(--color-status-info-background);

    padding: 16px;

    border-radius: var(--size-border-radius-x8);
`;

export const UploadedFileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FileContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 300px;

    background-color: var(--color-status-neutral-background);

    border-radius: var(--size-border-radius-x6);
`;

export const FileNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
