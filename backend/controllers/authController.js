import User from '../models/User';
import ErrorHandler from '../utils/ErrorHandler';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { uploads } from '../utils/cloudinaryFile';
import APIFilters from '../utils/ApiFilters';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const newUserData = await {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.files.length > 0) {
      const uploader = async (path) =>
        await uploads(path, 'jikmunn-go-shopping/avatars');

      const file = req.files[0];
      const { path } = file;

      const avatarResponse = await uploader(path);
      fs.unlinkSync(path);
      newUserData.avatar = avatarResponse;
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData);

    return res.status(200).json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select('+password');

    const isPasswordMatched = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const resPerPage = 2;
    const usersCount = await User.countDocuments();

    const apiFilters = new APIFilters(User.find({}), req.query).pagination(
      resPerPage
    );

    const users = await apiFilters.query;

    return res.status(200).json({
      success: true,
      usersCount,
      resPerPage,
      data: users,
      message: 'Users displayed to admin successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    let user = await User.findById({ _id: req.query.id });

    if (!user) {
      return next(new ErrorHandler('No user found with this ID', 404));
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: 'User displayed to admin successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById({ _id: req.query.id });

    if (!user) {
      return next(new ErrorHandler('No user found with this ID', 404));
    }

    user = await User.findByIdAndUpdate(req.query.id, req.body.userData);

    return res.status(200).json({
      success: true,
      data: user,
      message: 'User updated by admin successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
