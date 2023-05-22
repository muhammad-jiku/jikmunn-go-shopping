import User from "../models/user";
import fs from "fs";
import { uploads } from "../utils/Cloudinary";
import cloudinary from "cloudinary";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    user,
  });
};

export const updateProfile = async (req, res) => {
  const { name, email, avatar } = await req.body;

  const newUserData = {
    name,
    email,
    avatar,
  };
  // if (req?.files?.length > 0) {
  //   const uploader = async (path) =>
  //   console.log('path...', path)
  //     await uploads(path, "nextjs-ecommerce-demo/avatars");

  //   const file = req?.files[0];
  //   const { path } = file;

  //   const avatarResponse = await uploader(path);
  //   fs.unlinkSync(path);
  //   newUserData.avatar = avatarResponse;
  // }

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "nextjs-ecommerce-demo/avatars",
    width: 150,
    crop: "scale",
  });

  newUserData.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  if (avatar.public_id !== "") {
    const user = await User.findById({ _id: req?.user?._id });

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "nextjs-ecommerce-demo/avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  // console.log("1", newUserData);
  const user = await User.findByIdAndUpdate(req?.user?._id, newUserData);

  // console.log("2", user);
  res.status(200).json({
    user,
    updatedUser: newUserData,
  });
};
