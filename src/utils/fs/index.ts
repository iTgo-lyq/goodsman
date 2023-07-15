import path from 'path';
import fs from 'fs/promises';

export async function readJson<T>(filepath: string): Promise<T | void>;
export async function readJson<T>(filepath: string, defaultV: T): Promise<T>;
export async function readJson<T>(filepath: string, defaultV?: T): Promise<T | void> {
  try {
    await fs.access(filepath);
  } catch (error) {
    if (!defaultV) return;

    const directory = path.dirname(filepath);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(filepath, JSON.stringify(defaultV, null, 2));

    return defaultV;
  }

  const content = await fs.readFile(filepath, 'utf-8');
  const data = JSON.parse(content);
  return data;
}

export async function writeJson(filepath: string, obj: any): Promise<void> {
  await fs.writeFile(filepath, JSON.stringify(obj, null, 2));
}
