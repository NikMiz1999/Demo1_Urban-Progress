function goToObject(id) {
  window.location.href = `object.html?object=${id}`;
}

function showChart(type) {
  const charts = ['overall', 'contractors', 'costs', 'types'];
  charts.forEach(id => {
    document.getElementById(`chart-${id}`).style.display = id === type ? 'block' : 'none';
  });

  const buttons = document.querySelectorAll('.tab-buttons button');
  buttons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-buttons button[onclick="showChart('${type}')"]`).classList.add('active');
}

function showTable(type) {
  const tables = ['zones', 'contractors', 'types'];
  tables.forEach(id => {
    document.getElementById(`table-${id}`).style.display = id === type ? 'block' : 'none';
  });

  const buttons = document.querySelectorAll('.tab-buttons button');
  buttons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-buttons button[onclick="showTable('${type}')"]`).classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const objectId = params.get('object');

  if (objectId) {
    const titles = {
      lenina: 'Пешеходная зона на ул. Ленина',
      gagarina: 'Бульвар Гагарина'
    };
    const meta = {
      lenina: 'Подрядчики: ООО «Строй», ООО «Свет» | Типы работ: плитка, освещение',
      gagarina: 'Подрядчики: ООО «Благо», ООО «Мафстрой» | Типы работ: бордюры, МАФы'
    };
    document.getElementById('object-title').textContent = titles[objectId];
    document.getElementById('object-meta').textContent = meta[objectId];
  }

  // График: общий план-факт
  new Chart(document.getElementById('chart-overall'), {
    type: 'line',
    data: {
      labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
      datasets: [
        { label: 'План', data: [100, 200, 300, 400], borderColor: '#0077cc', tension: 0.3 },
        { label: 'Факт', data: [80, 190, 310, 390], borderColor: '#28a745', tension: 0.3 }
      ]
    }
  });

  // График: по подрядчикам
  new Chart(document.getElementById('chart-contractors'), {
    type: 'bar',
    data: {
      labels: ['Строй', 'Благо', 'Свет'],
      datasets: [
        { label: 'План', data: [500, 200, 300], backgroundColor: '#0077cc' },
        { label: 'Факт', data: [420, 210, 280], backgroundColor: '#28a745' }
      ]
    }
  });

  // График: затраты
  new Chart(document.getElementById('chart-costs'), {
    type: 'bar',
    data: {
      labels: ['Строй', 'Благо', 'Свет'],
      datasets: [
        { label: 'Затраты (тыс ₽)', data: [1200, 800, 950], backgroundColor: '#ffc107' }
      ]
    }
  });

  // График: по типам объектов
  new Chart(document.getElementById('chart-types'), {
    type: 'bar',
    data: {
      labels: ['Плитка', 'Бордюры', 'МАФы'],
      datasets: [
        { label: 'План', data: [500, 200, 150], backgroundColor: '#0077cc' },
        { label: 'Факт', data: [420, 210, 130], backgroundColor: '#28a745' }
      ]
    }
  });
});
