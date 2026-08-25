import styled from '@emotion/styled';

import { Divider } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StepsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const Step = styled.div`
    display: flex;
    flex-grow: 1;
    gap: 8px;
`;

export const StepContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const StepHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

export const TimeContainer = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
`;

export const SubtitleText = styled.div`
    padding-left: 34px;
`;

export const DividerStyled = styled(Divider)`
    flex-grow: 0;
`;
