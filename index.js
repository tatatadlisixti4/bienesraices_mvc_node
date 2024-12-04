import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
const app = express()

// Routing
app.use('/', usuarioRoutes)

// Puerto y Servidor
const port = 3000;
app.listen(port, () => {

})