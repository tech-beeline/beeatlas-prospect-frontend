import React, { FC } from 'react';

import { Text } from 'components/core';
import { Button } from 'components/ui';

import { IProjectAgent } from 'api/projects/types';

import * as S from './units';

interface IAgentCardProps {
    agent: IProjectAgent;
    onRun: (agent: IProjectAgent) => void;
}

export const AgentCard: FC<IAgentCardProps> = ({ agent, onRun }) => {
    return (
        <S.Card>
            <Text variant="h6">{agent.name}</Text>
            <Text inactive variant="body2">
                {agent.description}
            </Text>
            <S.ButtonContainer>
                <Button size="small" variant="outlined" onClick={() => onRun(agent)}>
                    Запустить агента
                </Button>
            </S.ButtonContainer>
        </S.Card>
    );
};
