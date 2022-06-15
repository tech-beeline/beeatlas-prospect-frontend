import { Undefinable } from 'types/common';

// LOCALSTORAGE

export const getStorage = (
    key: string,
    isObject = false,
    storage = localStorage,
): Undefinable<string> => {
    if (key in storage) {
        return isObject ? JSON.parse(storage.getItem(key) as any) : storage.getItem(key);
    }
};

export const persistStorage = (
    key: string,
    value: string,
    isObject = false,
    storage = localStorage,
): void => {
    isObject ? storage.setItem(key, JSON.stringify(value)) : storage.setItem(key, value);
};

export const removeItemStorage = (key: string, storage = localStorage) => {
    if (key in storage) {
        storage.removeItem(key);
    } else {
        throw new Error('Данный ключ не найден в storage');
    }
};

export const clearStorage = (storage = localStorage) => {
    storage.clear();
};

// COOKIES

// TODO: Добавить флаги? ; HttpOnly; Secure ;Expires=<date>
export const persistCookie = (key: string, value: string): void => {
    document.cookie = `${key}=${value}`;
};

// TODO: get, delete Cookie
