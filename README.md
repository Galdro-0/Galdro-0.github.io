# Othmane Karim — Portfolio Cyber Red & Blue

Portfolio statique et responsive, prêt pour **GitHub Pages**. Aucun build, framework, backend ou clé API requis.

## Fichiers

```text
Galdro-0.github.io/
├── index.html      # Contenu et structure
├── style.css       # Design cyberpunk rouge / bleu + responsive
├── script.js       # Menu mobile, filtres, modales, terminal local, animations
├── assets/
│   └── favicon.svg # Icône du site
└── README.md
```

## Tester sur son ordinateur

Ouvrir `index.html` dans Chrome. Il fonctionne également sans serveur local.

Pour un serveur de développement :

```bash
python -m http.server 8000
```

Puis ouvrir http://localhost:8000

## Publier sur GitHub Pages

1. Sur `https://github.com/Galdro-0/Galdro-0.github.io`, sauvegarder l'ancien `index.html` ou utiliser un commit de sauvegarde.
2. Remplacer `index.html` et ajouter `style.css`, `script.js` ainsi que `assets/favicon.svg` à la **racine** du dépôt. Ne pas envoyer simplement le ZIP sans le décompresser.
3. Créer un commit, par exemple `Redesign portfolio — Red & Blue Hacker theme`.
4. Dans **Settings → Pages**, utiliser **Deploy from a branch** avec `main` et `/(root)` si ce n'est pas déjà configuré.
5. Ouvrir `https://galdro-0.github.io/` une fois le déploiement terminé.

Alternative Git CLI depuis un clone du dépôt :

```bash
git add index.html style.css script.js assets/favicon.svg README.md
git commit -m "Redesign portfolio - Red and Blue Hacker"
git push origin main
```

## Points à personnaliser **avant publication**

- **Adresse email** : l'ancien site public montre des adresses incohérentes. Cette version utilise provisoirement `karimotmane318@email.com`, présent comme texte visible sur l'ancien site. Remplacer cette adresse dans `index.html` (lien `mailto:` du contact) par une adresse confirmée.
- **LinkedIn** : lien repris de l'ancien site avec `https://` ajouté : `https://www.linkedin.com/in/othmane-karim/`. Vérifier qu'il mène au bon profil.
- **CV** : aucun fichier de CV n'était fourni. Pas de bouton de téléchargement factice. Pour ajouter un vrai bouton, déposer `cv.pdf` à la racine du dépôt et ajouter `<a href="cv.pdf" download>Télécharger mon CV</a>` (par exemple à côté de « Me contacter »).
- **Projets** : les fiches distinguent `prototype`, `lab` et `en conception`. Adapter les descriptions si le statut ou le périmètre a changé, et ajouter les liens directs vers les dépôts lorsque ceux-ci sont publics.
- **CTF / expériences** : valider les intitulés précis et les éventuels liens de preuve avant diffusion.

## Fonctionnalités

- Design rouge / bleu sombre et illustration SVG intégrée (pas d'image externe dépendante d'un service tiers).
- Navigation fixe, menu responsive mobile, surlignage de la section active.
- Filtres des six projets, panneaux de détails interactifs.
- Terminal décoratif **local**, accessible via bouton ou `Ctrl+K` (`Cmd+K` sur Mac). Commandes : `help`, `whoami`, `skills`, `projects`, `ctf`, `contact`, `github`, `clear`. Il n'exécute aucun code et ne communique avec aucun serveur.
- Animations de scroll, gestion de `prefers-reduced-motion` et focus visible.
- Liens sociaux externes ouverts avec `noopener noreferrer`.
- Balises SEO de base, favicon SVG, aucun build nécessaire.

## Couleurs

Variables modifiables en début de `style.css` : `--red`, `--blue`, `--bg`, `--panel`, etc.

## Remarques

- Les panneaux des écrans illustrés sont **purement décoratifs** et ne montrent pas de menaces ni de métriques réelles.
- La police est chargée via Google Fonts si internet est disponible ; des polices de repli assurent un affichage sans connexion.
- Le déploiement GitHub n'est **pas** effectué par ce ZIP : il faut copier et committer les fichiers dans le dépôt.
