const express = require('express');
const shevchenko = require('shevchenko');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.post('/decline', async (req, res) => {
  try {
    const { gender, givenName, patronymicName, familyName } = req.body;

    if (!gender || !givenName || !patronymicName || !familyName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const input = { gender, givenName, patronymicName, familyName };
    const output = await shevchenko.inVocative(input);

    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});