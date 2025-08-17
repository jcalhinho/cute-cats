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



## ♿ Accessibilité

- Boutons réels `<button>` avec `aria-label`.
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
