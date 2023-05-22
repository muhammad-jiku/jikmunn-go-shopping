import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      (result) => {
        console.log("result...", result);
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

export { uploads, cloudinary };
