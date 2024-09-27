import { Banner, Tabs } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TitleFlexWrapper = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    gap: 16px;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const SelectSubtitle = styled.div`
    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);
`;

export const Subtitle = styled.div`
    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);

    margin-bottom: 8px;
`;

export const Subtitle3 = styled.div`
    font-weight: var(--font-weight-subtitle3);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);
`;

export const SubtitleFlexWrapper = styled(FlexWrapper)`
    margin-top: 24px;
`;

export const SubtitleFlexWrapper2 = styled(FlexWrapper)`
    margin-top: 32px;
`;

export const BIContainer = styled.div`
    margin-top: 24px;
`;

export const BIFlexWrapper = styled(FlexWrapper)`
    padding: 12px 0px;
`;

export const Body2 = styled.div<{ marginBottom?: boolean }>`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    white-space: pre-wrap;

    margin-bottom: ${({ marginBottom }) => (marginBottom ? '18px' : '0px')};
`;

export const Body3 = styled.div<{ marginTop?: boolean }>`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);

    margin-top: ${({ marginTop }) => (marginTop ? '12px' : '0px')};
`;

export const TabsContainer = styled.div`
    margin-top: 24px;
`;

export const TabsStyled = styled(Tabs)`
    // Убрать скролл кнопки в табах
    & > div > div > button {
        display: none;
    }
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    padding-top: 24px;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    height: 96px;
    padding: 24px 16px;
`;

export const FlexContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 320px;
    min-height: 100%;
`;

export const ButtonsContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    height: 96px;
    padding: 24px 16px;

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
`;

export const Content = styled.div<{ hasButtons: boolean }>`
    height: ${({ hasButtons }) => (hasButtons ? 'calc(100vh - 96px)' : '100vh')};
    padding: 20px 16px;

    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const Padding = styled.div`
    padding: 20px 16px;
`;

export const LabelsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-top: 24px;
    margin-bottom: 20px;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: 36px;
`;

export const EmptyState = styled.div`
    margin-top: 18px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

export const Subtitle3Inactive = styled(Subtitle3)`
    color: var(--color-text-inactive);
`;

export const AttributesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 8px;
    margin-bottom: 8px;
`;

export const BannerStyled = styled(Banner)`
    margin: 24px 0px;
`;
