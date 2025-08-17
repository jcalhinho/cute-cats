import { useCallback, useMemo, useState } from 'react';
import type { Cat, Pair } from '../types';
import { pickTwoDistinct } from '../utils/shuffle';

export function useRandomPair(cats: Cat[]) {
  const [pair, setPair] = useState<Pair | null>(null);

  const nextPair = useCallback(() => {
    if (cats.length >= 2) {
      const [a, b] = pickTwoDistinct(cats);
      setPair({ left: a, right: b });
    }
  }, [cats]);

  const ready = useMemo(() => cats.length >= 2, [cats]);

  return { pair, setPair, nextPair, ready };
}