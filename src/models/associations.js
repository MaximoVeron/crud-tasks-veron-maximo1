import User from "./user.models.js";
import Task from "./task.models.js";
import UserProfile from "./user_profile.models.js";
import Category from "./category.models.js";
import TaskCategory from "./task_category.models.js";

// Relaciones 1:N (Un usuario puede tener muchas tareas)
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks'
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Relaciones 1:1 (Un usuario tiene un perfil)
User.hasOne(UserProfile, {
  foreignKey: 'user_id',
  as: 'profile'
});

UserProfile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Relaciones M:N (Tareas pueden tener muchas categorías y viceversa)
Task.belongsToMany(Category, {
  through: TaskCategory,
  foreignKey: 'task_id',
  otherKey: 'category_id',
  as: 'categories'
});

Category.belongsToMany(Task, {
  through: TaskCategory,
  foreignKey: 'category_id',
  otherKey: 'task_id',
  as: 'tasks'
});

// Relaciones directas con la tabla intermedia
Task.hasMany(TaskCategory, {
  foreignKey: 'task_id',
  as: 'taskCategories'
});

Category.hasMany(TaskCategory, {
  foreignKey: 'category_id',
  as: 'taskCategories'
});

TaskCategory.belongsTo(Task, {
  foreignKey: 'task_id',
  as: 'task'
});

TaskCategory.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

export { User, Task, UserProfile, Category, TaskCategory };
