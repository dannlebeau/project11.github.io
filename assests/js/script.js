let map;

function convertToGeoJSON() {
  const shapefileInput = document.getElementById('shapefile-input');

  // Obtener el archivo seleccionado
  const file = shapefileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;

      // Convertir el archivo Shapefile a GeoJSON utilizando shapefile-js
      shapefile.open(contents)
        .then(source => source.read()
          .then(function log(result) {
            if (result.done) return;

            // Obtener las entidades del Shapefile en GeoJSON
            const geojson = result.value;

            console.log('Datos convertidos a GeoJSON:', geojson);

            if (!map) {
              // Inicializar el mapa solo si aún no se ha inicializado
              map = L.map('map').setView([0, 0], 2);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
              }).addTo(map);
            }

            // Visualizar el GeoJSON en el mapa utilizando Leaflet
            L.geoJSON(geojson).addTo(map);
            map.fitBounds(L.geoJSON(geojson).getBounds());

            return source.read().then(log);
          }))
        .catch(error => console.error(error.stack));
    };

    // Leer el contenido del archivo
    reader.readAsArrayBuffer(file);
  }
}

//Opción 2

