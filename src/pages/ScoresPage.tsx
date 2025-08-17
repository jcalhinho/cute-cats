import React, { useMemo } from 'react';
import { useScores } from '../context/ScoreContext';
import { percent, ratio } from '../utils/format';
import { Link } from 'react-router-dom';

export default function ScoresPage() {
  const { state, dispatch } = useScores();

  const rows = useMemo(() => {
    const arr = Object.values(state.scores);
    return arr
      .map(s => ({ ...s, r: ratio(s.wins, s.played) }))
      .sort((a, b) => b.r - a.r);
  }, [state.scores]);

  const playedTotal = rows.reduce((n, r) => n + r.played, 0);
  const votesTotal = rows.reduce((n, r) => n + r.wins, 0);

  return (
    <div className="container">
      <div className="spread" style={{margin: '16px 0'}}>
        <h1>Scores</h1>
        <button className="btn secondary" onClick={() => dispatch({ type: 'RESET' })} aria-label="Réinitialiser les scores">
          Réinitialiser
        </button>
      </div>

      <div className="card" style={{overflow: 'auto'}}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{textAlign: 'left'}}>
              <th style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>#</th>
              <th style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>Nom</th>
              <th style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>Gagnés</th>
              <th style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>Joués</th>
              <th style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id}>
                <td style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>{i+1}</td>
                <td style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>{r.name}</td>
                <td style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>{r.wins}</td>
                <td style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>{r.played}</td>
                <td style={{padding: '10px 12px', borderBottom: '1px solid var(--border)'}}>{percent(r.r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="spread" style={{marginTop: 12}}>
        <div style={{color: 'var(--muted)'}}>
          Total matchs: <strong>{playedTotal}</strong> • Total votes: <strong>{votesTotal}</strong>
        </div>
        <Link to="/" className="btn" aria-label="Rejouer">Rejouer</Link>
      </div>
    </div>
  );
}