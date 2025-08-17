import { useEffect, useMemo, useState } from 'react';
import { fetchCats } from '../api/cats';
import type { Cat } from '../types';
import Loader from '../components/Loader';
import CatCard from '../components/CatCard';
import ResultToast from '../components/ResultToast';
import { useScores } from '../context/ScoreContext';
import { useRandomPair } from '../hooks/UseRandomPair';

export default function VotePage() {
  const { dispatch } = useScores();
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [locked, setLocked] = useState(false); // verrou anti double-clic

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

  useEffect(() => { if (ready) nextPair(); }, [ready, nextPair]);

  const onVote = (winnerId: number, loserId: number) => {
    if (locked) return;
    setLocked(true);

    dispatch({ type: 'VOTE', winnerId, loserId });
    setToast('Vote enregistré ✅');
    setTimeout(() => setToast(null), 1200);

    nextPair();

    // fenêtre anti double-clic / double-tap
    setTimeout(() => setLocked(false), 200);
  };

  const leftId = useMemo(() => pair?.left.id, [pair]);
  const rightId = useMemo(() => pair?.right.id, [pair]);

  if (loading) return <Loader />;
  if (err) return <div className="container card" style={{ padding: 16 }}><p>Erreur : {err}</p></div>;
  if (!pair) return <div className="container"><p>Pas assez de chats pour voter.</p></div>;

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'grid', alignContent: 'start' }}>
     
      <div className="topBrands" aria-label="Marques">
        <div className="topBrand" aria-hidden>😺</div>
        
      </div>
 <div className="topBrands" aria-label="Marques">
        <h2 className="" aria-hidden>CATMASH</h2>
        
      </div>
      {/* Deux colonnes polaroïd de part et d’autre, séparées localement */}
      <div className="voteRowWrap">
      <div className="voteRow" >
        <div className="voteCol">
          <div className="polaroid">
            <div className="polaroidInner">
              <div className="polaroidImgBox">
                <CatCard cat={pair.left} onVote={() => onVote(leftId!, rightId!)} label="Gauche" />
              </div>
            </div>
            <div className="polaroidBar">
              <button
                className="btn"
                onClick={(e) => { e.stopPropagation(); onVote(leftId!, rightId!); }}
                aria-label={`J'aime ${pair.left.name}`}
              >
                J’aime
              </button>
            </div>
          </div>
        </div>

        {/* Séparateur limité à la hauteur des polaroïds */}
        <div className="voteSep" aria-hidden />

        <div className="voteCol">
          <div className="polaroid">
            <div className="polaroidInner">
              <div className="polaroidImgBox">
                <CatCard cat={pair.right} onVote={() => onVote(rightId!, leftId!)} label="Droite" />
              </div>
            </div>
            <div className="polaroidBar">
              <button
                className="btn"
                onClick={(e) => { e.stopPropagation(); onVote(rightId!, leftId!); }}
                aria-label={`J'aime ${pair.right.name}`}
              >
                J’aime
              </button>
            </div>
          </div>
        </div>
      </div></div>

      {toast && <ResultToast text={toast} />}
    </div>
  );
}