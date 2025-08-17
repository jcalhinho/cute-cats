import type { CatsResponse } from "../types";


const ENDPOINT = '/api/cats';

export async function fetchCats(): Promise<CatsResponse> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.json() as Promise<CatsResponse>;
}