import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Yes. The API is online');
});
app.get('/api', (req, res) => {
  res.status(200).json({
    endpoints: {
      'GET /': { description: 'Server is live check', required: { headers: [], body: null, params: null } },
      'GET /api': { description: 'Endpoint list (this URL)', required: { headers: [], body: null, params: null } },
    },
  });
});

app.use((req, res) => {
  res.status(404).send('Invalid URL');
});
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server error, ${err}`);
    return;
  }
  console.log(`Listening on PORT ${PORT}`);
});
