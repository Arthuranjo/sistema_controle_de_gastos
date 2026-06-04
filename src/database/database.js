import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;

// =========================
// MOBILE (NOVO PADRÃO EXPO 54)
// =========================
if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('controleGastos.db');
}

// =========================
// INIT DATABASE
// =========================
export const initDatabase = async () => {
  if (!db) return;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL
    );
  `);
};

// =========================
// WEB HELPERS
// =========================
const getWebData = () => {
  const data = localStorage.getItem('gastos');
  return data ? JSON.parse(data) : [];
};

const saveWebData = (data) => {
  localStorage.setItem('gastos', JSON.stringify(data));
};

// =========================
// INSERT
// =========================
export const insertGasto = async (descricao, categoria, valor, data) => {

  // 🌐 WEB
  if (!db) {
    const gastos = getWebData();

    const novoGasto = {
      id: Date.now(),
      descricao,
      categoria,
      valor,
      data
    };

    gastos.unshift(novoGasto);
    saveWebData(gastos);

    return novoGasto.id;
  }

  // 📱 MOBILE (NOVO PADRÃO)
  const result = await db.runAsync(
    'INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?, ?, ?, ?);',
    [descricao, categoria, valor, data]
  );

  return result.lastInsertRowId;
};

// =========================
// SELECT
// =========================
export const selectAllGastos = async () => {

  // 🌐 WEB
  if (!db) {
    return getWebData();
  }

  // 📱 MOBILE
  const result = await db.getAllAsync(
    'SELECT * FROM gastos ORDER BY id DESC;'
  );

  return result;
};

// =========================
// DELETE
// =========================
export const deleteGasto = async (id) => {

  // 🌐 WEB
  if (!db) {
    const gastos = getWebData();
    const novos = gastos.filter(g => String(g.id) !== String(id));
    saveWebData(novos);
    return true;
  }

  // 📱 MOBILE
  await db.runAsync(
    'DELETE FROM gastos WHERE id = ?;',
    [id]
  );

  return true;
};