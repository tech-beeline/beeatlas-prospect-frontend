import styled from '@emotion/styled';

export const StepLayout = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    min-height: 0;
`;

export const StepScroll = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
`;

export const NarrowContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    box-sizing: border-box;
    width: var(--assessment-content-width);
    margin: 0 auto;
    padding: 32px 0;
`;

export const BlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const MarginContainer = styled.div`
    margin-top: 16px;
`;
