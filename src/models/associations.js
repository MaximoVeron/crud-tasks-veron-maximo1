import User from "./user.models.js";
import Task from "./task.models.js";

// Definir las relaciones
// Un usuario puede tener muchas tareas
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks'
});

// Cada tarea pertenece a un único usuario
Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export { User, Task };
