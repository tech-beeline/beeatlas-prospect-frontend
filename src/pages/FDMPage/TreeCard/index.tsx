import React, { FC } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Icon, Icons, Skeleton } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

// import { StringParam, useQueryParam } from 'use-query-params';
// import { useRootStore } from 'stores/initStore';
// import { IResultCard } from './types';
import * as S from './units';

export const TreeCard: FC<any> = observer((props) => {
    // const {
    //     generalStore: { setResultTitle },
    // } = useRootStore();

    // const navigate = useNavigate();

    // const [, setTitle] = useQueryParam('title', StringParam);

    // const handleTextToBold = (text: string) => {
    //     if (props.search) {
    //         // const regEx = new RegExp(props.search, 'ig');

    //         return (
    //             text
    //                 .replaceAll(props.search.toLowerCase(), `<b>${props.search.toLowerCase()}</b>`)
    //                 // для слов с первой заглавной буквой
    //                 // toLowerCase если юзер допускает капс в запросе
    //                 .replaceAll(
    //                     props.search.charAt(0).toUpperCase() + props.search.slice(1).toLowerCase(),
    //                     `<b>${
    //                         props.search.charAt(0).toUpperCase() +
    //                         props.search.slice(1).toLowerCase()
    //                     }</b>`,
    //                 )
    //         );
    //     }

    //     return '';
    // };

    // const NewlineText = ({ str }: any) => {
    //     return str
    //         .split('\\r\\n' || '\\n' || '\\r' || '\n')
    //         .map((st: any, index: number) => (
    //             <p dangerouslySetInnerHTML={{ __html: handleTextToBold(st) }} key={index} />
    //         ));
    // };

    return (
        <S.Wrapper>
            {props.data ? (
                <>
                    {/* <a
                        href={`https://ms-seaapp001.bee.vimpelcom.ru/?guid=${props.data.guid}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    > */}

                    <S.TitleContainer onClick={() => props.setActiveFDMItem(props.data)}>
                        <Icon iconName={Icons.Reports} type="warning" />

                        <div>
                            <S.Title>{props.data.name}</S.Title>

                            <S.TitleSecond>{props.data.alias}</S.TitleSecond>
                        </div>
                    </S.TitleContainer>

                    <S.Text dangerouslySetInnerHTML={{ __html: props.data.descr }} />

                    {/* <S.TitleSecond>Домен</S.TitleSecond> */}
                    {/* <a
                        href={`https://ms-seaapp001.bee.vimpelcom.ru/?guid=${props.data.domainRef.guid}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <S.DomenText>{props.data.domainRef.name}</S.DomenText>
                    </a> */}

                    <S.FlexBlock>
                        <div>
                            <S.TitleSecond>Владелец</S.TitleSecond>
                            <S.Text>{props.data.owner || ''}</S.Text>
                        </div>

                        {/* <div>
                            <S.TitleSecond>Дата последнего изменения</S.TitleSecond>
                            <S.Text>{props.data.lastModified}</S.Text>
                        </div> */}
                    </S.FlexBlock>
                </>
            ) : (
                <>
                    <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                    <Skeleton height={37} width={663} margin={{ bottom: 16 }} />

                    <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                    <Skeleton height={37} width={663} margin={{ bottom: 16 }} />

                    <S.FlexBlock>
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
});
