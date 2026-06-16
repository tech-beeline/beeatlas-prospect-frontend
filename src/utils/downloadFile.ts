export const downloadFile = (file: any) => {
    // file object
    const fileObj = new Blob(file, { type: 'text/plain' });

    // anchor link
    const element = document.createElement('a');
    element.href = URL.createObjectURL(fileObj);
    // element.download = '100ideas-' + Date.now() + '.txt';

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
};
