import {check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'

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

const registrar = async (req, res) => {
	// Validación
	await check('nombre') 
		.notEmpty()
		.withMessage('El nombre no puede ir vacío')
		.run(req)
	let resultado = validationResult(req) 
	res.json(resultado.array())

	// Inserción registro
	const usuario = await Usuario.create(req.body)
	res.json(usuario)
}
const formularioOlvidePassword = (req, res) => {
	res.render('auth/olvide-password', {
		titulo: 'Recupera tu acceso a Bienes Raíces'
	})
}

export {
	formularioLogin,
	formularioRegistro,
	registrar,
	formularioOlvidePassword
}