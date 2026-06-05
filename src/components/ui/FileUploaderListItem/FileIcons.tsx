import type { SVGProps } from 'react';
import React, { useId } from 'react';

type FileIconProps = SVGProps<SVGSVGElement>;

const ImageMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#00ADC7" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#E0F7FB"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#E0F7FB"
                        fillRule="evenodd"
                        d="M8.18 25.25h15.76c.83 0 1.3-.97.78-1.62l-4.84-6.17c-.39-.5-1.14-.51-1.55-.03l-3.7 4.38c-.35.41-.97.47-1.4.13l-1.82-1.47a.99.99 0 0 0-1.38.12l-2.6 3c-.56.65-.1 1.66.75 1.66"
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#E0F7FB"
                        fillRule="evenodd"
                        d="M11.62 15.87c0-1.04.84-1.87 1.88-1.87 1.03 0 1.87.83 1.87 1.87a1.876 1.876 0 1 1-3.75 0"
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const VideoMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#7E00ED" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#F3E7FE"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#F3E7FE"
                        fillRule="evenodd"
                        d="m19.95 20.12-4.96-2.79c-.67-.37-1.49.11-1.49.87v5.59c0 .76.82 1.24 1.49.87l4.96-2.79c.68-.39.68-1.36 0-1.75"
                    />
                    <circle
                        cx={16}
                        cy={21}
                        r={9.25}
                        stroke="#F3E7FE"
                        strokeWidth={1.5}
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const SoundMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#FF9419" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFF4E1"
                        fillRule="evenodd"
                        d="M16 17.08v8.99c0 .81-.92 1.29-1.58.82l-3.17-2.21a.97.97 0 0 0-.57-.18H10c-.56 0-1-.45-1-1V20c0-.56.44-1 1-1h.64c.23 0 .45-.08.63-.22l3.1-2.49c.66-.52 1.63-.05 1.63.79"
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFF4E1"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFF4E1"
                        fillRule="evenodd"
                        d="M19.48 18.43c.19.16.36.34.51.56.24.34.43.72.56 1.15s.2.88.2 1.36c0 .47-.07.92-.2 1.35s-.32.81-.56 1.15c-.15.22-.32.4-.51.56l-.97-1.13c.09-.09.18-.18.26-.3.15-.2.26-.44.34-.71a3.1 3.1 0 0 0 0-1.85c-.08-.27-.19-.51-.34-.71-.08-.12-.17-.21-.26-.3zm-.95 1.13h-.02a.727.727 0 0 1-.08-1.05c.27-.32.73-.36 1.05-.08l.01.02zm.96 4.98-.01.02c-.32.28-.78.24-1.05-.08a.727.727 0 0 1 .08-1.05h.02z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFF4E1"
                        fillRule="evenodd"
                        d="M21.85 16.34c.44.23.82.56 1.15.99q.435.57.72 1.32c.18.45.31.94.4 1.45.08.49.13.97.13 1.45 0 .46-.06.94-.17 1.43-.1.48-.25.94-.45 1.39-.2.46-.44.88-.71 1.25q-.465.615-.99.99l-.87-1.23c.23-.16.44-.38.65-.65.21-.28.39-.6.55-.96.15-.36.27-.73.36-1.12.08-.38.13-.75.13-1.1 0-.39-.04-.79-.11-1.19-.07-.42-.18-.81-.31-1.16-.15-.37-.32-.69-.52-.95s-.43-.46-.67-.6zm-.69 1.31h-.02c-.37-.2-.5-.64-.3-1.01s.64-.5 1.01-.3l.01.02zm.77 8.93v.03c-.35.24-.81.16-1.05-.18a.75.75 0 0 1 .18-1.05l.03.01z"
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const TableMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#2CA853" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#E7F6EB"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M6 14h2" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M11 14h9" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M6 19h2" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M11 19h9" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M23 19h3" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M11 24h9" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M23 24h3" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        stroke="#E7F6EB"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                        d="M11 29h9"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        stroke="#E7F6EB"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                        d="M23 29h3"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path stroke="#E7F6EB" strokeLinecap="round" strokeWidth={1.5} d="M6 24h2" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        stroke="#E7F6EB"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                        d="M6 29h2"
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const TextMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}TextMedium__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}TextMedium__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}TextMedium__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}TextMedium__b)`}>
                    <path fill="#1A73E8" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}TextMedium__b)`}>
                    <path
                        fill="#E3F2FF"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}TextMedium__b)`}>
                    <path stroke="#E3F2FF" strokeLinecap="round" strokeWidth={1.5} d="M6 14h20" />
                </g>
                <g mask={`url(#${id}TextMedium__b)`}>
                    <path stroke="#E3F2FF" strokeLinecap="round" strokeWidth={1.5} d="M6 19h20" />
                </g>
                <g mask={`url(#${id}TextMedium__b)`}>
                    <path stroke="#E3F2FF" strokeLinecap="round" strokeWidth={1.5} d="M6 24h20" />
                </g>
                <g mask={`url(#${id}TextMedium__b)`}>
                    <path
                        stroke="#E3F2FF"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                        d="M6 29h12.5"
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const PdfMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#F55" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFECEF"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFECEF"
                        d="M21.77 24.94c-1.2-.09-2.36-.53-3.29-1.34-1.82.4-3.55.98-5.29 1.7-1.37 2.45-2.66 3.7-3.77 3.7-.23 0-.49-.05-.67-.18-.49-.23-.75-.72-.75-1.21 0-.4.08-1.51 4.31-3.34.97-1.78 1.73-3.61 2.35-5.52-.53-1.07-1.69-3.7-.89-5.04.27-.49.8-.75 1.38-.71.44 0 .89.22 1.15.58.58.8.54 2.49-.22 4.99.71 1.33 1.64 2.54 2.76 3.56.93-.17 1.86-.31 2.8-.31 2.08.05 2.4 1.03 2.35 1.61 0 1.51-1.47 1.51-2.22 1.51M9.33 27.7l.13-.04c.62-.22 1.11-.67 1.47-1.25-.67.27-1.2.71-1.6 1.29m5.91-13.36h-.14c-.04 0-.13 0-.17.04-.18.76-.05 1.56.26 2.27.27-.75.27-1.56.05-2.31m.31 6.46-.05.09-.04-.05c-.4 1.03-.84 2.05-1.33 3.03l.09-.04v.09c.98-.36 1.99-.66 3.02-.9l-.05-.04h.14c-.67-.67-1.29-1.43-1.78-2.18m6.04 2.36c-.4 0-.75 0-1.15.09.44.22.89.31 1.33.35.31.05.62 0 .89-.09 0-.13-.18-.35-1.07-.35"
                    />
                </g>
            </g>
        </svg>
    );
};

const PresentationMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#F55" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFECEF"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#FFECEF"
                        fillRule="evenodd"
                        d="M16.99 13.06c1.5.18 2.87.78 3.99 1.68a7.96 7.96 0 0 1 2.81 4.48c.42 1.83.17 3.67-.59 5.25a8 8 0 0 1-3.74 3.73c-1.69.82-3.54.98-5.24.59a7.92 7.92 0 0 1-4.48-2.81 7.9 7.9 0 0 1-1.68-3.99c-.07-.55.38-.99.94-.99h6c.55 0 1-.45 1-1v-6c0-.56.44-1.01.99-.94"
                    />
                    <path
                        fill="#FFECEF"
                        fillRule="evenodd"
                        d="M14.66 18.66v-4.58c0-.58-.5-1.05-1.07-.92-3.12.74-4.7 3.4-5.32 5.37-.19.58.28 1.13.89 1.13h4.5c.55 0 1-.45 1-1"
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const ArchiveMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#5E6071" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#F1F1F3"
                        d="M18.58 15.28v1.28c0 .27-.23.5-.5.5h-1.29c-.27 0-.5-.23-.5-.5v-1.78h1.79c.27 0 .5.23.5.5M16.29-.5v1.79h1.79c.27 0 .5.22.5.5v1.29c0 .27-.23.5-.5.5h-1.79V5.7h1.79c.27 0 .5.22.5.5v1.29c0 .28-.23.5-.5.5h-1.79v2.27h1.79c.27 0 .5.22.5.5v1.26c0 .28-.23.5-.5.5h-1.79v2.26H14.5c-.28 0-.5-.22-.5-.5v-1.26c0-.28.22-.5.5-.5h1.78v-2.26H14.5c-.28 0-.5-.23-.5-.5V8.49c0-.27.22-.5.5-.5h1.78V5.7H14.5c-.28 0-.5-.22-.5-.5V3.91c0-.28.22-.5.5-.5h1.78V1.29H14.5c-.28 0-.5-.23-.5-.5V-.5c0-.28.22-.5.5-.5h1.29c.28 0 .5.22.5.5"
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#F1F1F3"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#F1F1F3"
                        fillRule="evenodd"
                        d="M18.594 20.001v3.527a1.13 1.13 0 0 1-.332.8 1.13 1.13 0 0 1-.802.331h-2.315a1.135 1.135 0 0 1-1.134-1.131V20a1 1 0 0 1 1-1h2.583a1 1 0 0 1 1 1m-1.544 1.5h-1.5a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 .5.5h1.5a.5.5 0 0 0 .5-.501V22a.5.5 0 0 0-.5-.5"
                        clipRule="evenodd"
                        opacity={0.48}
                    />
                </g>
            </g>
        </svg>
    );
};

