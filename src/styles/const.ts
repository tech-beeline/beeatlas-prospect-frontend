export const theme = {
    borderRadius: '12px',

    text: {
        // tiny: {
        //     fontSize: '15px',
        //     lineHeight: '18px',
        // },
        small: {
            fontSize: '15px',
            lineHeight: '18px',
        },
        normal: {
            fontSize: '17px',
            lineHeight: '22px',
        },
        huge: {
            fontSize: '26px',
            lineHeight: '32px',
        },
    },

    colors: {
        backgroundLow: 'var(--color-background-base)',
        backgroundInverse: 'var(--color-background-inverse)',
        backgroundControl: 'var(--color-control-background)',
        backgroundSelected: 'var(--color-background-base-selected)',
        divider: 'var(--color-divider)',
        textActive: 'var(--color-text-active)',
        textActiveNoTheme: 'rgba(9, 11, 22, 0.94)',
        textActiveInverse: 'var(--color-text-active-inverse)',
        textInactive: 'var(--color-text-inactive)',
        textLogo: 'var(--color-text-logo)',
        magenta: 'var(--color-accent-magenta-background)',
        teal: 'var(--color-accent-teal-background)',
        lemon: 'var(--color-accent-lemon-background)',
        info: 'var(--color-status-info-background)',
        brandYellow: 'var(--color-palette-yellow-600)',

        // TODO: удалить после удаления страницы аутентификации
        primary: '#FDD835',
        primaryDarker: '#FCCF03',
        primaryDisabled: '#FEEC9E',
        componentGray: '#F2F3F7',
        backgroundGray: '#F1F3F5',
        disabledGray: '#908E84',
        borderGray: '#E0E0E0',
        borderError: '#FF5555',
        backgroundError: '#FFECEF',
        black: '#212121',
        white: '#FFFFFF',
        blue: '#1A73E8',
    },

    zIndex: {
        sidebar: 1,
        tableHead: 2,
        header: 3,
        dropdown: 4,
        modal: 5,
        tooltip: 6,
    },
};
