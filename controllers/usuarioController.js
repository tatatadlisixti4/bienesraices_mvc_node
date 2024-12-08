import {check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/tokens.js'
import {emailRegistro} from '../helpers/emails.js'

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
	// Extracción de datos
	const {nombre, email, password} = req.body

	// Validación
	await check('nombre') 
		.notEmpty()
		.withMessage('El nombre no puede ir vacío')
		.run(req)

	await check('email') 
		.isEmail()
		.withMessage('Eso no es un email, PAYASO')
		.run(req)

	await check('password') 
		.isLength({min: 6})
		.withMessage('El Password debe ser de al menos 6 caracteres')
		.run(req)

	await check('repetir_password') 
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Los Passwords no son iguales');
			}
			return true
		})
		.run(req)
	let resultado = validationResult(req)

	//Verificar que el resultado esté vacío
	if(!resultado.isEmpty()) {
		return res.render('auth/registro', {
			titulo: 'Crear Cuenta',
			errores: resultado.array(),
			usuario: {
				nombre, // nombre: nombre {Object Literal Enhancement | Propiedades abreviadas}
				email // email: email {Object Literal Enhancement | Propiedades abreviadas}
			}
		})
	}

	// Verificar que el uisuario no esté duplicado
	const existeUsuario = await Usuario.findOne({where: {email}}) // {email: req.body.email}
	if(existeUsuario) {
		return res.render('auth/registro', {
			titulo: 'Crear Cuenta',
			errores: [{msg: 'El Usuario ya está Registrado'}],
			usuario: {
				nombre,
				email
			}
		})
	}
	
	// Almacenar usuario
	const usuario = await Usuario.create({
		nombre,
		email,
		password,
		token: generarId()
	})

	// Envía email de confirmación
	emailRegistro({
		nombre: usuario.nombre,
		email: usuario.email,
		token: usuario.token
	})

	// Mensaje de confirmación
	res.render('templates/mensaje', {
		titulo: 'Cuenta Creada Correctamente',
		mensaje: 'Hemos Enviado un Email con las Instrucciones'
	})
}

// Función que comprueba una cuenta
const confirmar = async (req, res, next) => {
	const {token} = req.params

	// Verificar si el token es válido
	const usuario = await Usuario.findOne({where: {token}})
	if(!usuario) {
		return res.render('auth/confirmar-cuenta', {
			titulo: 'Error al confirmar tu cuenta',
			mensaje: 'Hubo un error al confirmar tu cuenta, intenta nuevamente',
			error: true
		})
	}
	
	// Confirmar la cuenta
	usuario.token = null
	usuario.confirmado = true
	await usuario.save()
	res.render('auth/confirmar-cuenta', {
		titulo: 'Cuenta Confirmada',
		mensaje: 'La cuenta se confirmó exitosamente'
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
	registrar,
	confirmar,
	formularioOlvidePassword
}