import Address from '../models/Address';

export const newAddress = async (req, res) => {
  try {
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
