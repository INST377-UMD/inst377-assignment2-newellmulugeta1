function navigateTo(page) {
  window.location.href = `${page}.html`;
}

async function getStockData() {
  const ticker = document.getElementById('ticker').value;
  const days = document.getElementById('days').value;
  const apiKey = 'YOUR_POLYGON_API_KEY';
  const to = new Date().toISOString().split('T')[0];
  const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?apiKey=${apiKey}`;

  const res = await fetch(url);
  const { results } = await res.json();
  const labels = results.map(r => new Date(r.t).toLocaleDateString());
  const data = results.map(r => r.c);

  new Chart(document.getElementById('stockChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: ticker, data, fill: false, borderColor: 'blue' }]
    }
  });

  const redditRes = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
  const redditData = await redditRes.json();
  const table = document.getElementById('redditStocks');
  table.innerHTML = '<tr><th>Ticker</th><th>Comments</th><th>Sentiment</th></tr>';
  redditData.slice(0, 5).forEach(({ ticker, no_of_comments, sentiment }) => {
    table.innerHTML += `<tr>
      <td><a href="https://finance.yahoo.com/quote/${ticker}" target="_blank">${ticker}</a></td>
      <td>${no_of_comments}</td>
      <td>${sentiment}</td>
    </tr>`;
  });
}

if (annyang) {
  annyang.addCommands({
    'lookup *ticker': ticker => {
      document.getElementById('ticker').value = ticker.toUpperCase();
      document.getElementById('days').value = 30;
      getStockData();
    }
  });
}
