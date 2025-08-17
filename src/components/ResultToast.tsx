import React from 'react';
import styles from './ResultToast.module.css';

export default function ResultToast({ text }: { text: string }) {
  return <div className={styles.toast} role="status" aria-live="polite">{text}</div>;
}