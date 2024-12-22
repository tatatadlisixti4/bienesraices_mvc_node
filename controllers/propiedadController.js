import {validationResult} from 'express-validator'
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
        csrfToken: req.csrfToken(), 
        categorias,
        precios,
        datos: {}
    })
}

const guardar = async (req, res) => {
    // Validación
    let resultado = validationResult(req)
    
    if(!resultado.isEmpty()) {
        // Consultar modelo de precio y categoría
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        res.render('propiedades/crear', {
            titulo: 'Crear Propiedad',
            barra: true,
            csrfToken: req.csrfToken(), // ??
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }
}

export {
    admin,
    crear,
    guardar
}