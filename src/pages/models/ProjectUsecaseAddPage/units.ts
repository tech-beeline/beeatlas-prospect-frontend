import styled from '@emotion/styled';

import { FileUploaderListItem, Table } from 'components/ui';

export const PageWrapper = styled.main`
    --usecase-content-width: min(910px, calc(100% - 64px));
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 1080px;
    height: var(--app-height);
    min-height: 640px;
    overflow: hidden;
    color: var(--color-text-active);
    background: var(--color-background-base);
`;

export const Header = styled.header`
    display: flex;
    flex: 0 0 64px;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border-bottom: 1px solid var(--color-divider);
`;

export const Subheader = styled.div`
    display: flex;
    flex: 0 0 56px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-divider);
`;

export const ScrollArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    width: var(--usecase-content-width);
    margin: 0 auto;
    padding: 32px 0 48px;
`;

export const Form = styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`;

export const FormFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ChoiceRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const FieldsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
`;

export const FileRow = styled.div`
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 12px;
`;

export const FileInfo = styled.div`
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 16px;
`;

export const FileUploaderListItemStyled = styled(FileUploaderListItem)`
    padding: 0;
    width: 32px;

    .dsb_file-uploader-file-delete {
        display: none;
    }
`;

export const FileName = styled.div`
    min-width: 0;
    margin-left: -32px;
    overflow-wrap: anywhere;
`;

export const FileMetadata = styled.div`
    margin-top: 4px;
    color: var(--color-text-inactive);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
`;

export const FileActions = styled.div`
    display: flex;
    flex: 0 0 auto;
    gap: 8px;
`;

export const Footer = styled.footer`
    flex: 0 0 auto;
    border-top: 1px solid var(--color-divider);
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    box-sizing: border-box;
    width: var(--usecase-content-width);
    margin: 0 auto;
    padding: 16px 0 24px;
`;

export const Processing = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
`;

export const Summary = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
`;

export const SummaryCard = styled.div<{ $semantic: 'success' | 'warning' | 'neutral' }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border: 1px solid
        ${({ $semantic }) =>
            $semantic === 'success'
                ? 'var(--color-status-success)'
                : $semantic === 'warning'
                ? 'var(--color-status-warning)'
                : 'var(--color-divider)'};
    border-radius: var(--size-border-radius-x6);
    background: ${({ $semantic }) =>
        $semantic === 'success'
            ? 'var(--color-status-success-background)'
            : $semantic === 'warning'
            ? 'var(--color-status-warning-background)'
            : 'var(--color-background-base)'};
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const UnmappedCard = styled.article`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const Option = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x4);
`;

export const OptionLabel = styled.span`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-left: 12px;
    text-align: left;
`;

export const ResolutionFields = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 16px;
`;

export const ResolutionFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const NotFound = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;
