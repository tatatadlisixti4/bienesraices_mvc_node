const admin = (req, res) => {
    res.render('propiedades/admin', {
        titulo: 'Mis Propiedades',
        barra: true
    })
}

// Formulario para crear una nueva propiedad
const crear = (req, res) => {
    res.render('propiedades/crear', {
        titulo: 'Crear Propiedad',
        barra: true
    })
}

export {
    admin,
    crear
}