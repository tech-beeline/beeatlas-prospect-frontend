import React, { FC } from 'react';

import { Expand } from 'components/other';

import { IData } from 'pages/TechRadarPage/types';

import { Hint } from './Hint';
import * as T from './types';
import * as S from './units';

export const MenuElement: FC<T.IMenuElement> = (props) => {
    const formatData = (quadrantData: IData[]) => {
        const hold = quadrantData.filter((item) => item.ring === 3);
        const assess = quadrantData.filter((item) => item.ring === 2);
        const trial = quadrantData.filter((item) => item.ring === 1);
        const adopt = quadrantData.filter((item) => item.ring === 0);

        return [
            {
                title: 'Adopt',
                data: adopt,
                hintText:
                    'Активно используем, применяем в продуктиве, обеспечиваем автоматизацию в процессе сборки и поставки. Можем предоставить экспертную поддержку',
            },
            {
                title: 'Trial',
                data: trial,
                hintText:
                    'Одна или несколько команд использует данную технологию в продуктиве и остальные команды могут применять в своих продуктах.',
            },
            {
                title: 'Assess',
                data: assess,
                hintText:
                    'Детально изучаем, чтобы оценить, как применение элемента или технологии повлияет на наш ИТ-ландшафт. В продуктиве пока не используем и экспертизой технология не обеспечена.',
            },
            {
                title: 'Hold',
                data: hold,
                hintText:
                    'При необходимости продолжаем использовать, но стараемся заменить на альтернативные технологии. Не используем для новых продуктов.',
            },
        ];
    };

    /* показывает тултип */
    const onHintShow = (label: string) => {
        props.setHintText(label);

        props.setHoverInMenu(true);
    };

    /* скрывает тултип */
    const onHintHide = () => {
        props.setHintText('');

        props.setHoverInMenu(false);
    };

    const selectedRingDataLenght = formatData(props.data).find(
        (item) => props.activeRing === item.title.toLowerCase(),
    )?.data.length;

    const conditionForTitle = !!props.activeRing ? !!selectedRingDataLenght : true;

    return (
        <div className="menuBlock">
            {conditionForTitle && (
                <S.TitleWrapper onClick={() => props.setOpen(!props.isOpen)}>
                    <S.Title>{props.title}</S.Title>

                    <S.ArrowIcon isreverse={props.isOpen ? 'true' : ''} />
                </S.TitleWrapper>
            )}

            <Expand isOpen={props.isOpen} isAutoHeight>
                {formatData(props.data).map((item, index) =>
                    !!props.activeRing
                        ? props.activeRing === item.title.toLowerCase() &&
                          !!item.data.length && (
                              <S.Wrapper key={index}>
                                  <S.TitleWrapper>
                                      <S.TitleSmaller>{item.title}</S.TitleSmaller>

                                      <Hint text={item.hintText} />
                                  </S.TitleWrapper>

                                  {item.data.map((item, index) => (
                                      <S.Item
                                          key={index}
                                          className="menuItem"
                                          onMouseEnter={() => onHintShow(item.label)}
                                          onMouseLeave={onHintHide}
                                          isActive={item.label === props.hintText}
                                      >
                                          {item.label}
                                      </S.Item>
                                  ))}
                              </S.Wrapper>
                          )
                        : !!item.data.length && (
                              <S.Wrapper key={index}>
                                  <S.TitleWrapper>
                                      <S.TitleSmaller>{item.title}</S.TitleSmaller>

                                      <Hint text={item.hintText} />
                                  </S.TitleWrapper>

                                  {item.data.map((item, index) => (
                                      <S.Item
                                          key={index}
                                          className="menuItem"
                                          onMouseEnter={() => onHintShow(item.label)}
                                          onMouseLeave={onHintHide}
                                          isActive={item.label === props.hintText}
                                      >
                                          {item.label}
                                      </S.Item>
                                  ))}
                              </S.Wrapper>
                          ),
                )}
            </Expand>
        </div>
    );
};
