import styled from '@emotion/styled';

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    width: 100%;
`;

export const MenuButton = styled.button<{ isActive: boolean }>`
    padding: 7px 12px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    background-color: ${({ isActive }) => (isActive ? '#fdd835' : 'rgba(25, 28, 52, 0.1)')};

    border-radius: 32px;

    transition: background-color 0.25s ease-in-out;

    @media (hover: hover) {
        &:hover {
            background-color: ${({ isActive }) => !isActive && 'rgba(253, 216, 53, 0.5)'};
        }
    }
`;
