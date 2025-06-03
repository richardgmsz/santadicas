async function loadMenu() {
  const res = await fetch('/api/menu');
  const items = await res.json();
  const container = document.getElementById('menu');
  container.innerHTML = items.map(item => `
    <div class="item">
      <h3>${item.name} - R$ ${item.price.toFixed(2)}</h3>
      <p>${item.description}</p>
      <button onclick='orderItem(${JSON.stringify(item)})'>Pedir</button>
    </div>`).join('');
}

async function orderItem(item) {
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item })
  });
  const data = await res.json();
  alert('Status do pedido: ' + data.status);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

loadMenu();
