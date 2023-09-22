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

export const Subtitle = styled.div`
    font-weight: var(--font-weight-subtitle1);
    font-size: var(--font-size-subtitle1);
    line-height: var(--font-line-height-subtitle1);
`;

export const Subtitle3 = styled.div`
    font-weight: var(--font-weight-subtitle3);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);
`;

export const SubtitleFlexWrapper = styled(FlexWrapper)`
    margin-top: 40px;
`;

export const SubtitleFlexWrapper2 = styled(FlexWrapper)`
    margin-top: 32px;
`;

export const BIFlexWrapper = styled(FlexWrapper)`
    padding: 12px 0px;
`;

export const Body2 = styled.div`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const Body3 = styled.div`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);
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

export const LabelsContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-top: 24px;
    margin-bottom: 20px;
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
