import { FileUploaderListItem } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;
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
    gap: 4px;
`;

export const FileUploaderListItemWrapper = styled(FileUploaderListItem)`
    > div > div > div {
        width: 0;
    }
`;
