import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";

// Ruta al archivo db.json
const file = path.join(process.cwd(), "src", "db.json");

// Asegurarse que exista y tenga datos por defecto
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify({ forms: [] }, null, 2));
} else {
  // Si existe pero está vacío, agregar datos por defecto
  const content = fs.readFileSync(file, "utf-8");
  if (!content || content.trim() === "") {
    fs.writeFileSync(file, JSON.stringify({ forms: [] }, null, 2));
  }
}

// Crear adaptador y base de datos CON datos por defecto
const adapter = new JSONFile(file);
const defaultData = { forms: [] };
const db = new Low(adapter, defaultData);

// Leer datos de manera segura
await db.read();

// Por seguridad, asegurarse que db.data tenga datos por defecto
if (!db.data || Object.keys(db.data).length === 0) {
  db.data = { forms: [] };
  await db.write();
}

// Repositorio simple
const get = (key) => ({
  insert: (obj) => {
    const id = nanoid();
    const entry = { id, ...obj };
    db.data[key].push(entry);
    db.write();
    return entry;
  },
  find: (query) => ({
    assign: (payload) => {
      const idx = db.data[key].findIndex(
        (it) =>
          it.id === query.id ||
          Object.keys(query).every((k) => it[k] === query[k])
      );
      if (idx === -1) return;
      db.data[key][idx] = { ...db.data[key][idx], ...payload };
      db.write();
    },
    value: () => db.data[key].find((it) => it.id === query.id),
  }),
  remove: (query) => ({
    write: () => {
      db.data[key] = db.data[key].filter((it) => it.id !== query.id);
      db.write();
    },
  }),
  chain: () => ({
    cloneDeep: () => ({
      value: () => db.data[key],
    }),
  }),
});

export default { get };