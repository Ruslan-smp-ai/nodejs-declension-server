const express = require('express');
const shevchenko = require('shevchenko');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Обработчик POST-запросов на /decline
app.post('/decline', async (req, res) => {
  try {
    const { gender, givenName, patronymicName, familyName, caseType } = req.body;

    if (!gender || !givenName || !patronymicName || !familyName || !caseType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const input = { gender, givenName, patronymicName, familyName };
    let output;

    switch (caseType) {
      case 'nominative':  // Именительный падеж
        output = input;  // Именительный падеж — это данные без изменений
        break;

      case 'genitive':  // Родительный падеж
        output = await shevchenko.inGenitive(input);
        break;

      case 'dative':  // Дательный падеж
        output = await shevchenko.inDative(input);
        break;

      case 'accusative':  // Винительный падеж
        output = await shevchenko.inAccusative(input);
        break;

      case 'vocative':  // Звательный падеж
        output = await shevchenko.inVocative(input);
        break;

      case 'instrumental':  // Творительный падеж
        output = await shevchenko.inInstrumental(input);
        break;

      case 'prepositional':  // Предложный падеж
        output = await shevchenko.inPrepositional(input);
        break;

      default:
        return res.status(400).json({ error: 'Invalid case type' });
    }

    res.json(output); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});