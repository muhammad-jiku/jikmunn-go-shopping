import Address from '../models/Address';
import ErrorHandler from '../utils/ErrorHandler';

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
    const addresses = await Address.find({
      user: req.user._id,
    });

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

export const getAddress = async (req, res) => {
  try {
    const address = await Address.findById({ _id: req.query.id });

    if (!address) {
      return next(new ErrorHandler('Address not found', 404));
    }

    return res.status(200).json({
      success: true,
      data: address,
      message: 'address displayed successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    let address = await Address.findById({ _id: req.query.id });

    if (!address) {
      return next(new ErrorHandler('Address not found', 404));
    }

    address = await Address.findByIdAndUpdate(req.query.id, req.body);

    return res.status(200).json({
      success: true,
      data: address,
      message: 'address updated successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    let address = await Address.findById({ _id: req.query.id });

    if (!address) {
      return next(new ErrorHandler('Address not found', 404));
    }

    await address.deleteOne({ _id: req.query.id });

    return res.status(200).json({
      success: true,
      message: 'address deleted successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
