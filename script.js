const busImages = [
  {
    url: "https://media.giphy.com/media/l0ExdMHUDKteztyfe/giphy.gif",
    thumb:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=1400&q=80",
    thumb:
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=500&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
    thumb:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=500&q=80",
  },
];

const routes = [
  {
    origen: "Santa Elena",
    destino: "Guayaquil",
    terminal: "Desde Terminal Santa Elena",
    tiempo: "2h 30m",
    tarifa: "$4.50",
    imagen:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
  },
  {
    origen: "Santa Elena",
    destino: "Salinas",
    terminal: "Desde Terminal Santa Elena",
    tiempo: "1h 45m",
    tarifa: "$2.75",
    imagen:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    origen: "Santa Elena",
    destino: "Machala",
    terminal: "Desde Terminal Santa Elena",
    tiempo: "3h 15m",
    tarifa: "$6.00",
    imagen:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    origen: "Santa Elena",
    destino: "Playas",
    terminal: "Desde Terminal Santa Elena",
    tiempo: "2h 00m",
    tarifa: "$3.25",
    imagen:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
  },
];

const heroMedia = document.getElementById("heroMedia");
const busThumbs = document.getElementById("busThumbs");
const prevBus = document.getElementById("prevBus");
const nextBus = document.getElementById("nextBus");
const menuToggle = document.getElementById("menuToggle");
const navMobile = document.getElementById("navMobile");
const routesGrid = document.getElementById("routesGrid");
const origenInput = document.getElementById("origenInput");
const destinoInput = document.getElementById("destinoInput");
const searchBtn = document.getElementById("searchBtn");

let currentBus = 0;

function renderHeroImage() {
  const active = busImages[currentBus];
  heroMedia.style.backgroundImage = `linear-gradient(90deg, rgba(2,13,28,0.92) 0%, rgba(2,13,28,0.70) 38%, rgba(2,13,28,0.28) 70%, rgba(2,13,28,0.12) 100%), url('${active.url}')`;

  busThumbs.innerHTML = busImages
    .map(
      (item, index) => `
        <button class="thumb ${index === currentBus ? "active" : ""}" style="background-image:url('${item.thumb}')" onclick="setBus(${index})"></button>
      `,
    )
    .join("");
}

function setBus(index) {
  currentBus = index;
  renderHeroImage();
}

window.setBus = setBus;

prevBus.addEventListener("click", () => {
  currentBus = (currentBus - 1 + busImages.length) % busImages.length;
  renderHeroImage();
});

nextBus.addEventListener("click", () => {
  currentBus = (currentBus + 1) % busImages.length;
  renderHeroImage();
});

menuToggle.addEventListener("click", () => {
  navMobile.classList.toggle("active");
  menuToggle.textContent = navMobile.classList.contains("active")
    ? "×"
    : "â";
});

function renderRoutes(list) {
  routesGrid.innerHTML = list
    .map(
      (route) => `
        <article class="route-card">
          <div class="route-image" style="background-image:url('${route.imagen}')">
            <span class="route-time">${route.tiempo}</span>
          </div>
          <div class="route-content">
            <h3>${route.origen} â ${route.destino}</h3>
            <p>${route.terminal}</p>
            <div class="route-price">${route.tarifa}</div>
            <a href="#horarios" class="route-link">Ver horarios â</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function filterRoutes() {
  const origen = origenInput.value.toLowerCase().trim();
  const destino = destinoInput.value.toLowerCase().trim();

  const filtered = routes.filter((route) => {
    const matchOrigen =
      !origen || route.origen.toLowerCase().includes(origen);
    const matchDestino =
      !destino || route.destino.toLowerCase().includes(destino);
    return matchOrigen && matchDestino;
  });

  renderRoutes(filtered.length ? filtered : routes);
}

searchBtn.addEventListener("click", filterRoutes);
origenInput.addEventListener("input", filterRoutes);
destinoInput.addEventListener("input", filterRoutes);

renderHeroImage();
renderRoutes(routes);
