import React, { useEffect, useRef, useState } from 'react';

// import { Card } from './Card';
import { Card } from 'components/interaction/Card';

import * as ROUTER from 'router/const';

import { Link } from '..';

import * as C from './const';
import * as S from './units';

const useElementWidth = (ref: any) => {
    const [width, setWidth] = useState<null | number>(null);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;

            setWidth(width);
        }),
    );

    useEffect(() => {
        observer.current.observe(ref.current);
    }, [ref, observer]);

    return width;
};

export const Slider = () => {
    const [isLeftActive, setLeftActive] = useState(false);
    const [isRightActive, setRightActive] = useState(true);

    // const [isScrolling, setScrolling] = useState(false);
    // const [clientX, setClientX] = useState(0);
    const [transformX, setTransformX] = useState(0);

    const [visibleElements, setVisibleElements] = useState(1);

    const [activeSlide, setActiveSlide] = useState(0);
    const [slideSize, setSlideSize] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const sliderWidth = useElementWidth(sliderRef);

    // TODO: 3 - кол-во элементов хардкодом
    const penultimateElement = 3 - 2;

    const next = () => {
        if (transformX - slideSize >= -slideSize * penultimateElement) {
            setTransformX(transformX - slideSize);

            setActiveSlide(activeSlide + 1);
        } else {
            if (visibleElements === 1 && sliderWidth) {
                setTransformX(
                    -slideSize * penultimateElement + (-C.MAX_SLIDER_WIDTH + sliderWidth),
                );
            } else {
                setTransformX(-slideSize * penultimateElement);
            }

            setActiveSlide(2 - 1);
        }
    };

    const prev = () => {
        if (transformX + slideSize <= 0) {
            if (visibleElements === 1 && sliderWidth && activeSlide === 2 - 1) {
                setTransformX(transformX + (C.MAX_SLIDER_WIDTH - sliderWidth));
            } else {
                setTransformX(transformX + slideSize);
            }

            setActiveSlide(activeSlide - 1);
        } else {
            setTransformX(0);

            setActiveSlide(0);
        }
    };

    useEffect(() => {
        setTransformX(0);

        const node = sliderRef.current && sliderRef.current.children[0];
        const nodeStyle = node && window.getComputedStyle(node);
        const slideMarginRight = nodeStyle && nodeStyle.getPropertyValue('margin-right');

        const slideWidth =
            sliderRef.current && sliderRef.current.children[0].getBoundingClientRect().width;

        slideWidth &&
            slideMarginRight &&
            setSlideSize(+slideMarginRight.replace('px', '') + slideWidth);
    }, [sliderRef.current, sliderRef.current?.clientWidth]);

    useEffect(() => {
        sliderWidth && setVisibleElements(sliderWidth >= C.MAX_SLIDER_WIDTH ? 2 : 1);
    }, [sliderWidth]);

    useEffect(() => {
        setLeftActive(transformX >= 0 ? false : true);

        if (visibleElements === 1 && sliderWidth) {
            setRightActive(
                transformX <= -slideSize * penultimateElement + (-C.MAX_SLIDER_WIDTH + sliderWidth)
                    ? false
                    : true,
            );
        } else {
            setRightActive(transformX <= -slideSize * penultimateElement ? false : true);
        }
    }, [transformX, slideSize]);

    // useEffect(() => {
    //     const activeSlide = Math.round(+(transformX / slideSize).toFixed(1));

    //     activeSlide && setActiveSlide(Math.abs(activeSlide));

    //     if (activeSlide <= -penultimateElement) {
    //         if (visibleElements === 1 && sliderWidth && activeSlide <= -(2 - 1)) {
    //             setTransformX(
    //                 -slideSize * penultimateElement + (-C.MAX_SLIDER_WIDTH + sliderWidth),
    //             );
    //         } else {
    //             setTransformX(-slideSize * penultimateElement);
    //         }
    //     } else if (activeSlide >= 0) {
    //         setTransformX(0);
    //     } else {
    //         !isScrolling &&
    //             typeof activeSlide === 'number' &&
    //             setTransformX(activeSlide * slideSize);
    //     }
    // }, [isScrolling]);

    // const onMouseDown = (e: any) => {
    //     setScrolling(true);

    //     setClientX(e.clientX);
    // };

    // const onMouseUp = () => {
    //     setScrolling(false);
    // };

    // const onMouseMove = (e: any) => {
    //     if (isScrolling) {
    //         const newTransform = transformX + e.clientX - clientX;

    //         setTransformX(newTransform);

    //         setClientX(e.clientX);
    //     }
    // };

    // const onTouchStart = (e: any) => {
    //     setScrolling(true);

    //     setClientX(e.touches[0].clientX);
    // };

    // const onTouchEnd = () => {
    //     setScrolling(false);
    // };

    // const onTouchMove = (e: any) => {
    //     const newTransform = transformX + e.touches[0].clientX - clientX;

    //     setTransformX(newTransform);

    //     setClientX(e.touches[0].clientX);
    // };

    return (
        <S.SliderWrapper className="SliderWrapper">
            <S.ArrowWrapper className="ArrowWrapper" onClick={prev} isVisible={isLeftActive}>
                <S.LeftArrow className="LeftArrow" />
            </S.ArrowWrapper>

            <S.SliderContainer className="SliderContainer">
                <S.Slider className="Slider" ref={sliderRef} {...{ transformX }}>
                    {/* <S.Slider ref={sliderRef} {...{ transformX, isScrolling }}> */}
                    <Card colorType="green" title="модели" withImage to="models">
                        Функционально-доменная модель позволяет{' '}
                        <Link
                            path={`${ROUTER.MODELS_PATH}${ROUTER.FDM_PATH}`}
                            fontSize={19}
                            isInner
                            isInline
                        >
                            узнать о существующих в компании возможностях,
                        </Link>{' '}
                        переиспользовать их, и заказать необходимую возможность у владельца домена,
                        а также получить информацию о состоянии ИТ–ландшафта.
                    </Card>

                    <Card colorType="pink" title="база знаний" withImage to="data-base">
                        В базе знаний вы можете найти все{' '}
                        <Link
                            path={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}`}
                            fontSize={19}
                            isInner
                            isInline
                            noLine
                        >
                            документы для подготовки к архитектурному комитету,
                        </Link>{' '}
                        <Link
                            path={`${ROUTER.DATA_BASE_PATH}${ROUTER.TECH_POLICY_PATH}`}
                            fontSize={19}
                            isInner
                            isInline
                            noLine
                        >
                            организации производственного процесса,
                        </Link>{' '}
                        а также обратиться за помощью, узнать опыт коллег.
                    </Card>

                    <Card colorType="blue" title="личный кабинет" withImage to="products">
                        С помощью личного кабинета отслеживайте стадии жизненного цикла
                        возможностей, храните документацию по проекту, работайте с техническим
                        долгом, погружайте команду, делитесь опытом.
                    </Card>
                </S.Slider>
            </S.SliderContainer>

            <S.ArrowWrapper isRight onClick={next} isVisible={isRightActive}>
                <S.RightArrow />
            </S.ArrowWrapper>
        </S.SliderWrapper>
    );
};
