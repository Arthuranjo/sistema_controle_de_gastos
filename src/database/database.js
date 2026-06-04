import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;

// MOBILE → usa SQLite
if (Platform.OS !== 'web') {
  db = SQLite.openDatabase('controleGastos.db');
}

// =========================
// INIT DATABASE
// =========================
export const initDatabase = () => {
  if (!db) return;

  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS gastos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        categoria TEXT NOT NULL,
        valor REAL NOT NULL,
        data TEXT NOT NULL
      );
    `);
  });
};

// =========================
// WEB HELPERS (localStorage)
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
export const insertGasto = (descricao, categoria, valor, data) => {

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

    return Promise.resolve(novoGasto.id);
  }

  // 📱 MOBILE
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?, ?, ?, ?);',
        [descricao, categoria, valor, data],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

// =========================
// SELECT
// =========================
export const selectAllGastos = () => {

  // 🌐 WEB
  if (!db) {
    return Promise.resolve(getWebData());
  }

  // 📱 MOBILE
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM gastos ORDER BY id DESC;',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// =========================
// DELETE
// =========================
export const deleteGasto = (id) => {
  if (!db) {
    const gastos = getWebData();

    console.log("ANTES:", gastos);
    console.log("ID PARA REMOVER:", id);

    const novos = gastos.filter(g => String(g.id) !== String(id));

    console.log("DEPOIS:", novos);

    saveWebData(novos);

    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM gastos WHERE id = ?;',
        [id],
        (_, result) => resolve(true),
        (_, error) => reject(error)
      );
    });
  });
};