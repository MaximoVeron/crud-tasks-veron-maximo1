import { UserProfile, User } from "../models/associations.js";

// Crear un perfil de usuario
export const createUserProfile = async (req, res) => {
  try {
    const { bio, phone_number, date_of_birth, profile_picture_url, user_id } = req.body;
    const newProfile = await UserProfile.create({
      bio,
      phone_number,
      date_of_birth,
      profile_picture_url,
      user_id
    });
    res.status(201).json({ message: "Perfil de usuario creado correctamente", profile: newProfile });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el perfil de usuario" });
  }
};

// Obtener todos los perfiles de usuario
export const getAllUserProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los perfiles de usuario" });
  }
};

// Obtener un perfil de usuario por ID
export const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await UserProfile.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil de usuario" });
  }
};

// Actualizar un perfil de usuario
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, phone_number, date_of_birth, profile_picture_url } = req.body;
    
    const profile = await UserProfile.findByPk(id);
    await profile.update({ bio, phone_number, date_of_birth, profile_picture_url });
    res.status(200).json({ message: "Perfil actualizado correctamente", profile });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el perfil de usuario" });
  }
};

// Eliminar un perfil de usuario
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await UserProfile.findByPk(id);
    await profile.destroy();
    res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el perfil de usuario" });
  }
};
