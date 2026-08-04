import styled from '@emotion/styled';

import { FileUploaderListItem, Icon, TableData, TableHeaderData } from 'components/ui';
export const PageWrapper = styled.div`
    width: 100%;
    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TemplatesContainer = styled.div<{ restrictHeight: boolean }>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    ${({ restrictHeight }) => (restrictHeight ? 'max-height: 90px;' : '')}
    overflow: hidden;
`;

export const TemplateCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    min-width: 262px;
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const FileUploaderListItemStyled = styled(FileUploaderListItem)`
    padding: 0px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ExpandButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: fit-content;
    padding: 0;

    outline: none;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;

export const TableHeaderDataMaxWidth = styled(TableHeaderData)`
    width: 100%;
`;

export const TableDataMinWidth = styled(TableData)`
    min-width: 150px;
`;

export const FileNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 84px;
`;
