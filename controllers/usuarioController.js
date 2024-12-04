const formularioLogin = (req, res) => {
	res.render('auth/login', {
		autenticado: false
	})
}
const formularioRegistro = (req, res) => {
	res.render('auth/registro', {
		titulo: 'Crea tu Cuenta'
	})
}

export {
	formularioLogin,
	formularioRegistro
}