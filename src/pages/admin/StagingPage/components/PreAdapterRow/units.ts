import styled from '@emotion/styled';

import { TableData } from 'components/ui';

export const OverflowContainer = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;

export const TableDataMaxWidth = styled(TableData)`
    & > div > div {
        width: 100%;
    }
`;

export const ChildPipelineStatusContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;

    width: 100%;
`;

export const ChildPipelineStatusItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
`;

export const SuccessText = styled.span`
    color: var(--color-status-success);
`;

export const ErrorText = styled.span`
    color: var(--color-status-error);
`;

export const InfoText = styled.span`
    color: var(--color-status-info);
`;
