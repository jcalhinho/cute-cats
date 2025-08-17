import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VotePage from './VotePage';
import ScoresPage from './ScoresPage';
import { useScores } from '../context/ScoreContext';

export default function Mash() {
  const voteRef = useRef<HTMLDivElement>(null);
  const scoresRef = useRef<HTMLDivElement>(null);
  const [atScores, setAtScores] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useScores();

const scrollTo = useCallback((el: HTMLElement | null, smooth = true) => {
  if (!el) return;
  const reduce = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = smooth && !reduce ? 'smooth' : 'auto';
  el.scrollIntoView({ behavior, block: 'start' });
}, []);

  // nombre réel de matchs = somme des "played" / 2
  const playedSum = Object.values(state.scores).reduce((n, s) => n + s.played, 0);
  const matchesTotal = Math.floor(playedSum / 2);

  // 👉 Une seule source de vérité pour le scroll: l'URL
  useEffect(() => {
    if (pathname === '/scores') {
      scrollTo(scoresRef.current, true); // smooth
      setAtScores(true);
    } else {
      scrollTo(voteRef.current, true);   // smooth
      setAtScores(false);
    }
  }, [pathname, scrollTo]);

  // Détecte la section visible pour l'état du bouton
  useEffect(() => {
    const voteEl = voteRef.current; const scoresEl = scoresRef.current; if (!voteEl || !scoresEl) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === scoresEl && e.isIntersecting) setAtScores(true);
        if (e.target === voteEl && e.isIntersecting) setAtScores(false);
      });
    }, { threshold: 0.6 });
    io.observe(voteEl); io.observe(scoresEl); return () => io.disconnect();
  }, []);

  const handleToggle = () => {
    // 👉 Ne pas scroller ici: on ne fait que changer l'URL
    if (atScores) { navigate('/'); }
    else { navigate('/scores'); }
  };

  return (
    <div>
      <section ref={voteRef} id="section-vote" style={{ minHeight: '100vh', paddingTop: 16, position: 'relative', zIndex: 1 }}>
        <VotePage />
      </section>

      <section ref={scoresRef} id="section-scores" style={{ minHeight: '100vh', paddingTop: 16, position: 'relative', zIndex: 1 }}>
        <ScoresPage />
      </section>

      <button
        type="button"
        className="drawerToggle card"
        aria-label={atScores ? 'Revenir au vote' : 'Voir le classement des chats'}
        onClick={handleToggle}
      >
        <div style={{ textAlign: 'center', fontWeight: 700 }}>
          {atScores ? 'Revenir au vote' : 'Voir le classement des chats'}
        </div>
        <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>
          {atScores ? '▴' : '▾'} {matchesTotal} matchs joués
        </div>
      </button>
    </div>
  );
}