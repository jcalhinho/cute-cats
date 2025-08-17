import { useState } from 'react';
import styles from './CatCard.module.css';
import type { Cat } from '../types';

type Props = {
  cat: Cat;
  onVote: (catId: number) => void;
  label?: 'Gauche' | 'Droite';
};

const fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#0b0f1f"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="20">No image</text></svg>`
);

export default function CatCard({ cat, onVote, label }: Props) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <button
      type="button"
      className={`card ${styles.card}`}
      aria-label={`Voter pour ${cat.name}${label ? ' (' + label + ')' : ''}`}
      onClick={() => onVote(cat.id)}
    >
      <div className={styles.imgWrap}>
        <img
          src={imgOk ? cat.url : fallback}
          onError={() => setImgOk(false)}
          alt={cat.name}
          className={styles.img}
          loading="eager"
        />
      </div>
      <div className={styles.name}>{cat.name}</div>
    </button>
  );
}