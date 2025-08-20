import { User, Task } from "../models/associations.js";

// Funciones de validación
function validateName(name) {
  if (!name || typeof name !== "string" || name.trim() === "" || name.length > 100) {
    return "El nombre es obligatorio, debe ser una cadena y máximo 100 caracteres.";
  }
  return null;
}

async function validateEmail(email, UserModel) {
  if (!email || typeof email !== "string" || email.trim() === "" || email.length > 100) {
    return "El email es obligatorio, debe ser una cadena y máximo 100 caracteres.";
  }
  // Validar unicidad
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    return "El email debe ser único.";
  }
  return null;
}

function validatePassword(password) {
  if (!password || typeof password !== "string" || password.trim() === "" || password.length > 100) {
    return "La contraseña es obligatoria, debe ser una cadena y máximo 100 caracteres.";
  }
  return null;
}

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Task,
        as: 'tasks',
        attributes: ['id', 'title', 'description', 'is_complete']
      }]
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
      include: [{
        model: Task,
        as: 'tasks',
        attributes: ['id', 'title', 'description', 'is_complete']
      }]
    });
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
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validar name
  const nameError = validateName(name);
  if (nameError) return res.status(400).json({ error: nameError });

  // Validar email (incluye unicidad)
  const emailError = await validateEmail(email, User);
  if (emailError) return res.status(400).json({ error: emailError });

  // Validar password
  const passwordError = validatePassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError });

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Usuario creado correctamente", user });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
}
