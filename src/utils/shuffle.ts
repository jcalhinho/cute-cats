export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickTwoDistinct<T>(arr: T[]): [T, T] {
  if (arr.length < 2) throw new Error('Need at least 2 items');
  const i = (Math.random() * arr.length) | 0;
  let j = (Math.random() * arr.length) | 0;
  while (j === i) j = (Math.random() * arr.length) | 0;
  return [arr[i], arr[j]];
}