import styled from '@emotion/styled';

import { Banner } from 'components/ui';

export const PageWrapper = styled.div`
    height: 100vh;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Title = styled.p`
    height: var(--font-line-height-subtitle1);

    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);
`;

export const Content = styled.div`
    position: relative;

    display: flex;

    max-height: calc(100vh - 64px);

    padding: 0px 150px 50px;

    overflow-y: scroll;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - 64px - 50px);
    width: 100%;

    padding-bottom: 100px;
`;

export const Body2 = styled.div<{ marginTop?: boolean; marginBottom?: boolean }>`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    white-space: pre-wrap;

    margin-top: ${({ marginTop }) => (marginTop ? '12px' : '0px')};
    margin-bottom: ${({ marginBottom }) => (marginBottom ? '18px' : '0px')};
`;

export const Body3 = styled.div<{ marginTop?: boolean }>`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);

    margin-top: ${({ marginTop }) => (marginTop ? '12px' : '0px')};
`;

export const Subtitle = styled.div<{ marginBottom?: boolean }>`
    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);

    margin-bottom: ${({ marginBottom }) => (marginBottom ? '12px' : '0px')};
`;

export const BannerStyled = styled(Banner)`
    margin-top: 24px;
`;

export const LabelsContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-top: 24px;
    margin-bottom: 20px;
`;

export const AttributesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    flex: 1;

    padding-bottom: 50px;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 300px;

    margin-top: 8px;
    margin-bottom: 8px;
`;

export const DataContainer = styled.div`
    flex: 1;
`;

export const Navigation = styled.div`
    position: sticky;
    top: 24px;

    height: 100%;

    flex-shrink: 1;

    margin-left: 40px;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 100%;

    margin-top: 24px;
`;

export const CJContainer = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 32px;

    height: ${({ open }) => (open ? 'auto' : '0px')};

    margin-top: ${({ open }) => (open ? '12px' : '0px')};

    overflow: hidden;

    transition: all 0.25s;
`;

export const FlexContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;
