import Address from '../models/Address';

export const newAddress = async (req, res) => {
  try {
    req.body.user = await req.user._id;
    const address = await Address.create(req.body);

    return res.status(201).json({
      success: true,
      data: address,
      message: 'Product added successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({});

    return res.status(200).json({
      success: true,
      data: addresses,
      message: 'addresses displayed successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
