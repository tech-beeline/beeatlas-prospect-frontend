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

export const WideContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    box-sizing: border-box;
    width: var(--assessment-content-width);
    margin: 0 auto;
    padding: 32px 0;
`;

export const RequirementsGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 256px;
    align-items: start;
    gap: 32px;
`;

export const RequirementsContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    min-width: 0;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;

    scroll-margin-top: 24px;
`;

export const SideNavigation = styled.aside`
    position: sticky;
    top: 32px;

    align-self: start;
`;
