const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const dbPath = path.resolve(__dirname, '../taskify.sqlite');

// dbPromise resolves to an opened database with promise-based API
const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

async function init() {
  const db = await dbPromise;
  const createTable = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT
  );`;
  await db.exec(createTable);
  return db;
}

module.exports = { dbPromise, init };
