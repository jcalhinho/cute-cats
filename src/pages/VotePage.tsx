import React, { useEffect, useMemo, useState } from 'react';
import { fetchCats } from '../api/cats';
import type { Cat } from '../types';
import Loader from '../components/Loader';
import CatCard from '../components/CatCard';
import ResultToast from '../components/ResultToast';
import { useRandomPair } from '../hooks/useRandomPair';
import { useScores } from '../context/ScoreContext';

export default function VotePage() {
  const { state, dispatch } = useScores();
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { pair, nextPair, ready } = useRandomPair(cats);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchCats();
        if (!alive) return;
        setCats(res.images);
        dispatch({ type: 'INIT', cats: res.images });
      } catch (e: any) {
        setErr(e?.message ?? 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [dispatch]);

  useEffect(() => {
    if (ready) nextPair();
  }, [ready, nextPair]);

  const onVote = (winnerId: number, loserId: number) => {
    dispatch({ type: 'VOTE', winnerId, loserId });
    setToast('Vote enregistré ✅');
    setTimeout(() => setToast(null), 1200);
    nextPair();
  };

  const leftId = useMemo(() => pair?.left.id, [pair]);
  const rightId = useMemo(() => pair?.right.id, [pair]);

  if (loading) return <Loader />;
  if (err) return <div className="container card" style={{padding:16}}><p>Erreur : {err}</p></div>;
  if (!pair) return <div className="container"><p>Pas assez de chats pour voter.</p></div>;

  return (
    <div className="container">
      <h1 style={{margin: '16px 0'}}>Le chat le plus mignon</h1>
      <p style={{color: 'var(--muted)', marginTop: -8, marginBottom: 16}}>
        Clique sur l’un des deux chats pour voter. Deux nouveaux apparaîtront automatiquement.
      </p>

      <div className="grid-2">
        <CatCard cat={pair.left}  onVote={() => onVote(leftId!, rightId!)} label="Gauche" />
        <CatCard cat={pair.right} onVote={() => onVote(rightId!, leftId!)} label="Droite" />
      </div>

      {toast && <ResultToast text={toast} />}

      <div className="card" style={{padding: 12, marginTop: 16}}>
        <small style={{color: 'var(--muted)'}}>
          Astuce : le classement utilise le ratio <em>gagnés / joués</em>. Va voir l’onglet “Scores”.
        </small>
      </div>
    </div>
  );
}