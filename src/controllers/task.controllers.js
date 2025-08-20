import { Task, User } from "../models/associations.js";

// Funciones de validación reutilizables para tareas
function validateTitle(title) {
  if (!title || typeof title !== "string" || title.trim() === "" || title.length > 100) {
    return "El título es obligatorio, debe ser una cadena y máximo 100 caracteres.";
  }
  return null;
}

async function validateUniqueTitle(title, TaskModel, taskId = null) {
  // Si es update, ignorar la tarea actual
  const where = taskId ? { title, id: { [TaskModel.Sequelize.Op.ne]: taskId } } : { title };
  const existingTask = await TaskModel.findOne({ where });
  if (existingTask) {
    return "El título debe ser único.";
  }
  return null;
}

function validateDescription(description) {
  if (!description || typeof description !== "string" || description.trim() === "" || description.length > 100) {
    return "La descripción es obligatoria, debe ser una cadena y máximo 100 caracteres.";
  }
  return null;
}

function validateIsComplete(isComplete) {
  if (typeof isComplete !== "boolean") {
    return "isComplete debe ser un valor booleano.";
  }
  return null;
}

// Crear una tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;

    // Validar title
    const titleError = validateTitle(title);
    if (titleError) return res.status(400).json({ error: titleError });

    // Validar unicidad de title
    const uniqueTitleError = await validateUniqueTitle(title, Task);
    if (uniqueTitleError) return res.status(400).json({ error: uniqueTitleError });

    // Validar description
    const descError = validateDescription(description);
    if (descError) return res.status(400).json({ error: descError });

    // Validar isComplete
    const isCompleteError = validateIsComplete(isComplete);
    if (isCompleteError) return res.status(400).json({ error: isCompleteError });

    // Validar que el usuario exista
    if (!userId) {
      return res.status(400).json({ error: "El userId es obligatorio" });
    }

    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    const newTask = await Task.create({ 
      title, 
      description, 
      is_complete: isComplete, 
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
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
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
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });
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

    // Validaciones reutilizables
    const titleError = validateTitle(title);
    if (titleError) return res.status(400).json({ error: titleError });

    const uniqueTitleError = await validateUniqueTitle(title, Task, id);
    if (uniqueTitleError) return res.status(400).json({ error: uniqueTitleError });

    const descError = validateDescription(description);
    if (descError) return res.status(400).json({ error: descError });

    const isCompleteError = validateIsComplete(isComplete);
    if (isCompleteError) return res.status(400).json({ error: isCompleteError });

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

