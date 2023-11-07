import React, { FC, useEffect, useRef, useState } from 'react';

import { IFloatingNavigation } from './types';
import * as S from './units';

export const FloatingNavigation: FC<IFloatingNavigation> = ({ items }) => {
    const [activeId, setActiveId] = useState('');

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleObsever: IntersectionObserverCallback = (entries) => {
            entries.reverse().forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        observer.current = new IntersectionObserver(handleObsever, {
            rootMargin: '0px 0px -80% 0px',
        });

        const elements = document.querySelectorAll(items.map((item) => '#' + item.id).join(', '));

        elements.forEach((elem) => observer.current?.observe(elem));

        return () => observer.current?.disconnect();
    }, []);

    const handleItemClick = (id: string) => {
        document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
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
