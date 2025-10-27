export async function uploadMedia(file: File | undefined) {
  if (!file)
    return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset");
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/yoga-storage/image/upload`,
    { method: "POST", body: formData },
  );
  return response;
}
