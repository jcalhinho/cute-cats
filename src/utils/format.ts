export const ratio = (wins: number, played: number) =>
  played === 0 ? 0 : wins / played;

export const percent = (x: number) => `${(x * 100).toFixed(1)}%`;