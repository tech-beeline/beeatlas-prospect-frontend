import React, { FC } from 'react';
import { Skeleton } from '@beeline/design-system-react';
import DOMPurify from 'dompurify';

import { useIconOfItem } from 'hooks/useIconOfItem';

import { IResultCard } from './types';
import * as S from './units';

export const ResultCard: FC<IResultCard> = (props) => {
    // const {
    //     generalStore: { setResultTitle },
    // } = useRootStore();

    // const navigate = useNavigate();

    // const [, setTitle] = useQueryParam('title', StringParam);

    const icon = props.data && useIconOfItem(props.data.alias, props.data.stereotype);
    // console.log(props);

    const handleTextToBold = (text: string) => {
        if (props.request) {
            // const regEx = new RegExp(props.request, 'ig');

            return (
                (text ?? '')
                    .replaceAll(
                        props.request.toLowerCase(),
                        `<b>${props.request.toLowerCase()}</b>`,
                    )
                    // для слов с первой заглавной буквой
                    // toLowerCase если юзер допускает капс в запросе
                    .replaceAll(
                        props.request.charAt(0).toUpperCase() +
                            props.request.slice(1).toLowerCase(),
                        `<b>${
                            props.request.charAt(0).toUpperCase() +
                            props.request.slice(1).toLowerCase()
                        }</b>`,
                    )
            );
        }

        return '';
    };

    // const NewlineText = ({ str }: any) => {
    //     return str
    //         .split(/(https?:\/\/\S+)/ || '\\r\\n' || '\\n' || '\\r' || '\n')
    //         .map((st: any, index: number) => {
    //             return st.startsWith('https') ? (
    //                 <Link path={st}>{st}</Link>
    //             ) : (
    //                 <p dangerouslySetInnerHTML={{ __html: handleTextToBold(st) }} key={index} />
    //             );
    //         });
    // };

    return (
        <S.Wrapper className="ResultCardWrapper">
            {props.data ? (
                <>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {icon}

                        <div style={{ marginBottom: '12px' }}>
                            <a
                                // href={`https://ms-seaapp001.bee.vimpelcom.ru:83/index.php?m=1&o=${props.data.guid}`}
                                // href={`https://ms-seaapp001.bee.vimpelcom.ru/?guid=${props.data.guid}`}
                                href={`/models/fdm?id=${props.data.id}&domainId=${props.data.domain_ref.id}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <S.Title
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            handleTextToBold(props.data.name),
                                        ),
                                    }}
                                />
                            </a>

                            <S.TitleSecond className="TreeCardTitleSecond">
                                {props.data.alias}
                            </S.TitleSecond>
                        </div>
                    </div>

                    <S.Text
                        className="ResultCardText"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(handleTextToBold(props.data.descr)),
                        }}
                    >
                        {/* <NewlineText str={props.data.descr} /> */}
                    </S.Text>

                    <S.TitleSecond className="ResultCardTitleSecond" style={{ marginTop: '24px' }}>
                        Домен
                    </S.TitleSecond>

                    <a
                        // href={`https://ms-seaapp001.bee.vimpelcom.ru:83/index.php?m=1&o=${props.data.domain_ref?.guid}`}
                        href={`/models/fdm?id=${props.data.domain_ref.id}&domainId=${props.data.domain_ref.id}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <S.DomenText className="ResultCardDomenText">
                            {props.data.domain_ref?.name}
                        </S.DomenText>
                    </a>

                    <S.FlexBlock className="ResultCardFlexBlock">
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
                    </S.FlexBlock>
                </>
            ) : (
                <>
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
                </>
            )}
        </S.Wrapper>
    );
};
