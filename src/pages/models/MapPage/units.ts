import styled from '@emotion/styled';

import { Icon, Tabs } from 'components/ui';
export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    height: 100%;
    max-height: 100%;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-height: 100%;

    padding-top: 32px;
`;

export const InfoContainer = styled.div`
    flex: 0 1 auto;
    padding: 0px 32px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TabsStyled = styled(Tabs)`
    margin-top: 16px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-h4);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;

export const Description = styled.div<{ isExpanded: boolean }>`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body2);

    max-height: ${({ isExpanded }) =>
        isExpanded ? 'auto' : 'calc(var(--font-line-height-body2) * 2)'};

    overflow: hidden;
    text-overflow: ellipsis;

    margin-top: 12px;
    margin-bottom: 16px;
`;

export const ExpandButton = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    width: max-content;

    margin-top: 16px;

    font-weight: var(--font-weight-subtitle3);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);
    letter-spacing: var(--font-letter-spacing-subtitle3);

    color: var(--color-text-link);

    cursor: pointer;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 16px;

    margin-top: 24px;
`;

export const SubtitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;
`;

export const Subtitle = styled.div`
    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);
`;

export const CardContainer = styled.div`
    display: flex;
    gap: 24px;

    flex: 1 1 auto;

    padding: 0px 32px 32px 32px;

    margin-top: 24px;

    max-width: 100%;

    overflow-x: auto;
`;

export const CardGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    padding: 24px 32px 32px 32px;

    max-width: 100%;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin: 32px 0;
`;

export const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
`;
