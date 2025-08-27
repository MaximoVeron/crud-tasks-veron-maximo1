import { User, Task, UserProfile } from "../models/associations.js";

// Crear un usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Usuario creado correctamente", user });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'title', 'description', 'is_complete']
        },
        {
          model: UserProfile,
          as: 'profile',
          attributes: ['bio', 'phone_number', 'date_of_birth', 'profile_picture_url']
        }
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'title', 'description', 'is_complete']
        },
        {
          model: UserProfile,
          as: 'profile',
          attributes: ['bio', 'phone_number', 'date_of_birth', 'profile_picture_url']
        }
      ]
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const user = await User.findByPk(id);
    await user.update({ name, email, password });
    res.status(200).json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
