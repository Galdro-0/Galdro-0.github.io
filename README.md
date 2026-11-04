# 01x — Cybersecurity × AI

Portfolio personnel en HTML, CSS et JavaScript, publié sur https://galdro-0.github.io/.

## Identité et animation

L’accueil affiche d’abord **Othmane Karim**, puis efface ce nom pour révéler **01x**.
Le nom reste visible 2,5 secondes avant la transition, après le chargement des polices.
Les onglets en arrière-plan ne consomment pas ce délai.
Avec la réduction des animations activée, le même délai est conservé, puis le nom change sans effet d’effacement.
Sans JavaScript, **01x** apparaît directement.
Les titres, métadonnées, marques, textes accessibles et terminal utilisent **01x**.
Les adresses GitHub, LinkedIn et email existantes sont conservées.

## Interactions

- Navigation responsive et animations au défilement.
- Filtres de projets et fiches détaillées.
- Terminal interactif local : `Ctrl K`, puis `help`, `whoami`, `skills`, `projects`, `ctf`, `contact`, `github` ou `clear`.

## Aperçu local

```sh
python -m http.server 8000
```

Ouvrir http://localhost:8000 depuis le dossier du projet. Aucune compilation nécessaire.
GitHub Pages publie la racine de la branche `main`.
