import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendAnalytics } from 'features/analytics';

import { Expand } from 'components/other';

import { ITech } from 'api/technologies/types';

import { Hint } from '..';

import { MenuItem } from './components';
import * as T from './types';
import * as S from './units';

export const MenuElement: FC<T.IMenuElement> = (props) => {
    const [, setSearchParams] = useSearchParams();
    const formatData = (quadrantData: ITech[]) => {
        const hold = quadrantData.filter((item) => item.ring.id === 4);
        const assess = quadrantData.filter((item) => item.ring.id === 3);
        const trial = quadrantData.filter((item) => item.ring.id === 2);
        const adopt = quadrantData.filter((item) => item.ring.id === 1);

        return [
            {
                title: 'Adopt',
                data: adopt,
                hintText:
                    'Активно используем, применяем в продуктиве, обеспечиваем автоматизацию в процессе сборки \n и поставки. Можем предоставить экспертную поддержку.',
            },
            {
                title: 'Trial',
                data: trial,
                hintText:
                    'Одна или несколько команд использует данную технологию в продуктиве и остальные команды могут применять в своих приложениях.',
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
                    'При необходимости продолжаем использовать, но стараемся заменить на альтернативные технологии. Не используем для новых приложений.',
            },
        ];
    };

    const selectedRingDataLenght = formatData(props.data).find(
        (item) => props.activeRing === item.title.toLowerCase(),
    )?.data.length;

    const conditionForTitle = !!props.activeRing ? !!selectedRingDataLenght : true;

    const handleTitleClick = () => {
        props.setOpen(!props.isOpen);
        if (!props.isOpen) {
            sendAnalytics(['techradar', 'category_tree', props.analyticsName]);
        }
    };

    return (
        <div className="menuBlock">
            {!props.hidden && (
                <>
                    {conditionForTitle && (
                        <S.TitleWrapper data-open={props.isOpen} onClick={handleTitleClick}>
                            <S.Title>{props.title}</S.Title>

                            <S.ArrowIcon id="arrow-icon" isreverse={props.isOpen ? 'true' : ''} />
                        </S.TitleWrapper>
                    )}

                    <Expand transition={0.25} isOpen={props.isOpen} isAutoHeight>
                        {formatData(props.data).map((item, index) =>
                            !!props.activeRing
                                ? props.activeRing === item.title.toLowerCase() &&
                                  !!item.data.length && (
                                      <S.Wrapper key={index}>
                                          <S.TitleWrapper>
                                              <S.TitleSmaller>{item.title}</S.TitleSmaller>

                                              <Hint
                                                  text={item.hintText}
                                                  tooltipId={`${index}`}
                                                  isInfo
                                              />
                                          </S.TitleWrapper>

                                          {item.data.map((item) => (
                                              <MenuItem
                                                  key={item.id}
                                                  item={item}
                                                  hoveredTechId={props.hoveredTechId}
                                                  setHoveredTechId={props.setHoveredTechId}
                                                  selectedTech={props.selectedTech}
                                                  onClick={() => {
                                                      setSearchParams(
                                                          new URLSearchParams({
                                                              id: String(item.id),
                                                          }),
                                                      );
                                                  }}
                                              />
                                          ))}
                                      </S.Wrapper>
                                  )
                                : !!item.data.length && (
                                      <S.Wrapper key={index}>
                                          <S.TitleWrapper>
                                              <S.TitleSmaller>{item.title}</S.TitleSmaller>

                                              <Hint
                                                  text={item.hintText}
                                                  tooltipId={`${index}`}
                                                  isInfo
                                              />
                                          </S.TitleWrapper>

                                          {item.data.map((item) => (
                                              <MenuItem
                                                  key={item.id}
                                                  item={item}
                                                  hoveredTechId={props.hoveredTechId}
                                                  setHoveredTechId={props.setHoveredTechId}
                                                  selectedTech={props.selectedTech}
                                                  onClick={() => {
                                                      setSearchParams(
                                                          new URLSearchParams({
                                                              id: String(item.id),
                                                          }),
                                                      );
                                                  }}
                                              />
                                          ))}
                                      </S.Wrapper>
                                  ),
                        )}
                    </Expand>
                </>
            )}
        </div>
    );
};
