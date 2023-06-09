export const checkoutSession = async (req, res) => {
  const body = await req.body;

  const line_items = body?.items?.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: { productId: item.product },
        },
        unit_amount: item.price * 100,
      },
      tax_rates: ['txr_1MUVJSAlHMiRMt8E2khIxJEi'],
      quantity: item.quantity,
    };
  });
};
