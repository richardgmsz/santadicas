async function loadOrders() {
  const res = await fetch('/api/orders');
  const orders = await res.json();
  const container = document.getElementById('orders');
  container.innerHTML = orders.map(o => `
    <div class="order">
      <strong>#${o.id}</strong> - ${o.item.name} - ${o.status}
      <button onclick="updateStatus(${o.id}, 'preparando')">Preparando</button>
      <button onclick="updateStatus(${o.id}, 'pronto')">Pronto</button>
    </div>
  `).join('');
}

async function updateStatus(id, status) {
  await fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  loadOrders();
}

setInterval(loadOrders, 3000);
loadOrders();
