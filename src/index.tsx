import React from 'react';
import { createRoot } from 'react-dom/client';

import { loadEnvs } from 'utils';

// Загружаем env переменные, кладем их в window, потом рендерим App
async function loadApp() {
    try {
        await loadEnvs();

        const { default: App } = await import('./App');

        const root = createRoot(document.getElementById('root') as HTMLElement);
        root.render(
            <>
                <App />
            </>,
        );
    } catch (error) {
        console.error('Failed to load configuration:', error);
    }
}

loadApp();
