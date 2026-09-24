import React, { FC } from 'react';

import { Text } from 'components/core';
import { Badge, Button } from 'components/ui';

import { IProjectAgent } from 'api/projects/types';

import * as S from './units';

interface IAgentCardProps {
    agent: IProjectAgent;
    hasDraft?: boolean;
    onRun: (agent: IProjectAgent) => void;
}

export const AgentCard: FC<IAgentCardProps> = ({ agent, hasDraft = false, onRun }) => {
    const handleRun = () => onRun(agent);

    return (
        <S.Card>
            <S.TitleRow>
                <Text link pointer variant="h6" onClick={handleRun}>
                    {agent.name}
                </Text>
                {hasDraft && <Badge semantic="info">В процессе</Badge>}
            </S.TitleRow>
            <Text inactive variant="body2">
                {agent.description}
            </Text>
            <S.ButtonContainer>
                <Button size="small" variant="outlined" onClick={handleRun}>
                    Запустить агента
                </Button>
            </S.ButtonContainer>
        </S.Card>
    );
};
