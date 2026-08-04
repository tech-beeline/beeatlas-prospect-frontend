import { useEffect } from 'react';
import * as Viz from '@viz-js/viz';
import Panzoom from 'panzoom';

export const useStructurizrRenderer = (data: any, elementId: string, show = true) => {
    useEffect(() => {
        let diagram: any;

        if (data && typeof data === 'object' && show) {
            (window as any).structurizr.workspace = new (window as any).structurizr.Workspace(data);
            (window as any).structurizr.ui.loadThemes('', function () {
                diagram = new (window as any).structurizr.ui.Diagram(elementId, false, function () {
                    diagram.changeView('context');
                });

                const elem = document.getElementById(elementId);
                const panzoom = Panzoom(elem!, {
                    bounds: true,
                    boundsPadding: 1,
                    maxZoom: 5,
                    minZoom: 1,
                    initialZoom: 1,
                });
                elem!.addEventListener('wheel', (panzoom as any).zoomWithWheel);
            });
        }
    }, [data, show]);
};

export const useVizRenderer = (data: string | undefined, elementId: string, show = true) => {
    useEffect(() => {
        const elem = document.getElementById(elementId);

        if (data && elementId && show) {
            Viz.instance()
                .then((viz) => elem?.replaceChildren(viz.renderSVGElement(data)))
                .then(() => {
                    const panzoom = Panzoom(elem!, {
                        // bounds: true,
                        // boundsPadding: 1,
                        maxZoom: 5,
                        minZoom: 1,
                        initialZoom: 1,
                    });
                    elem!.addEventListener('wheel', (panzoom as any).zoomWithWheel);
                });
        }
    }, [data, elementId, show]);
};
