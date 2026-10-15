export const addTags = (tags: string[], text: string): string[] =>
    Array.from(
        new Set([
            ...tags,
            ...text
                .split(/[,\n]+/)
                .map((tag) => tag.trim())
                .filter(Boolean),
        ]),
    );
