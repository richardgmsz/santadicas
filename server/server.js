import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFileSync, writeFileSync } from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client'));

const menuPath = './menu.json';
let menu = [];
try {
  menu = JSON.parse(readFileSync(menuPath));
} catch (err) {
  console.error('Could not load menu.json, starting with empty menu');
}

app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.post('/api/order', (req, res) => {
  const order = req.body;
  console.log('Received order:', order);
  res.json({ status: 'received' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
