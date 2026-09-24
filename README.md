# Todo List

Application React/Vite de gestion de taches avec une API Node/Express et une base SQLite persistante.

## Prerequis

- Node.js 18 ou plus recent
- npm

## Installation

```bash
npm install
```

## Lancer le projet

Dans un premier terminal, lancer l'API :

```bash
npm run server:dev
```

Dans un second terminal, lancer le frontend :

```bash
npm run dev
```

Le frontend est disponible sur `http://localhost:5173` et l'API sur `http://localhost:3000`.

La base est creee automatiquement dans `server/data/todo.db`. Les categories `Personnel`, `Travail` et `Important` sont ajoutees au premier demarrage.

## API

| Methode | Route | Description |
| --- | --- | --- |
| `GET` | `/health` | Verifie que l'API fonctionne |
| `GET` | `/todos` | Retourne toutes les taches |
| `POST` | `/todos` | Cree une tache avec `title` ou `nom_tache` et une categorie optionnelle |
| `PUT/PATCH` | `/todos/:id` | Modifie le titre, l'etat ou la categorie |
| `DELETE` | `/todos/:id` | Supprime une tache |
| `DELETE` | `/todos` | Supprime toutes les taches |
| `GET` | `/categories` | Retourne les categories disponibles |

L'API accepte les champs historiques utilises par le frontend (`nom_tache`, `_check`, `idCategory`) et expose aussi les champs plus explicites (`title`, `completed`, `categoryId`).

## Verification

```bash
npm run build
npm run lint
```

Pour utiliser une autre base SQLite :

```bash
DB_FILE=/chemin/vers/todo.db npm run server
```
