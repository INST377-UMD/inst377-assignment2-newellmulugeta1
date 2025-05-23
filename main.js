function navigateTo(page) {
  window.location.href = `${page}.html`;
}

window.onload = async () => {
  const res = await fetch('https://zenquotes.io/api/random');
  const data = await res.json();
  document.getElementById('quoteSection').innerText = data[0].q + ' - ' + data[0].a;
};

if (annyang) {
  const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': color => document.body.style.backgroundColor = color,
    'navigate to *page': page => navigateTo(page.toLowerCase())
  };
  annyang.addCommands(commands);
}
