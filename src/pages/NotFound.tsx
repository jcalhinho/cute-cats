import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container center" style={{ height: '70vh', textAlign: 'center' }}>
      <div className="card" style={{ padding: 24 }}>
        <h1>404</h1>
        <p style={{ color: 'var(--muted)' }}>Oups, cette page n’existe pas.</p>
        <Link className="btn" to="/">Retour au vote</Link>
      </div>
    </div>
  );
}