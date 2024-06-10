/* eslint-disable no-plusplus */

export const convertFiletoBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  const stringArray = dataUrl.split(',');
  const stringArrayFormatted = stringArray && stringArray[0].match(/:(.*?);/);
  const mime = stringArrayFormatted && stringArrayFormatted[1];
  const bstr = atob(stringArray[stringArray.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime || '' });
};

export const emptyMask = (value: string) => value && value.replace(/\D/g, '');
