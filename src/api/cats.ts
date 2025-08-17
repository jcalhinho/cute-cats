import type { CatsResponse } from "../types/types";


const ENDPOINT = 'https://data.latelier.co/cats.json';

export async function fetchCats(): Promise<CatsResponse> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.json() as Promise<CatsResponse>;
}