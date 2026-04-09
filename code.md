<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Map Picker</title>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>

<style>
html, body {
  height: 100%;
  margin: 0;
  font-family: system-ui;
}

#map {
  height: 100%;
}

/* Search */
#searchBar {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  max-width: calc(100% - 32px);
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

#searchBox {
  flex: 1;
  border: none;
  padding: 12px;
  outline: none;
}

#searchBtn {
  width: 50px;
  border: none;
  background: #1e88e5;
  color: #fff;
  cursor: pointer;
}

/* Results */
#searchResults {
  position: absolute;
  top: 68px;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  max-width: calc(100% - 32px);
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: none;
  z-index: 2001;
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
}

.result-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.result-item:hover {
  background: #f2f6ff;
}

/* URL box */
#urlBox {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  z-index: 2000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
</style>
</head>

<body>

<div id="searchBar">
  <input id="searchBox" placeholder="Search location..." autocomplete="off"/>
  <button id="searchBtn">🔍</button>
</div>

<div id="searchResults"></div>
<div id="urlBox">Loading...</div>
<div id="map"></div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<script>
/* ================= INIT ================= */
const DEFAULT_LAT = 21.0285;
const DEFAULT_LNG = 105.8542;

const map = L.map("map").setView([DEFAULT_LAT, DEFAULT_LNG], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let marker = null;

/* ================= GET PARAM ================= */
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    lat: parseFloat(params.get("lat")),
    lng: parseFloat(params.get("lng"))
  };
}

/* ================= SHOW URL ONLY ================= */
function showURL(lat, lng) {
  const url = `${location.origin}${location.pathname}?lat=${lat}&lng=${lng}`;
  document.getElementById("urlBox").textContent = url;
}

/* ================= UPDATE URL ================= */
function updateURL(lat, lng) {
  const url = `${location.pathname}?lat=${lat}&lng=${lng}`;
  document.getElementById("urlBox").textContent = location.origin + url;
  window.history.replaceState({}, "", url);
}

/* ================= SET MARKER ================= */
function setMarker(lat, lng, zoom = 15, shouldUpdateURL = true) {
  if (marker) map.removeLayer(marker);

  marker = L.marker([lat, lng]).addTo(map);
  map.setView([lat, lng], zoom);

  const fixedLat = Number(lat).toFixed(6);
  const fixedLng = Number(lng).toFixed(6);

  if (shouldUpdateURL) {
    updateURL(fixedLat, fixedLng);
  } else {
    showURL(fixedLat, fixedLng);
  }
}

/* ================= LOAD FROM URL ================= */
const { lat, lng } = getParams();

if (!isNaN(lat) && !isNaN(lng)) {
  setMarker(lat, lng, 15, false);
} else {
  map.setView([DEFAULT_LAT, DEFAULT_LNG], 13);
  showURL(DEFAULT_LAT.toFixed(6), DEFAULT_LNG.toFixed(6));
}

/* ================= CLICK MAP ================= */
map.on("click", e => {
  setMarker(e.latlng.lat, e.latlng.lng);
});

/* ================= SEARCH ================= */
const searchBox = document.getElementById("searchBox");
const searchResults = document.getElementById("searchResults");

let debounce = null;

searchBox.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(search, 400);
});

document.getElementById("searchBtn").onclick = search;

async function search() {
  const q = searchBox.value.trim();
  if (q.length < 2) return;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(q)}`
  );

  const data = await res.json();
  searchResults.innerHTML = "";

  if (!data.length) {
    searchResults.style.display = "none";
    return;
  }

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = item.display_name;

    div.onclick = () => {
      const lat = parseFloat(item.lat);
      const lng = parseFloat(item.lon);

      setMarker(lat, lng);
      searchResults.style.display = "none";
    };

    searchResults.appendChild(div);
  });

  searchResults.style.display = "block";
}

/* ================= HIDE RESULT CLICK OUTSIDE ================= */
document.addEventListener("click", e => {
  if (
    !document.getElementById("searchBar").contains(e.target) &&
    !searchResults.contains(e.target)
  ) {
    searchResults.style.display = "none";
  }
});
</script>

</body>
</html>