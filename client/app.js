async function loadMenu() {
  const res = await fetch('/api/menu');
  const items = await res.json();
  const container = document.getElementById('menu');

  const byCat = items.reduce((acc, it) => {
    acc[it.category] = acc[it.category] || [];
    acc[it.category].push(it);
    return acc;
  }, {});

  container.innerHTML = Object.entries(byCat).map(([cat, items]) => `
    <h2>${cat}</h2>
    ${items.map(item => renderItem(item)).join('')}
  `).join('');
}

function renderItem(item) {
  const extras = item.extras ? item.extras.map(ex => `
      <label><input type="checkbox" value="${ex.name}"> ${ex.name} (+R$ ${ex.price.toFixed(2)})</label>
  `).join('<br>') : '';
  return `
    <div class="item" id="item-${item.id}">
      <h3>${item.name} - R$ ${item.price.toFixed(2)}</h3>
      <p>${item.description}</p>
      ${extras}
      <br><button onclick='orderItem(${JSON.stringify(item)})'>Pedir</button>
    </div>`;
}

async function orderItem(item) {
  const extras = Array.from(document.querySelectorAll(`#item-${item.id} input:checked`)).map(i => i.value);
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item, extras })
  });
  const data = await res.json();
  alert('Pedido #' + data.id + ' recebido');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

loadMenu();
