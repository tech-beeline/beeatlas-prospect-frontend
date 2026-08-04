import React, { FC, useEffect, useRef, useState } from 'react';

import { IFloatingNavigation } from './types';
import * as S from './units';

export const FloatingNavigation: FC<IFloatingNavigation> = ({ items }) => {
    const [activeId, setActiveId] = useState('');

    const observer = useRef<IntersectionObserver | null>(null);
    const observerFlag = useRef(true);
    const timerId = useRef<null | ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        const handleObsever: IntersectionObserverCallback = (entries) => {
            entries.reverse().forEach((entry) => {
                if (observerFlag.current && entry?.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        observer.current = new IntersectionObserver(handleObsever, {
            // Top 15% of the screen
            rootMargin: '0px 0px -85% 0px',
        });

        const elements = document.querySelectorAll(items.map((item) => '#' + item.id).join(', '));

        elements.forEach((elem) => observer.current?.observe(elem));

        return () => observer.current?.disconnect();
    }, []);

    const handleItemClick = (id: string) => {
        setActiveId(id);
        observerFlag.current = false;
        document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });

        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
            observerFlag.current = true;
        }, 500);
    };

    return (
        <>
            {items.map((item) => (
                <S.NavItem
                    key={item.id}
                    isActive={item.id === activeId}
                    onClick={() => handleItemClick(item.id)}
                >
                    {item.label}
                </S.NavItem>
            ))}
        </>
    );
};
