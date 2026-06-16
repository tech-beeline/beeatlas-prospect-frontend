import styled from '@emotion/styled';

import { ProgressButton } from 'components/ui';
import { Banner } from 'components/ui';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100vh;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 20px 16px;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ErrorContainer = styled.div`
    color: var(--color-status-error);

    padding-left: 68px;
    margin-top: -8px;
`;

export const BannerStyled = styled(Banner)`
    overflow: hidden;
    overflow-wrap: anywhere;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    padding: 16px 16px 24px;

    border-top: 1px solid var(--color-divider);
`;

export const ProgressButtonStyled = styled(ProgressButton)<{ showProgress: boolean }>`
    .dsb-button-progress__svg {
        display: ${({ showProgress }) => (showProgress ? 'block' : 'none')};
    }
`;
