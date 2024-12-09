import express from "express"
import {
	formularioLogin, formularioRegistro, 
	registrar, formularioOlvidePassword, 
	confirmar, resetPassword, 
	comprobarToken, nuevoPassword
} from "../controllers/usuarioController.js"

const router = express.Router()

// Index
router.route('/')
	.get((req, res) => res.send('Hola Mundo desde Express'))
	.post((req, res) => res.json({msg: 'Método Post'}))

// Login
router.get('/login', formularioLogin)

// Registro
router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

// Confirmar
router.get('/confirmar/:token', confirmar)

// Olvidé
router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', resetPassword)


// Almacena el nuevo password
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)

// Export
export default router
