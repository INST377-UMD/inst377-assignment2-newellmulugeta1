function navigateTo(page) {
  window.location.href = `${page}.html`;
}

async function loadDogs() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
  const { message } = await res.json();
  const carousel = document.getElementById('dogCarousel');
  carousel.innerHTML = message.map(img => `<img src="${img}" class="carousel-img">`).join('');
}

async function loadBreeds() {
  const res = await fetch('https://dogapi.dog/api/v2/breeds');
  const { data } = await res.json();
  const buttons = document.getElementById('breedButtons');
  data.forEach(({ attributes }) => {
    const btn = document.createElement('button');
    btn.textContent = attributes.name;
    btn.onclick = () => showBreedInfo(attributes);
    buttons.appendChild(btn);
  });
}

function showBreedInfo({ name, description, life: { min, max } }) {
  document.getElementById('breedInfo').innerHTML = `
    <h3>${name}</h3>
    <p>${description}</p>
    <p>Life Expectancy: ${min} - ${max} years</p>
  `;
}

window.onload = () => {
  loadDogs();
  loadBreeds();
};

if (annyang) {
  annyang.addCommands({
    'load dog breed *name': name => {
      const buttons = document.querySelectorAll('#breedButtons button');
      buttons.forEach(btn => {
        if (btn.textContent.toLowerCase() === name.toLowerCase()) {
          btn.click();
        }
      });
    }
  });
}
