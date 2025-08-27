import { Task, User, Category } from "../models/associations.js";

// Crear una tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, is_complete, userId } = req.body;
    const newTask = await Task.create({ 
      title, 
      description, 
      is_complete: is_complete || false, 
      userId 
    });
    res.status(201).json({ message: "Tarea creada correctamente", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'description', 'color_code']
        }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

// Obtener una tarea por id
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'description', 'color_code']
        }
      ]
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_complete, userId } = req.body;
    
    const task = await Task.findByPk(id);
    await task.update({ title, description, is_complete, userId });
    res.status(200).json({ message: "Tarea actualizada correctamente", task });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    await task.destroy();
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
