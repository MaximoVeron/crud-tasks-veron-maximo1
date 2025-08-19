import Task from "../models/user.models.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await Task.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Task.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await Task.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.update({ name, email, password });
    res.status(200).json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Task.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
