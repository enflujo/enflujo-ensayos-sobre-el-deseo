// fuente/aplicacion.ts
import fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import cors from '@fastify/cors';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const schema = {
  type: 'object',
  required: ['PUERTO', 'AMBIENTE'],
  properties: {
    PUERTO: { type: 'integer', default: 8000 },
    AMBIENTE: { type: 'string', default: 'desarrollo', enum: ['desarrollo', 'produccion'] },
  },
} as const;

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PUERTO: number;
      AMBIENTE: 'desarrollo' | 'produccion';
    };
  }
}

const app = fastify({ logger: true });

await app.register(fastifyEnv, {
  confKey: 'config',
  schema,
  dotenv: true,
});

await app.register(cors, {
  origin: ['https://deseos.enflujo.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600,
  preflight: true,
});

function setCors(reply: any) {
  reply.header('Access-Control-Allow-Origin', 'https://deseos.enflujo.com');
  reply.header('Access-Control-Allow-Credentials', 'true');
  reply.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  reply.header('Vary', 'Origin');
}

// Responder cualquier OPTIONS (por si el plugin no intercepta algún edge)
app.options('/*', async (req, reply) => {
  setCors(reply);
  reply.code(204).send();
});

app.setNotFoundHandler((req, reply) => {
  setCors(reply);
  reply.code(404).send({ error: 'Not Found' });
});

app.setErrorHandler((err, req, reply) => {
  app.log.error(err);
  setCors(reply);
  reply.code(err.statusCode || 500).send({ error: 'Internal Error' });
});

const prefijo = '/';
// ---------- sqlite setup ----------
// create/open database in ./datos (ensure directory exists)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datosDir = path.join(__dirname, '..', 'datos');
fs.mkdirSync(datosDir, { recursive: true });
const dbPath = path.join(datosDir, 'postales.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS postales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    creado INTEGER NOT NULL
  )
`);

app.post(`${prefijo}postal`, async (request, reply) => {
  const { text } = request.body as { text: string };
  app.log.info(`Texto recibido: ${text}`);
  try {
    const stmt = db.prepare('INSERT INTO postales (text, creado) VALUES (?, ?)');
    const info = stmt.run(text, Date.now());
    return reply.send({ mensaje: 'Texto recibido correctamente', id: info.lastInsertRowid });
  } catch (err) {
    app.log.error(`Error al insertar en BD: ${String(err)}`);
    return reply.status(500).send({ error: 'Error al insertar en BD' });
  }
});

// GET list of postales (optional query: ?limit=50&offset=0)
app.get(`${prefijo}postales`, async (request, reply) => {
  const q = request.query as Record<string, string | undefined>;
  const rawLimit = parseInt(q.limit || '50', 10);
  const rawOffset = parseInt(q.offset || '0', 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 1000) : 50;
  const offset = Number.isFinite(rawOffset) ? Math.max(rawOffset, 0) : 0;
  try {
    const stmt = db.prepare('SELECT id, text, creado FROM postales ORDER BY id DESC LIMIT ? OFFSET ?');
    const rows = stmt.all(limit, offset) as Array<{ id: number; text: string; creado: number }>;
    const items = rows.map((r) => ({ id: r.id, text: r.text, creado: new Date(r.creado).toISOString() }));
    return reply.send({ items, count: items.length });
  } catch (err) {
    app.log.error(`Error al leer postales: ${String(err)}`);
    return reply.status(500).send({ error: 'Error al leer postales' });
  }
});

const direccion = await app.listen({ port: app.config.PUERTO, host: '0.0.0.0' });
app.log.info(`Servidor en ${direccion}`);
