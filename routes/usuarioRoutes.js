import express from "express"
import {formularioLogin} from "../controllers/usuarioController.js"
const router = express.Router()

// Index
router.route('/')
	.get((req, res) => res.send('Hola Mundo desde Express'))
	.post((req, res) => res.json({msg: 'Método Post'}))

// Logion
router.get('/login', formularioLogin)





// Export
export default router




