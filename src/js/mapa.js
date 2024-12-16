(function() {
    // L es lo que contiene toda la información de leaflet
    const lat = 40.4530822
    const lng = -3.6903137
    const mapa = L.map('mapa').setView([lat, lng ], 17)
    let marker

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    // Pin
    marker = new L.marker([lat, lng], {
        draggable: true, // Se puede mover el pin
        autoPan: true // Una vez movido el pin, se vuelve a centrar el mapa
    })
    .addTo(mapa) // Añade a la instancia de marker 

    // Detectar el movimiento del pin
    marker.on('moveend', function(e){ // Manejo evento que provee leaflet
        marker = e.target 
        const posicion = marker.getLatLng() // Metodo para extraer longitu y latitud
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)) // Toma el mapa y lo centra en funcipon a la posición del pin
    })
})()