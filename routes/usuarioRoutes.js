import express from "express"

const router = express.Router()

// Routing
router.route('/')
	.get((req, res) => res.send('Hola Mundo desde Express'))
	.post((req, res) => res.json({msg: 'Método Post'}))


router.get('/login', (req, res) => {
	res.render('auth/login', {
		autenticado: false
	})
})
export default router