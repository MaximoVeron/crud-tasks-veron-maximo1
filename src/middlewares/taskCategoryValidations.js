import { body, param } from 'express-validator';
import { TaskCategory, Task, Category } from '../models/associations.js';
import { handleValidationErrors } from './userValidations.js';

// Validaciones para crear relación tarea-categoría
export const validateCreateTaskCategory = [
  body('task_id')
    .notEmpty()
    .withMessage('El task_id es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El task_id debe ser un número entero positivo')
    .custom(async (task_id) => {
      const task = await Task.findByPk(task_id);
      if (!task) {
        throw new Error('La tarea especificada no existe');
      }
      return true;
    }),
  
  body('category_id')
    .notEmpty()
    .withMessage('El category_id es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El category_id debe ser un número entero positivo')
    .custom(async (category_id) => {
      const category = await Category.findByPk(category_id);
      if (!category) {
        throw new Error('La categoría especificada no existe');
      }
      return true;
    }),
  
  // Validación personalizada para verificar que la relación no exista
  body()
    .custom(async (body) => {
      const { task_id, category_id } = body;
      if (task_id && category_id) {
        const existingRelation = await TaskCategory.findOne({
          where: { task_id, category_id }
        });
        if (existingRelation) {
          throw new Error('Esta relación tarea-categoría ya existe');
        }
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validaciones para obtener/eliminar relación por ID
export const validateTaskCategoryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const taskCategory = await TaskCategory.findByPk(id);
      if (!taskCategory) {
        throw new Error('La relación tarea-categoría no existe');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validaciones para actualizar relación tarea-categoría
export const validateUpdateTaskCategory = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const taskCategory = await TaskCategory.findByPk(id);
      if (!taskCategory) {
        throw new Error('La relación tarea-categoría no existe');
      }
      return true;
    }),
  
  body('task_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El task_id debe ser un número entero positivo')
    .custom(async (task_id) => {
      if (task_id) {
        const task = await Task.findByPk(task_id);
        if (!task) {
          throw new Error('La tarea especificada no existe');
        }
      }
      return true;
    }),
  
  body('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El category_id debe ser un número entero positivo')
    .custom(async (category_id) => {
      if (category_id) {
        const category = await Category.findByPk(category_id);
        if (!category) {
          throw new Error('La categoría especificada no existe');
        }
      }
      return true;
    }),
  
  handleValidationErrors
];
