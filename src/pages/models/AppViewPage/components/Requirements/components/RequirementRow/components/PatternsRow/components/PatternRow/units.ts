import { TableData } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const PatternContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 48px;
`;

export const TableDataStyled = styled(TableData)`
    position: relative;
    padding: 0px;
    padding-left: 84px;

    & > div > div {
        width: 100%;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background-color: var(--color-background-brand);
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RequirementTitle = styled.div`
    margin-top: 12px;
    margin-bottom: 8px;
`;

export const RequirementContainer = styled.div`
    padding: 12px 0;
`;
