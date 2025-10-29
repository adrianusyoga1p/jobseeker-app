export function useToBlob(dataurl: string): Blob {
  const arr = dataurl.split(",");

  const mimePart = arr[0];

  if (!mimePart) {
    return new Blob([]);
  }

  const mimeMatch = mimePart.match(/:(.*?);/);

  const mime = mimeMatch ? mimeMatch[1] : "image/png";

  const base64Data = arr[1];
  if (!base64Data) {
    console.error("Data URL is missing Base64 data after comma.");
    return new Blob([], { type: mime });
  }

  const bstr = atob(base64Data);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}
