import { Tooltip } from 'react-tooltip';
import {
    FileUploaderListItem,
    Icon,
    TableData,
    TableHeaderData,
} from '@beeline/design-system-react';
import styled from '@emotion/styled';

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
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    ${({ restrictHeight }) => (restrictHeight ? 'max-height: 90px;' : '')}
    overflow: hidden;

    @media only screen and (max-width: 1280px) {
        grid-template-columns: repeat(3, 1fr);
    }
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

export const TooltipContainer = styled(Tooltip)<{ largePadding?: boolean }>`
    max-width: 300px;
    width: max-content;
    padding: ${({ largePadding }) => (largePadding ? '16px' : '4px 8px')};

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: ${({ largePadding }) =>
        largePadding ? 'var(--size-border-radius-x8)' : 'var(--size-border-radius-x4)'};

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;
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
