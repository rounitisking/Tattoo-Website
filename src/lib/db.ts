import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');

/** Read and parse a JSON data file */
export function readJSON<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return [] as unknown as T;
  }
  const raw = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(raw) as T;
}

/** Write data to a JSON file atomically */
export function writeJSON<T>(filename: string, data: T): void {
  const filepath = path.join(DATA_DIR, filename);
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  // Write to temp file first, then rename (atomic write)
  const tmpPath = filepath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpPath, filepath);
}

/** Generate a simple UUID v4-style ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
