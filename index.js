import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import db from './config/db.js'

// Crear app y habilitar lectura de datos de formulario
const app = express()
app.use(express.urlencoded({extended: true}))

// Habilitar Cookie Parser
app.use(cookieParser())

// Habilitar CSRF
app.use(csrf({cookie: true}))

// Conexión y sincronización con la base de datos
try {
    await db.authenticate()
    db.sync()
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
app.use('/', propiedadesRoutes)

// Puerto y servidor
const port = process.env.PORT || 3000
app.listen(port, () => {

})