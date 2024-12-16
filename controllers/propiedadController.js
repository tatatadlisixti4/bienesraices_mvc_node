import Precio from "../models/Precio.js"
import Categoria from "../models/Categoria.js"

const admin = (req, res) => {
    res.render('propiedades/admin', {
        titulo: 'Mis Propiedades',
        barra: true
    })
}

// Formulario para crear una nueva propiedad
const crear = async (req, res) => {
    // Consultar modelo de precio y categoría
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        titulo: 'Crear Propiedad',
        barra: true,
        categorias,
        precios
    })
}

export {
    admin,
    crear
}