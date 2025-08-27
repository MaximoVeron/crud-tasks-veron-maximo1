import { body, param } from 'express-validator';
import { Category } from '../models/associations.js';
import { handleValidationErrors } from './userValidations.js';

// Validaciones para crear categoría
export const validateCreateCategory = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .custom(async (name) => {
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        throw new Error('El nombre de la categoría ya está en uso');
      }
      return true;
    }),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede tener más de 1000 caracteres')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto'),
  
  body('color_code')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('El código de color debe ser un código hexadecimal válido (ej: #FF0000)'),
  
  handleValidationErrors
];

// Validaciones para actualizar categoría
export const validateUpdateCategory = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const category = await Category.scope('all').findByPk(id);
      if (!category) {
        throw new Error('La categoría no existe');
      }
      if (category.is_deleted) {
        throw new Error('No se puede actualizar una categoría eliminada');
      }
      return true;
    }),
  
  body('name')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .custom(async (name, { req }) => {
      if (name) {
        const existingCategory = await Category.findOne({ 
          where: { 
            name,
            id: { [Category.sequelize.Op.ne]: req.params.id }
          } 
        });
        if (existingCategory) {
          throw new Error('El nombre de la categoría ya está en uso');
        }
      }
      return true;
    }),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede tener más de 1000 caracteres')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto'),
  
  body('color_code')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('El código de color debe ser un código hexadecimal válido (ej: #FF0000)'),
  
  handleValidationErrors
];

// Validaciones para obtener/eliminar categoría por ID
export const validateCategoryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const category = await Category.scope('all').findByPk(id);
      if (!category) {
        throw new Error('La categoría no existe');
      }
      return true;
    }),
  
  handleValidationErrors
];
