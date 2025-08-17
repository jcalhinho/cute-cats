import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container spread" role="navigation" aria-label="Navigation principale">
        <strong>😺 CuteCats</strong>
        <nav className="nav">
          <NavLink className={({isActive}) => `link ${isActive ? 'active' : ''}`} to="/">Voter</NavLink>
          <NavLink className={({isActive}) => `link ${isActive ? 'active' : ''}`} to="/scores">Scores</NavLink>
          <a className="link" href="https://data.latelier.co/cats.json" target="_blank" rel="noreferrer">Dataset</a>
        </nav>
      </div>
    </header>
  );
}