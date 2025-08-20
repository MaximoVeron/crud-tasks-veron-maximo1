import { UserProfile, User } from "../models/associations.js";

// Funciones de validación para UserProfile
function validateBio(bio) {
  if (bio && typeof bio !== "string") {
    return "La bio debe ser una cadena de texto.";
  }
  return null;
}

function validatePhoneNumber(phone_number) {
  if (phone_number && (typeof phone_number !== "string" || phone_number.length > 20)) {
    return "El número de teléfono debe ser una cadena de máximo 20 caracteres.";
  }
  return null;
}

function validateDateOfBirth(date_of_birth) {
  if (date_of_birth && isNaN(Date.parse(date_of_birth))) {
    return "La fecha de nacimiento debe ser una fecha válida.";
  }
  return null;
}

function validateProfilePictureUrl(profile_picture_url) {
  if (profile_picture_url && (typeof profile_picture_url !== "string" || profile_picture_url.length > 255)) {
    return "La URL de la foto de perfil debe ser una cadena de máximo 255 caracteres.";
  }
  return null;
}

function validateUserId(user_id) {
  if (!user_id || typeof user_id !== "number" || user_id <= 0) {
    return "El user_id es obligatorio y debe ser un número válido mayor a 0.";
  }
  return null;
}

// Crear un perfil de usuario
export const createUserProfile = async (req, res) => {
  try {
    const { bio, phone_number, date_of_birth, profile_picture_url, user_id } = req.body;

    // Validar user_id
    const userIdError = validateUserId(user_id);
    if (userIdError) return res.status(400).json({ error: userIdError });

    // Validar que el usuario exista
    const userExists = await User.findByPk(user_id);
    if (!userExists) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Validar que el usuario no tenga ya un perfil
    const existingProfile = await UserProfile.findOne({ where: { user_id } });
    if (existingProfile) {
      return res.status(400).json({ error: "El usuario ya tiene un perfil" });
    }

    // Validar otros campos
    const bioError = validateBio(bio);
    if (bioError) return res.status(400).json({ error: bioError });

    const phoneError = validatePhoneNumber(phone_number);
    if (phoneError) return res.status(400).json({ error: phoneError });

    const dateError = validateDateOfBirth(date_of_birth);
    if (dateError) return res.status(400).json({ error: dateError });

    const urlError = validateProfilePictureUrl(profile_picture_url);
    if (urlError) return res.status(400).json({ error: urlError });

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
