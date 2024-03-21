import { encode } from 'base64-arraybuffer';

export function getBase64EncodedFileData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const { result } = reader;
      const data = result as ArrayBuffer; // <--- FileReader gives us the ArrayBuffer
      const base64Encoded = encode(data); // <--- convert ArrayBuffer to base64 string

      resolve(base64Encoded);
    };

    reader.onerror = () => {
      resolve('');
    };

    reader.readAsArrayBuffer(file);
});
}

