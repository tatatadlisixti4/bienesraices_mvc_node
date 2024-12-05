import express from "express"
import {formularioLogin, formularioRegistro, registrar, formularioOlvidePassword} from "../controllers/usuarioController.js"
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

// Olvidé
router.get('/olvide-password', formularioOlvidePassword)


// Export
export default router
