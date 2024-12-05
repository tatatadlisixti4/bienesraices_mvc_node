import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

const app = express()

// Conexión a la base de datos
try {
    await db.authenticate()
    console.log('Conexión correcta a la base de datos')
} catch(error) {
    console.log(error);
    
}

// Habilitar template engine (Pug)
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta pública
app.use(express.static('public'))

// Routing
app.use('/auth', usuarioRoutes)

// Puerto y servidor
const port = 3000;
app.listen(port, () => {

})