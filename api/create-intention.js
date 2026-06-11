export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'EGP', items, billing_data } = req.body;

    const response = await fetch('https://accept.paymob.com/v1/intention/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.PAYMOB_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        payment_methods: [5721981],
        items: items || [],
        billing_data: billing_data || {
          first_name: "Test",
          last_name: "User",
          phone_number: "+201000000000",
          email: "test@example.com",
          street: "NA",
          building: "NA",
          floor: "NA",
          apartment: "NA",
          city: "Cairo",
          country: "EG"
        },
        special_reference: `ORD-${Date.now()}`
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paymob error:', data);
      return res.status(response.status).json({ error: 'Failed to create intention', details: data });
    }

    res.status(200).json({ client_secret: data.client_secret });
  } catch (error) {
    console.error('Error in create-intention:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
