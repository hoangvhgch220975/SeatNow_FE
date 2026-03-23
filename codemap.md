```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Map Picker & Routing</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />

    <style>
      html,
      body {
        height: 100%;
        margin: 0;
        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont;
      }

      #map {
        height: 100%;
        width: 100%;
      }

      /* Search bar */
      #searchBar {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: 420px;
        max-width: calc(100% - 32px);
        z-index: 2000;
        display: flex;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }

      #searchBox {
        flex: 1;
        border: none;
        padding: 12px 14px;
        font-size: 15px;
        outline: none;
      }

      #searchIcon {
        width: 48px;
        border: none;
        background: #1e88e5;
        color: #fff;
        cursor: pointer;
      }

      /* Search results */
      #searchResults {
        position: absolute;
        top: 68px;
        left: 50%;
        transform: translateX(-50%);
        width: 420px;
        max-width: calc(100% - 32px);
        background: white;
        border-radius: 10px;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
        z-index: 2001;
        display: none;
        max-height: 260px;
        overflow-y: auto;
      }

      .result-item {
        padding: 10px 14px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        font-size: 14px;
      }

      .result-item:hover {
        background: #f2f6ff;
      }

      /* Button */
      .custom-button {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 1500;
        background: #fff;
        border-radius: 8px;
        padding: 8px 14px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        font-size: 14px;
      }

      .leaflet-routing-container {
        display: none;
      }
    </style>
  </head>

  <body>
    <div id="searchBar">
      <input
        id="searchBox"
        type="text"
        placeholder="Search location..."
        autocomplete="off"
      />
      <button id="searchIcon"><i class="fa fa-search"></i></button>
    </div>

    <div id="searchResults"></div>
    <div class="custom-button" id="toggleInstructions">🗺️ Directions</div>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.min.js"></script>

    <script>
      /* ================= MAP INIT ================= */
      let startLatLng = L.latLng(21.023872, 105.790434);
      const map = L.map("map").setView(startLatLng, 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map,
      );

      let startMarker = L.marker(startLatLng).addTo(map);
      let destMarker = null;
      let routingControl = null;
      let currentDistance = 0;

      /* ================= GEOLOCATION ================= */
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          startLatLng = L.latLng(pos.coords.latitude, pos.coords.longitude);
          startMarker.setLatLng(startLatLng);
          map.setView(startLatLng, 14);
        });
      }

      /* ================= ROUTING ================= */
      function drawRoute(destLatLng) {
        if (routingControl) map.removeControl(routingControl);
        if (destMarker) map.removeLayer(destMarker);

        destMarker = L.marker(destLatLng).addTo(map);

        routingControl = L.Routing.control({
          waypoints: [startLatLng, destLatLng],
          addWaypoints: false,
          routeWhileDragging: false,
          fitSelectedRoutes: true,
          show: false,
          lineOptions: { styles: [{ color: "#1e88e5", weight: 5 }] },
        }).addTo(map);

        routingControl.on("routesfound", (e) => {
          currentDistance = (e.routes[0].summary.totalDistance / 1000).toFixed(
            2,
          );
        });
      }

      /* ================= SEARCH (OPTIMIZED) ================= */
      const searchBox = document.getElementById("searchBox");
      const searchResults = document.getElementById("searchResults");
      let searchTimeout = null;

      searchBox.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search, 400);
      });

      document.getElementById("searchIcon").onclick = search;

      async function search() {
        const q = searchBox.value.trim();
        if (q.length < 2) return;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=6&q=${encodeURIComponent(q)}`,
        );
        const data = await res.json();

        searchResults.innerHTML = "";
        if (!data.length) return (searchResults.style.display = "none");

        data.forEach((item) => {
          const div = document.createElement("div");
          div.className = "result-item";
          div.textContent = item.display_name;
          div.onclick = () => {
            const dest = L.latLng(item.lat, item.lon);
            map.flyTo(dest, 15);
            drawRoute(dest);
            searchResults.style.display = "none";
          };
          searchResults.appendChild(div);
        });

        searchResults.style.display = "block";
      }

      /* ================= TAP PICK ================= */
      map.on("click", (e) => {
        drawRoute(e.latlng);
      });

      /* ================= TOGGLE DIRECTIONS ================= */
      document.getElementById("toggleInstructions").onclick = () => {
        const c = document.querySelector(".leaflet-routing-container");
        if (!c) return;
        c.style.display = c.style.display === "block" ? "none" : "block";
      };
    </script>
  </body>
</html>
```
