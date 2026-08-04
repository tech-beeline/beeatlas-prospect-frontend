import { FeatureFlags } from 'types/global';

const changeMap: Record<string, string | boolean> = {
    ["'false'"]: false,
    ["'true'"]: true,
};

export const loadEnvs = async () => {
    await fetch('/env/env', { cache: 'no-store' })
        .then((res) => res.text())
        .then((data) => {
            window.FEATURE_FLAGS = Object.fromEntries(
                data
                    .trim()
                    .split('\n')
                    .map((v) => v.replaceAll('\r', '').split('='))
                    .map((e) => [e[0], changeMap[e[1]] ?? e[1].replaceAll("'", '')]),
            ) as FeatureFlags;
        });
};

export const loadAnalytics = async () => {
    if (window.FEATURE_FLAGS.FLAG_IS_PROD && window.FEATURE_FLAGS.FLAG_ANALYTICS_URL) {
        const _paq = ((window as any)._paq = (window as any)._paq || []);

        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */

        _paq.push(['trackPageView']);

        _paq.push(['enableLinkTracking']);

        (function () {
            const u = window.FEATURE_FLAGS.FLAG_ANALYTICS_URL;

            _paq.push(['setTrackerUrl', u + 'matomo.php']);

            _paq.push(['setSiteId', '23']);

            const d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];

            g.async = true;
            g.src = u + 'matomo.js';
            s.parentNode?.insertBefore(g, s);
        })();
    }
};
