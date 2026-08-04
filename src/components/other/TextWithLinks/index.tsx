import React, { FC } from 'react';

import * as S from './units';

export const TextWithLinks: FC<{ text: string }> = ({ text }) => {
    const isLink = (word: string) => word.startsWith('http://') || word.startsWith('https://');

    const processText = (text: string) => {
        const textArray = text.split(/(\n|https?:\/\/\S+)/);

        return textArray.map((word, index) => {
            if (word === '\n') {
                return <br key={index} />;
            }

            if (isLink(word)) {
                return (
                    <S.TargetLink key={index} href={word} target="_blank" rel="noopener noreferrer">
                        {word}
                    </S.TargetLink>
                );
            }

            return <span key={index}>{word} </span>;
        });
    };

    return <S.Wrapper>{processText(text)}</S.Wrapper>;
};
