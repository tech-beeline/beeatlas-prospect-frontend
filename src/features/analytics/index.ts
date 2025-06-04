export const sendAnalytics = (data: string[]) => {
    (window as any)._paq?.push(['trackEvent', ...data]);
};

export const setUserId = (id: string) => {
    (window as any)._paq?.push(['setUserId', id]);
};
