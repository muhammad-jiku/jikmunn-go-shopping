import User from '../models/User';

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
