import { body, param, validationResult } from 'express-validator';
import { User } from '../models/associations.js';

// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Errores de validación',
      details: errors.array()
    });
  }
  next();
};

// Validaciones para crear usuario
export const validateCreateUser = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),
  
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .isLength({ max: 100 })
    .withMessage('El email no puede tener más de 100 caracteres')
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('El email ya está en uso');
      }
      return true;
    }),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6, max: 100 })
    .withMessage('La contraseña debe tener entre 6 y 100 caracteres')
    .isString()
    .withMessage('La contraseña debe ser una cadena de texto'),
  
  handleValidationErrors
];

// Validaciones para actualizar usuario
export const validateUpdateUser = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('El usuario no existe');
      }
      return true;
    }),
  
  body('name')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .isLength({ max: 100 })
    .withMessage('El email no puede tener más de 100 caracteres')
    .custom(async (email, { req }) => {
      if (email) {
        const existingUser = await User.findOne({ 
          where: { 
            email,
            id: { [User.sequelize.Op.ne]: req.params.id }
          } 
        });
        if (existingUser) {
          throw new Error('El email ya está en uso');
        }
      }
      return true;
    }),
  
  body('password')
    .optional()
    .isLength({ min: 6, max: 100 })
    .withMessage('La contraseña debe tener entre 6 y 100 caracteres')
    .isString()
    .withMessage('La contraseña debe ser una cadena de texto'),
  
  handleValidationErrors
];

// Validaciones para obtener/eliminar usuario por ID
export const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('El usuario no existe');
      }
      return true;
    }),
  
  handleValidationErrors
];
