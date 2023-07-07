export async function jsonFetch<T = null>(url: string) {
  console.log(`[jsonFetch] ${url}`);
  return await fetch(url).then<T>(it => it.json());
}

export default jsonFetch;
