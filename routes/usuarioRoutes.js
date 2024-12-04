import express from "express"

const router = express.Router()

// Routing
router.get('/', function(req, res) {
	res.send('Hola Mundo en Express')
})

router.get('/nosotros', function(req, res) {
	res.json({msg: 'Hola Mundo'})
})
export default router