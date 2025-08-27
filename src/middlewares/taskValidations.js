import { body, param } from 'express-validator';
import { Task, User } from '../models/associations.js';
import { handleValidationErrors } from './userValidations.js';

// Validaciones para crear tarea
export const validateCreateTask = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres')
    .isString()
    .withMessage('El título debe ser una cadena de texto'),
  
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto'),
  
  body('is_complete')
    .optional()
    .isBoolean()
    .withMessage('is_complete debe ser un valor booleano'),
  
  body('userId')
    .notEmpty()
    .withMessage('El userId es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El userId debe ser un número entero positivo')
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('El usuario especificado no existe');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validaciones para actualizar tarea
export const validateUpdateTask = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error('La tarea no existe');
      }
      return true;
    }),
  
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres')
    .isString()
    .withMessage('El título debe ser una cadena de texto'),
  
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto'),
  
  body('is_complete')
    .optional()
    .isBoolean()
    .withMessage('is_complete debe ser un valor booleano'),
  
  body('userId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El userId debe ser un número entero positivo')
    .custom(async (userId) => {
      if (userId) {
        const user = await User.findByPk(userId);
        if (!user) {
          throw new Error('El usuario especificado no existe');
        }
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validaciones para obtener/eliminar tarea por ID
export const validateTaskId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error('La tarea no existe');
      }
      return true;
    }),
  
  handleValidationErrors
];
