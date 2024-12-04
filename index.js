// Express
import express from 'express'
// App
const app = express()
// Routing
app.get('/', function(req, res) {
	res.send('Hola Mundo en Express')
})

app.get('/nosotros', function(req, res) {
	res.json({msg: 'Hola Mundo'})
})

const port = 3000;
app.listen(port, () => {

})