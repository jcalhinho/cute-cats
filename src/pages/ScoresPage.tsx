import { useMemo } from 'react';
import { useScores } from '../context/ScoreContext';

export default function ScoresPage() {
  const { state, dispatch } = useScores();

  // Classement classique: tri par ratio (wins / played), puis wins, puis nom
  const rows = useMemo(() => {
    const arr = Object.values(state.scores).filter(Boolean);
    const withRatio = arr.map(s => ({
      ...s,
      r: s.played > 0 ? s.wins / s.played : 0,
    }));
    return withRatio.sort(
      (a, b) =>
        (b.r - a.r) ||
        ((b.wins ?? 0) - (a.wins ?? 0)) ||
        (a.name ?? '').localeCompare(b.name ?? '')
    );
  }, [state.scores]);

  const total = rows.length;
  const [first, second, third] = [rows[0], rows[1], rows[2]];
  const rest = rows.slice(3);

  const votesTotal = rows.reduce((n, r) => n + (r.wins ?? 0), 0);
  const playedSum  = rows.reduce((n, r) => n + (r.played ?? 0), 0);
  const matchesTotal = Math.floor(playedSum / 2);

  // Points = nb de "J'aime" (= wins), affichage 1:1
  const pts = (wins?: number) => String(wins ?? 0);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'grid', alignContent: 'start' }}>
      <div className="scoreHeader">
        <h1>CATMASH SCORE</h1>
        <button
          className="btn secondary"
          onClick={() => dispatch({ type: 'RESET' })}
          aria-label="Réinitialiser les scores"
        >
          Réinitialiser
        </button>
      </div>

      {/* PODIUM 2 - 1 - 3 (ordre desktop), réordonné en colonne via CSS grid-areas */}
      {(first || second || third) && (
        <div className="podiumGrid">
          {/* Second */}
          {second && (
            <div className="podiumCard podiumSecond" aria-label={`Rang ${2} : ${second.name}`}>
              <div className="podiumContent">
                <div className="podiumImgBox">
                  <span className="tag rank">{rows.indexOf(second) + 1}/{total}</span>
                  <span className="tag score">{pts(second.wins)}</span>
                 
                  <img src={second.url} alt={second.name} loading="eager" />
                </div>
              </div>
            </div>
          )}

          {/* First */}
          {first && (
            <div className="podiumCard podiumFirst" aria-label={`Rang ${1} : ${first.name}`}>
              <div className="podiumContent">
                <div className="podiumImgBox">
                  <span className="tag rank">{rows.indexOf(first) + 1}/{total}</span>
                  <span className="tag score">{pts(first.wins)}</span>
                  
                  <img src={first.url} alt={first.name} loading="eager" />
                </div>
              </div>
            </div>
          )}

          {/* Third */}
          {third && (
            <div className="podiumCard podiumThird" aria-label={`Rang ${3} : ${third.name}`}>
              <div className="podiumContent">
                <div className="podiumImgBox">
                  <span className="tag rank">{rows.indexOf(third) + 1}/{total}</span>
                  <span className="tag score">{pts(third.wins)}</span>
                 
                  <img src={third.url} alt={third.name} loading="eager" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESTE : 4 colonnes, images rectangulaires horizontales, tags absolus, pas de footer */}
      <div className="scoreGridRest">
        {rest.map((r) => (
          <div className="scoreItem" key={r.id} aria-label={`Rang ${rows.indexOf(r) + 1} : ${r.name}`}>
            <div className="imgBox">
              <span className="tag rank">{rows.indexOf(r) + 1}/{total}</span>
              <span className="tag score">{pts(r.wins)}</span>
              <img alt={r.name} src={r.url} loading="lazy" />
            </div>
          </div>
        ))}
      </div>

      <div className="scoreHeader" style={{ marginTop: 12 }}>
        <div style={{ color: 'var(--muted)' }}>
          Total matchs: <strong>{matchesTotal}</strong> • Total votes: <strong>{votesTotal}</strong>
        </div>
      </div>
    </div>
  );
}