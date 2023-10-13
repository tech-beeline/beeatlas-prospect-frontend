export const stageIdToNameMap: Record<string, string> = {
    '0': 'Передан в эксплуатацию',
    '1': 'Не передан',
    '2': 'Неизвестно',
};

export const participantIdToNameMap: Record<string, string> = {
    '0': 'Участник со стороны клиента',
    '1': 'Участник со стороны компании',
    '2': 'Внешние участники',
};

export const enterIdToNameMap: Record<string, string> = {
    '0': 'Нет входа',
    '1': 'Создание профиля',
    '2': 'Авторизация',
    '3': 'Подключение услуги',
};

export const exitIdToNameMap: Record<string, string> = {
    '0': 'Нет выхода',
    '1': 'Создание профиля',
    '2': 'Авторизация',
    '3': 'Подключение услуги',
};

export const channelIdToNameMap: Record<string, string> = {
    '0': 'Web site',
    '1': 'Интернет магазин',
    '2': 'Мобильное приложение',
    '3': 'Личный кабинет',
};
