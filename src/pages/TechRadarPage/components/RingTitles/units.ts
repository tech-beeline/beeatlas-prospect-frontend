import styled from '@emotion/styled';

export const RingTitle = styled.p<{
    top: number;
    left: number;
    type: 'hold' | 'assess' | 'trial' | 'adopt';
}>`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}%`};

    transform: translate(-50%, -50%);

    padding: 2px 8px;

    font-weight: 500;
    font-size: 14px;
    line-height: 14px;

    color: white;

    background-color: ${({ type }) =>
        type === 'adopt'
            ? '#78CE8E'
            : type === 'trial'
            ? '#FF9193'
            : type === 'assess'
            ? '#5cb5ff'
            : '#B6B7BF'};

    border-radius: 12px;

    transition: all 0.4s ease-in-out;

    text-transform: uppercase;

    user-select: none;

    cursor: pointer;
`;
