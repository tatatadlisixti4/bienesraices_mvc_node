import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
const app = express()

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