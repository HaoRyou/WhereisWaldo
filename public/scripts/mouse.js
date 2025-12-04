const graph = document.getElementById('graph');
const follower = document.getElementById('mouse');

const name = document.getElementById('username').textContent.trim();

graph.addEventListener('mousemove', (e) => {
  const rect = graph.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  x = Math.max(0, Math.min(x, rect.width));
  y = Math.max(0, Math.min(y, rect.height));

  follower.style.left = x + 'px';
  follower.style.top = y + 'px';
});

const quad = [
  { x: 757.5, y: 475 },
  { x: 784.5, y: 475 },
  { x: 807.5, y: 524 },
  { x: 777.5, y: 542 },
];

function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
}

const message = document.getElementById('message');

graph.addEventListener('click', (e) => {
  const rect = graph.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isPointInPolygon(x, y, quad)) {
    message.textContent = 'You found Waldo';

    const score = document.getElementById('counter').textContent;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }), // <--- sends real data now
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to send data');
        window.location.href = '/';
      })
      .catch((err) => console.error(err));
  } else {
    message.textContent = 'That is not Waldo';
  }
});
