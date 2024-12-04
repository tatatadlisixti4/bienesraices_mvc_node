const formularioLogin = (req, res) => {
	res.render('auth/login', {
		autenticado: false,
		titulo: 'Iniciar Sesión'
	})
}
const formularioRegistro = (req, res) => {
	res.render('auth/registro', {
		titulo: 'Crea Cuenta'
	})
}
const formularioOlvidePassword = (req, res) => {
	res.render('auth/olvide-password', {
		titulo: 'Recupera tu acceso a Bienes Raíces'
	})
}

export {
	formularioLogin,
	formularioRegistro,
	formularioOlvidePassword
}