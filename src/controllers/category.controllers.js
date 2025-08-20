import { Category, Task, User } from "../models/associations.js";

// Funciones de validación para Category
function validateName(name) {
  if (!name || typeof name !== "string" || name.trim() === "" || name.length > 100) {
    return "El nombre es obligatorio, debe ser una cadena y máximo 100 caracteres.";
  }
  return null;
}

function validateDescription(description) {
  if (description && typeof description !== "string") {
    return "La descripción debe ser una cadena de texto.";
  }
  return null;
}

function validateColorCode(color_code) {
  if (color_code && (typeof color_code !== "string" || !/^#[0-9A-Fa-f]{6}$/.test(color_code))) {
    return "El código de color debe ser un código hexadecimal válido (ej: #FF0000).";
  }
  return null;
}

async function validateUniqueName(name, CategoryModel) {
  const existingCategory = await CategoryModel.findOne({ where: { name } });
  if (existingCategory) {
    return "El nombre de la categoría debe ser único.";
  }
  return null;
}

// Crear una categoría
export const createCategory = async (req, res) => {
  try {
    const { name, description, color_code } = req.body;

    // Validar name
    const nameError = validateName(name);
    if (nameError) return res.status(400).json({ error: nameError });

    // Validar unicidad del nombre
    const uniqueNameError = await validateUniqueName(name, Category);
    if (uniqueNameError) return res.status(400).json({ error: uniqueNameError });

    // Validar description
    const descError = validateDescription(description);
    if (descError) return res.status(400).json({ error: descError });

    // Validar color_code
    const colorError = validateColorCode(color_code);
    if (colorError) return res.status(400).json({ error: colorError });

    const newCategory = await Category.create({
      name,
      description,
      color_code: color_code || '#808080'
    });

    res.status(201).json({ message: "Categoría creada correctamente", category: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Task,
        as: 'tasks',
        attributes: ['id', 'title', 'description', 'is_complete'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }]
      }]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};
