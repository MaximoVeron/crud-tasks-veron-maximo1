import User from "./user.models.js";
import Task from "./task.models.js";
import UserProfile from "./user_profile.models.js";
import Category from "./category.models.js";
import TaskCategory from "./task_category.models.js";

// Relaciones 1:N (Un usuario puede tener muchas tareas)
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
  onDelete: 'CASCADE',
  hooks: true
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
  hooks: true
});

// Relaciones 1:1 (Un usuario tiene un perfil)
User.hasOne(UserProfile, {
  foreignKey: 'user_id',
  as: 'profile',
  onDelete: 'CASCADE',
  hooks: true
});

UserProfile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE',
  hooks: true
});

// Relaciones M:N (Tareas pueden tener muchas categorías y viceversa)
Task.belongsToMany(Category, {
  through: TaskCategory,
  foreignKey: 'task_id',
  otherKey: 'category_id',
  as: 'categories',
  onDelete: 'CASCADE',
  hooks: true
});

Category.belongsToMany(Task, {
  through: TaskCategory,
  foreignKey: 'category_id',
  otherKey: 'task_id',
  as: 'tasks',
  onDelete: 'CASCADE',
  hooks: true
});

// Relaciones directas con la tabla intermedia
Task.hasMany(TaskCategory, {
  foreignKey: 'task_id',
  as: 'taskCategories',
  onDelete: 'CASCADE',
  hooks: true
});

Category.hasMany(TaskCategory, {
  foreignKey: 'category_id',
  as: 'taskCategories',
  onDelete: 'CASCADE',
  hooks: true
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
