import React, { FC } from 'react';
import DOMPurify from 'dompurify';

import { Icon, Skeleton } from 'components/ui';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { ItemTypes } from 'pages/models/FDMPage/store/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

// import { useIconOfItem } from 'hooks/useIconOfItem';
import { IResultCard } from './types';
import * as S from './units';

export const ResultCard: FC<IResultCard> = ({ data, request }) => {
    const handleTextToBold = (text: string) => {
        if (request) {
            return (
                (text ?? '')
                    .replaceAll(request.toLowerCase(), `<b>${request.toLowerCase()}</b>`)
                    // для слов с первой заглавной буквой
                    // toLowerCase если юзер допускает капс в запросе
                    .replaceAll(
                        request.charAt(0).toUpperCase() + request.slice(1).toLowerCase(),
                        `<b>${
                            request.charAt(0).toUpperCase() + request.slice(1).toLowerCase()
                        }</b>`,
                    )
            );
        }

        return '';
    };

    return (
        <S.Wrapper className="ResultCardWrapper">
            <div style={{ display: 'flex', gap: '8px' }}>
                <Icon
                    iconName={Icons.Capability}
                    type={
                        data.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY
                            ? 'warning'
                            : 'info'
                    }
                />

                <div style={{ marginBottom: '12px' }}>
                    <a
                        href={`/models/fdm?id=${data.id}&type=${
                            data.type === CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY
                                ? ItemTypes.BUSINESS
                                : ItemTypes.TECH
                        }`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <S.Title
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(handleTextToBold(data.name)),
                            }}
                        />
                    </a>

                    <S.TitleSecond className="TreeCardTitleSecond">{data.code}</S.TitleSecond>
                </div>
            </div>

            <S.Text
                className="ResultCardText"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(handleTextToBold(data.description)),
                }}
            >
                {/* <NewlineText str={props.data.descr} /> */}
            </S.Text>

            {/* <S.TitleSecond className="ResultCardTitleSecond" style={{ marginTop: '24px' }}>
                Домен
            </S.TitleSecond> */}

            {/* <a
                href={`/models/fdm?id=${props.data.domain_ref.id}&domainId=${props.data.domain_ref.id}`}
                rel="noopener noreferrer"
                target="_blank"
            >
                <S.DomenText className="ResultCardDomenText">
                    {props.data.domain_ref?.name}
                </S.DomenText>
            </a> */}

            {/* <S.FlexBlock className="ResultCardFlexBlock">
                <div>
                    <S.TitleSecond className="ResultCardTitleSecond">
                        {props.data.owner && 'Владелец'}
                    </S.TitleSecond>

                    <S.Text className="ResultCardText">{props.data.owner || ''}</S.Text>
                </div>

                <div>
                    <S.TitleSecond className="ResultCardTitleSecond">
                        Дата последнего изменения
                    </S.TitleSecond>
                    <S.Text className="ResultCardText">{props.data.last_modified}</S.Text>
                </div>
            </S.FlexBlock> */}
        </S.Wrapper>
    );
};

export const ResultCardSkeleton = () => (
    <S.Wrapper className="ResultCardWrapper">
        <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
        <Skeleton height={37} width={663} margin={{ bottom: 16 }} />

        <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
        <Skeleton height={37} width={663} margin={{ bottom: 16 }} />

        <S.FlexBlock className="ResultCardFlexBlock">
            <div>
                <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                <Skeleton height={37} width={323} />
            </div>

            <div>
                <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                <Skeleton height={37} width={323} />
            </div>
        </S.FlexBlock>
    </S.Wrapper>
);
