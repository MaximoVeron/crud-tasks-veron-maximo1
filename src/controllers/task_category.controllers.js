import { TaskCategory, Task, Category, User } from "../models/associations.js";

// Crear una relación tarea-categoría
export const createTaskCategory = async (req, res) => {
  try {
    const { task_id, category_id } = req.body;
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

// Obtener una relación tarea-categoría por ID
export const getTaskCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const taskCategory = await TaskCategory.findByPk(id, {
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
    res.status(200).json(taskCategory);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la relación tarea-categoría" });
  }
};

// Actualizar una relación tarea-categoría
export const updateTaskCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { task_id, category_id } = req.body;
    
    const taskCategory = await TaskCategory.findByPk(id);
    await taskCategory.update({ task_id, category_id });
    res.status(200).json({ message: "Relación actualizada correctamente", taskCategory });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la relación tarea-categoría" });
  }
};

// Eliminar una relación tarea-categoría
export const deleteTaskCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const taskCategory = await TaskCategory.findByPk(id);
    await taskCategory.destroy();
    res.status(200).json({ message: "Relación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la relación tarea-categoría" });
  }
};
