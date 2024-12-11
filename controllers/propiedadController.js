const admin = (req, res) => {
    res.render('propiedades/admin', {
        titulo: 'Mis Propiedades',
        barra: true
    })
}

export {
    admin
}