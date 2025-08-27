import { Category, Task, User } from "../models/associations.js";

// Crear una categoría
export const createCategory = async (req, res) => {
  try {
    const { name, description, color_code } = req.body;
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

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
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
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, color_code } = req.body;
    
    const category = await Category.scope('all').findByPk(id);
    await category.update({ name, description, color_code });
    res.status(200).json({ message: 'Categoría actualizada correctamente', category });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminación lógica de una categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.scope('all').findByPk(id);
    category.is_deleted = true;
    await category.save();
    res.status(200).json({ message: 'Categoría eliminada lógicamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
