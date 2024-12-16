(function() {
    // L es lo que contiene toda la información de leaflet
    const lat = 40.4530822
    const lng = -3.6903137
    const mapa = L.map('mapa').setView([lat, lng ], 17)
    let marke

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    // Pin
    marker = new L.marker([lat, lng], {
        draggable: true, // Se puede mover el pin
        autoPan: true // Una vez movido el pin, se vuelve a centrar el mapa
    })
    .addTo(mapa)


})()