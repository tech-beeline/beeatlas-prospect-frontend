import styled from '@emotion/styled';

export const Container = styled.div`
    padding: 20px 16px;
    min-width: 320px;
`;

export const Title = styled.h5`
    font-weight: var(--font-weight-h5);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    margin-top: 24px;
`;

export const Subtitle = styled.div`
    font-weight: var(--font-weight-subtitle2);
    font-size: var(--font-size-subtitle2);
    line-height: var(--font-line-height-subtitle2);
`;

export const DescriptionHeader = styled.div`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);

    margin-top: 12px;
`;

export const Description = styled.div`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const SubtitleMargin = styled(Subtitle)`
    margin-top: 24px;
`;

export const LastChanges = styled(Description)`
    margin-top: 12px;
`;

export const AppsContainer = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: ${({ open }) => (open ? 'auto' : '0px')};

    margin-top: ${({ open }) => (open ? '24px' : '0px')};

    overflow: hidden;

    transition: all 0.25s;
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
