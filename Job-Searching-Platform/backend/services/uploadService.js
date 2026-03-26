import cloudinary from "cloudinary";

export const uploadFile = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath);
  if (!result || result.error) {
    throw new Error("Failed to upload file to Cloudinary");
  }
  return { public_id: result.public_id, url: result.secure_url };
};
