import {Low} from "lowdb";
import {JSONFile} from "lowdb/node";
import {nanoid} from "nanoid";
import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "src", "db.json");

if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({forms: []}, null, 2));
} else {
    const content = fs.readFileSync(file, "utf-8");
    if (!content || content.trim() === "") {
        fs.writeFileSync(file, JSON.stringify({forms: []}, null, 2));
    }
}

const adapter = new JSONFile(file);
const defaultData = {forms: []};
const db = new Low(adapter, defaultData);

await db.read();

if (!db.data || Object.keys(db.data).length === 0) {
    db.data = {forms: []};
    await db.write();
}

const get = (key) => ({
    insert: (obj) => ({
        write: () => {
            const id = nanoid();
            const entry = {
                id,
                ...obj,
                createdAt: new Date().toISOString()
            };
            db.data[key].push(entry);
            db.write();
            return entry;
        }
    }),

    find: (query) => ({
        assign: (payload) => ({
            write: () => {
                const idx = db.data[key].findIndex((it) => it.id === query.id);
                if (idx === -1) throw new Error("Registro no encontrado");
                db.data[key][idx] = {
                    ...db.data[key][idx],
                    ...payload,
                    updatedAt: new Date().toISOString()
                };
                db.write();
            }
        }),
        value: () => {
            return db.data[key].find((it) => it.id === query.id);
        }
    }),

    remove: (query) => ({
        write: () => {
            const initialLength = db.data[key].length;
            db.data[key] = db.data[key].filter((it) => it.id !== query.id);
            if (db.data[key].length === initialLength) {
                throw new Error("Registro no encontrado");
            }
            db.write();
        }
    }),

    chain: () => ({
        cloneDeep: () => ({
            value: () => [...db.data[key]]
        })
    })
});

export default {get};