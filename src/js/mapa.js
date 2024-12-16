(function() {
    const lat = 40.4530822
    const lng = -3.6903137
    const mapa = L.map('mapa').setView([lat, lng ], 17)
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)


})()