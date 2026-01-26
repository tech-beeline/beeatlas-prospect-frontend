const changeMap = {
    ["'false'"]: false,
    ["'true'"]: true,
};

fetch('/env/env', { cache: 'no-store' })
    .then((res) => res.text())
    .then((data) => {
        window.FEATURE_FLAGS = Object.fromEntries(
            data
                .trim()
                .split('\n')
                .map((v) => v.replaceAll('\r', '').split('='))
                .map((e) => [e[0], changeMap[e[1]] ?? e[1].replaceAll("'", '')]),
        );
    });
