import { body, param } from 'express-validator';
import { UserProfile, User } from '../models/associations.js';
import { handleValidationErrors } from './userValidations.js';

// Validaciones para crear perfil de usuario
export const validateCreateUserProfile = [
  body('bio')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La bio no puede tener más de 1000 caracteres')
    .isString()
    .withMessage('La bio debe ser una cadena de texto'),
  
  body('phone_number')
    .optional()
    .isLength({ max: 20 })
    .withMessage('El número de teléfono no puede tener más de 20 caracteres')
    .isMobilePhone()
    .withMessage('Debe ser un número de teléfono válido'),
  
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)')
    .custom((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        throw new Error('La edad debe estar entre 13 y 120 años');
      }
      return true;
    }),
  
  body('profile_picture_url')
    .optional()
    .isURL()
    .withMessage('Debe ser una URL válida')
    .isLength({ max: 255 })
    .withMessage('La URL no puede tener más de 255 caracteres'),
  
  body('user_id')
    .notEmpty()
    .withMessage('El user_id es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El user_id debe ser un número entero positivo')
    .custom(async (user_id) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error('El usuario especificado no existe');
      }
      
      const existingProfile = await UserProfile.findOne({ where: { user_id } });
      if (existingProfile) {
        throw new Error('El usuario ya tiene un perfil asociado');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validaciones para actualizar perfil de usuario
export const validateUpdateUserProfile = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const profile = await UserProfile.findByPk(id);
      if (!profile) {
        throw new Error('El perfil de usuario no existe');
      }
      return true;
    }),
  
  body('bio')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La bio no puede tener más de 1000 caracteres')
    .isString()
    .withMessage('La bio debe ser una cadena de texto'),
  
  body('phone_number')
    .optional()
    .isLength({ max: 20 })
    .withMessage('El número de teléfono no puede tener más de 20 caracteres')
    .isMobilePhone()
    .withMessage('Debe ser un número de teléfono válido'),
  
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)')
    .custom((date) => {
      if (date) {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13 || age > 120) {
          throw new Error('La edad debe estar entre 13 y 120 años');
        }
      }
      return true;
    }),
  
  body('profile_picture_url')
    .optional()
    .isURL()
    .withMessage('Debe ser una URL válida')
    .isLength({ max: 255 })
    .withMessage('La URL no puede tener más de 255 caracteres'),
  
  handleValidationErrors
];

// Validaciones para obtener/eliminar perfil por ID
export const validateUserProfileId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const profile = await UserProfile.findByPk(id);
      if (!profile) {
        throw new Error('El perfil de usuario no existe');
      }
      return true;
    }),
  
  handleValidationErrors
];
