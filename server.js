import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Paymob Intention API Endpoint
app.post('/api/create-intention', async (req, res) => {
  try {
    const { amount, currency = 'EGP', items, billing_data, special_reference } = req.body;

    const response = await fetch('https://accept.paymob.com/v1/intention/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.PAYMOB_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        payment_methods: [5565798],
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
        special_reference: special_reference || `ORD-${Date.now()}`
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paymob error:', data);
      return res.status(response.status).json({ error: 'Failed to create intention', details: data });
    }

    res.json({ client_secret: data.client_secret });
  } catch (error) {
    console.error('Error in create-intention:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
