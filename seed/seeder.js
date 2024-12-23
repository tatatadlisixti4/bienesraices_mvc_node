import db from '../config/db.js'
import categorias from './categorias.js'
import precios from './precios.js'
import usuarios from './usuarios.js'
import {Categoria, Precio, Usuario} from '../models/index.js'
import {exit} from 'node:process'

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Generar las columnas
        await db.sync()

        // Insertamos los datos¿
        await Promise.all([
            Categoria.bulkCreate(categorias), 
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])
        console.log('Datos importados correctamente')
        exit()
        
    } catch (error) {
        console.log(error)
        exit(1) 
    }
}

const eliminarDatos = async () => {
    try {
        // const Promesa1 = Categoria.destroy({where: {}, truncate:true})
        // const Promesa2 = Precio.destroy({where: {}, truncate:true})
        // await Promise.all([
        //     Promesa1, 
        //     Promesa2
        // ])

        await db.sync({force:true})
        console.log('Datos eliminados correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}


if(process.argv[2] === "-i") {
    importarDatos()
}

if(process.argv[2] === "-e") {
    eliminarDatos()
}