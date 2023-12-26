export const sendAnalytics = (data: string[]) => {
    (window as any)._paq?.push(['trackEvent', ...data]);
};
