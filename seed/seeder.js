import db from '../config/db.js'
import categorias from './categorias.js'
import Categoria from  '../models/Categoria.js'
import precios from './precios.js'
import Precio from '../models/Precio.js'
import {exit} from 'node:process'

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Generar las columnas
        await db.sync()

        // Insertamos los datos
        const Promesa1 = Categoria.bulkCreate(categorias)
        const Promesa2 = Precio.bulkCreate(precios)
        await Promise.all([
            Promesa1, 
            Promesa2
        ])
        
        console.log('Datos importados correctamente')
        exit()
        
    } catch (error) {
        console.log(error)
        exit(1) 
    }
}
if(process.argv[2] === "-i") {
    importarDatos()
}