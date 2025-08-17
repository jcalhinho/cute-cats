import { useCallback, useMemo, useState } from 'react';

import { pickTwoDistinct } from '../utils/shuffle';
import type { Cat, Pair } from '../types/types';

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