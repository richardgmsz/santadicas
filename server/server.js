import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';

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

let orders = [];
let nextOrderId = 1;

app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.post('/api/order', (req, res) => {
  const order = {
    id: nextOrderId++,
    item: req.body.item,
    extras: req.body.extras || [],
    status: 'recebido',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  console.log('Novo pedido:', order);
  res.json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.patch('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  if (req.body.status) {
    order.status = req.body.status;
  }
  res.json(order);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
