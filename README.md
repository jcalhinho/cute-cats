# 🐱 Catmash — Le chat le plus mignon

Mini-application **React + TypeScript + Vite** inspirée de Facemash.

- **Page de vote** : deux chats aléatoires, clic = 1 point au gagnant.
- **Page des scores** : podium (Top 3) et classement général responsive.

Déployée sur **Vercel**. Respect des principes **SOLID**, accessibilité et UX moderne.

---

## 🚀 Stack

- React 19 + TypeScript 5
- Vite (build rapide)
- Context API + Hooks (état des scores)
- CSS natif (global.css + modules)
- Déploiement Vercel

---

## 📁 Structure

```
src/
  api/        # fetch des données (adapter)
  components/ # cartes, boutons, UI
  context/    # état global des scores
  hooks/      # logique de tirage paires
  pages/      # Vote et Scores
  styles/     # CSS global
  types.ts    # typings Cat, Score
```

---

## 🧠 SOLID appliqué

- **S** — Single Responsibility : chaque fichier a une seule responsabilité (ex: ScoreContext uniquement pour les scores).
- **O** — Open/Closed : facile à étendre (ex: tri du classement), sans modifier l’existant.
- **L** — Liskov Substitution : composants interchangeables via props claires.
- **I** — Interface Segregation : API minimale (ex: `onVote(catId)`).
- **D** — Dependency Inversion : les pages dépendent d’adapters (fetchCats), pas d’un backend concret.

---

## ♿ Accessibilité

- Boutons réels `<button>` avec `aria-label`.
- Focus visible clavier.
- Respect de `prefers-reduced-motion`.
- Images `alt` et `loading` optimisés.

---

## 🔧 Lancer localement

```bash
npm install
npm run dev
```

Build pour production :

```bash
npm run build
npm run preview
```

---

## ☁️ Déploiement Vercel

1. Push du repo GitHub
2. Import sur Vercel
3. Framework : Vite
4. Output : `dist/`
