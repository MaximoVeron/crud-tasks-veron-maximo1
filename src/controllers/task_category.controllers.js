import { TaskCategory, Task, Category, User } from "../models/associations.js";

// Funciones de validación para TaskCategory
function validateTaskId(task_id) {
  if (!task_id || typeof task_id !== "number" || task_id <= 0) {
    return "El task_id es obligatorio y debe ser un número válido mayor a 0.";
  }
  return null;
}

function validateCategoryId(category_id) {
  if (!category_id || typeof category_id !== "number" || category_id <= 0) {
    return "El category_id es obligatorio y debe ser un número válido mayor a 0.";
  }
  return null;
}

// Crear una relación tarea-categoría
export const createTaskCategory = async (req, res) => {
  try {
    const { task_id, category_id } = req.body;

    // Validar task_id
    const taskIdError = validateTaskId(task_id);
    if (taskIdError) return res.status(400).json({ error: taskIdError });

    // Validar category_id
    const categoryIdError = validateCategoryId(category_id);
    if (categoryIdError) return res.status(400).json({ error: categoryIdError });

    // Validar que la tarea exista
    const taskExists = await Task.findByPk(task_id);
    if (!taskExists) {
      return res.status(404).json({ error: "La tarea no existe" });
    }

    // Validar que la categoría exista
    const categoryExists = await Category.findByPk(category_id);
    if (!categoryExists) {
      return res.status(404).json({ error: "La categoría no existe" });
    }

    // Validar que la relación no exista ya
    const existingRelation = await TaskCategory.findOne({
      where: { task_id, category_id }
    });
    if (existingRelation) {
      return res.status(400).json({ error: "Esta tarea ya está asignada a esta categoría" });
    }

    const newTaskCategory = await TaskCategory.create({
      task_id,
      category_id
    });

    res.status(201).json({ message: "Relación tarea-categoría creada correctamente", taskCategory: newTaskCategory });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la relación tarea-categoría" });
  }
};

// Obtener todas las relaciones tarea-categoría
export const getAllTaskCategories = async (req, res) => {
  try {
    const taskCategories = await TaskCategory.findAll({
      include: [
        {
          model: Task,
          as: 'task',
          attributes: ['id', 'title', 'description', 'is_complete'],
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email']
          }]
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'description', 'color_code']
        }
      ]
    });
    res.status(200).json(taskCategories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las relaciones tarea-categoría" });
  }
};
