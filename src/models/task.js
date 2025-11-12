
const { dbPromise } = require('../db');

class Task {
  static async create({ title, description, completed = false }) {
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO tasks (title, description, completed, createdAt, updatedAt) VALUES (?, ?, ?, datetime("now"), datetime("now"))',
      title,
      description || null,
      completed ? 1 : 0
    );
    return Task.findById(result.lastID);
  }

  static async findAll() {
    const db = await dbPromise;
    return db.all('SELECT * FROM tasks ORDER BY createdAt DESC LIMIT 100');
  }

  static async findById(id) {
    const db = await dbPromise;
    return db.get('SELECT * FROM tasks WHERE id = ?', id);
  }

  static async update(id, { title, description, completed }) {
    const db = await dbPromise;
    await db.run(
      'UPDATE tasks SET title = ?, description = ?, completed = ?, updatedAt = datetime("now") WHERE id = ?',
      title,
      description || null,
      completed ? 1 : 0,
      id
    );
    return Task.findById(id);
  }

  static async delete(id) {
    const db = await dbPromise;
    return db.run('DELETE FROM tasks WHERE id = ?', id);
  }
}

module.exports = Task;
