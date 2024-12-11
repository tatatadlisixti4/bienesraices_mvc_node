import {check, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/tokens.js'
import {emailRegistro, emailOlvidePass} from '../helpers/emails.js'

const formularioLogin = (req, res) => {
	res.render('auth/login', {
		autenticado: false,
		titulo: 'Iniciar Sesión',
		csrfToken: req.csrfToken()
	})
}

const autenticar = async (req, res) => {
	// Validación
	await check('email') 
		.isEmail()
		.withMessage('Eso no es un email, PAYASO')
		.run(req)
	await check('password') 
		.notEmpty()
		.withMessage('El Password es obligatorio')
		.run(req)
	let resultado = validationResult(req)

	//Verificar que el resultado esté vacío
	if(!resultado.isEmpty()) {
		return res.render('auth/login', {
			titulo: 'Iniciar Sesión',
			csrfToken: req.csrfToken(),
			errores: resultado.array()
		})
	}
	const {email, password} = req.body

	// Comprobar si el usuario existe
	const usuario = await Usuario.findOne({where: {email}})
	if(!usuario) {
		return res.render('auth/login', {
			titulo: 'Iniciar Sesión',
			csrfToken: req.csrfToken(),
			errores: [{msg: 'El usuario no existe'}]
		})
	}

	// Comprobar si el usuario está confirmado
	if(!usuario.confirmado) {
		return res.render('auth/login', {
			titulo: 'Iniciar Sesión',
			csrfToken: req.csrfToken(),
			errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
		})
	}

}

const formularioRegistro = (req, res) => {
	res.render('auth/registro', {
		titulo: 'Crea Cuenta',
		csrfToken: req.csrfToken()
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
		.custom((value, {req}) => {
			if (value !== password) {
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
			csrfToken: req.csrfToken(),
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
			csrfToken: req.csrfToken(),
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
		titulo: 'Recupera tu acceso a Bienes Raíces',
		csrfToken: req.csrfToken()
	})
}

const resetPassword = async (req, res) => {
	// Validación
	await check('email') 
		.isEmail()
		.withMessage('Eso no es un email, PAYASO')
		.run(req)
	let resultado = validationResult(req)

	//Verificar que el resultado esté vacío
	if(!resultado.isEmpty()) {
		return res.render('auth/olvide-password', {
			titulo: 'Recupera tu acceso a Bienes Raíces',
			csrfToken: req.csrfToken(),
			errores: resultado.array()
		})
	}

	// Buscar el usuario con el email
	const {email} = req.body
	const usuario = await Usuario.findOne({where : {email}})
	if(!usuario) {
		return res.render('auth/olvide-password', {
			titulo: 'Recupera tu acceso a Bienes Raíces',
			csrfToken: req.csrfToken(),
			errores: [{msg: 'El email ingresado no es valido'}]
		})
	}

	// Generar el token y enviar el email
	usuario.token = generarId()
	await usuario.save()

	// Enviar un email
	emailOlvidePass({
		nombre: usuario.nombre,
		email: usuario.email, // Puede ser solo email, ...  pero hay que ser consistentes con la nomenclatura
		token: usuario.token
	})
	// Renderizar el mensaje
	res.render('templates/mensaje', {
		titulo: 'Reestablece tu Password',
		mensaje: 'Hemos Enviado un Email con las Instrucciones'
	})
}
const comprobarToken = async (req, res) => {
	const {token} = req.params
	const usuario = await Usuario.findOne({where: {token}})
	if(!usuario) {
		return res.render('auth/confirmar-cuenta', {
			titulo: 'Reestablece tu Password',
			mensaje: 'Hubo un error al validar tu información, intenta nuevamente',
			error: true
		})
	}

	// Mostrar formulario para modificar el password
	res.render('auth/reset-password', {
		titulo: 'Reestablece tu Password',
		csrfToken: req.csrfToken()
	})
}

const nuevoPassword = async (req, res) => {
	// Extraer datos
	const {token} = req.params
	const {password} = req.body

	// Validar el password
	await check('password') 
		.isLength({min: 6})
		.withMessage('El Password debe ser de al menos 6 caracteres')
		.run(req)
	let resultado = validationResult(req)

	//Verificar que el resultado esté vacío
	if(!resultado.isEmpty()) {
		return res.render('auth/reset-password', {
			titulo: 'Reestablece tu Password',
			csrfToken: req.csrfToken(),
			errores: resultado.array()
		})
	}
	
	// Identificar quien hace el cambio
	const usuario = await Usuario.findOne({where: {token}})
	
	// Hashear el nuevo password
	const salt = await bcrypt.genSalt(11)
	usuario.password = await bcrypt.hash(password, salt)
	usuario.token = null

	await usuario.save()
	res.render('auth/confirmar-cuenta', {
		titulo: 'Password Reestablecido', 
		mensaje: 'El password se guardó correctamente'
	})


}

export {
	formularioLogin,
	autenticar,
	formularioRegistro,
	registrar,
	confirmar,
	formularioOlvidePassword,
	resetPassword,
	comprobarToken,
	nuevoPassword
}