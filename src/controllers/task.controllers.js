import Task from "../models/task.models.js";

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

// Obtener una tarea por id
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    await task.update({ title, description, isComplete });
    res.status(200).json({ message: "Tarea actualizada correctamente", task });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    await task.destroy();
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};

