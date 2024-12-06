import {check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/tokens.js'

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
	const existeUsuario = await Usuario.findOne({where: {email : req.body.email}})
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
	
	// Inserción registro
	await Usuario.create({
		nombre,
		email,
		password,
		token: generarId()
	})

	//res.json(usuario)
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