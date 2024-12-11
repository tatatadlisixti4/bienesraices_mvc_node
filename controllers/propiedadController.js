const admin = (req, res) => {
    res.render('propiedades/admin', {
        titulo: 'Mis Propiedades'
    })
}

export {
    admin
}