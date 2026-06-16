export const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const uint8Array = new TextEncoder().encode(reader.result as string);
            let binary = '';

            for (let i = 0; i < uint8Array.length; ++i)
                binary += String.fromCharCode(uint8Array[i]);

            resolve(btoa(binary));
        };
        reader.onerror = reject;
    });