const OtherMedium = (props: FileIconProps) => {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="40"
            fill="none"
            viewBox="0 0 32 40"
            {...props}
        >
            <defs>
                <clipPath id={`${id}__a`}>
                    <path fill="#fff" fillOpacity={0} d="M0 0h32v40H0z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}__a)`}>
                <path fill="none" d="M0 0h32v40H0z" />
                <mask
                    id={`${id}__b`}
                    width={32}
                    height={40}
                    x={0}
                    y={0}
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#C4C4C4"
                        fillRule="evenodd"
                        d="M8 0h16l8 8v24c0 4.41-3.59 8-8 8H8c-4.42 0-8-3.59-8-8V8c0-4.42 3.58-8 8-8"
                    />
                </mask>
                <g mask={`url(#${id}__b)`}>
                    <path fill="#5E6071" d="M0 0h32v40H0z" />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        stroke="#F1F1F3"
                        strokeLinecap="round"
                        strokeWidth={1.25}
                        d="m24.54 25.49-4.16-7.32"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        fill="#F1F1F3"
                        fillRule="evenodd"
                        d="M24 0h7c.55 0 1 .44 1 1v7h-7c-.56 0-1-.45-1-1z"
                        opacity={0.48}
                    />
                </g>
                <g mask={`url(#${id}__b)`}>
                    <path
                        stroke="#F1F1F3"
                        strokeLinecap="round"
                        strokeWidth={1.25}
                        d="m19.24 15.86-.78-1.38c-1.41-2.47-4.56-3.33-7.02-1.9a5.113 5.113 0 0 0-1.88 7l5.31 9.2c.96 1.67 3.1 2.24 4.76 1.27 1.68-.96 2.24-3.11 1.26-4.78l-5.19-8.84a1.76 1.76 0 0 0-2.4-.64c-.84.49-1.14 1.56-.65 2.4l5.07 8.93"
                    />
                </g>
            </g>
        </svg>
    );
};

export const FileIcons = {
    ImageMedium,
    VideoMedium,
    SoundMedium,
    TableMedium,
    TextMedium,
    PdfMedium,
    PresentationMedium,
    ArchiveMedium,
    OtherMedium,
};
