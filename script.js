/* Othmane Karim — Portfolio Red & Blue. Vanilla JS, sans framework. */
(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const header = $('#site-header');
  const navToggle = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    mobileNav.hidden = !open;
    navToggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  };
  navToggle.addEventListener('click', () => setMenu(mobileNav.hidden));
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 990 && !mobileNav.hidden) setMenu(false);
  }, { passive: true });
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  $('#copyrightYear').textContent = String(new Date().getFullYear());

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    $$('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // Active navigation link follows the section currently in view.
  if ('IntersectionObserver' in window) {
    const sections = $$('main section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const href = '#' + visible[0].target.id;
      $$('.desktop-nav .nav-link').forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === href));
    }, { rootMargin: '-20% 0px -58% 0px', threshold: [0, 0.1, 0.5] });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Project filters, including assistive-technology state.
  const filterButtons = $$('.filter-btn');
  const cards = $$('.project-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(btn => {
      const active = btn === button;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(' ');
      card.hidden = filter !== 'all' && !categories.includes(filter);
      if (!card.hidden) card.classList.add('is-visible');
    });
  }));

  const projectDetails = {
    soc: {
      title: 'SOC Agentique', status: 'PFA / PROTOTYPE',
      description: 'Projet de SOC assisté par agents IA : détection via un SIEM, enrichissement des alertes avec des sources de renseignement, recherche de contexte par RAG et recommandations d’investigation. Les composants envisagés ou expérimentés comprennent Wazuh, Python, Chroma/FAISS et un LLM local. La validation et le niveau d’automatisation dépendent du scénario de laboratoire.',
      tags: ['SOC', 'Wazuh', 'Python', 'LLM', 'RAG', 'Threat Intelligence']
    },
    malware: {
      title: 'AI Malware Analysis Assistant', status: 'EN CONCEPTION',
      description: 'Projet choisi pour explorer l’analyse assistée de logiciels malveillants à l’aide de l’IA : extraction d’indicateurs de compromission (IOC), synthèse de caractéristiques statiques et génération de comptes rendus pour un analyste. Cette fiche présente une direction de recherche, et non un outil déjà finalisé.',
      tags: ['Malware Analysis', 'DFIR', 'AI', 'Python', 'IOC']
    },
    wazuh: {
      title: 'Threat Hunting avec Wazuh', status: 'LAB PRATIQUE',
      description: 'Environnement de laboratoire Wazuh pour centraliser les événements, tester des scénarios d’attaque autorisés, explorer les alertes et mener des investigations de sécurité. Travaux autour des journaux SSH, de la détection et de l’analyse de traces.',
      tags: ['Wazuh', 'SIEM', 'Threat Hunting', 'Linux', 'Detection']
    },
    ocr: {
      title: 'OCR — Reconnaissance de plaques', status: 'STAGE SOTREG / 2025',
      description: 'Application réalisée lors d’un stage pour automatiser le traitement des plaques d’immatriculation. Pipeline de vision par ordinateur et OCR, interface de traitement développée avec Flask et stockage structuré via SQLite. Le projet vise à réduire les tâches manuelles de saisie.',
      tags: ['Computer Vision', 'Python', 'OpenCV', 'OCR', 'Flask', 'SQLite']
    },
    infra: {
      title: 'Security Operations & Infrastructure', status: 'STAGE HACKFURY / 2026',
      description: 'Activités techniques réalisées en stage à distance : recherche en threat hunting, schémas d’architectures d’infrastructure, observabilité, expériences Docker et essais de performance d’une application. Certaines informations de l’entreprise restent volontairement non publiées.',
      tags: ['Threat Hunting', 'Docker', 'Loki', 'Architecture', 'Observability']
    },
    drone: {
      title: 'Détection d’anomalies GPS', status: 'EXPLORATION ML / 2025',
      description: 'Exploration d’approches de détection d’anomalies dans des données de positionnement GPS de drone, notamment avec Isolation Forest et des autoencodeurs. Objectif : étudier la pertinence de modèles non supervisés pour repérer des événements inhabituels.',
      tags: ['Machine Learning', 'Isolation Forest', 'Autoencoder', 'Python', 'GPS']
    }
  };
  const projectDialog = $('#projectDialog');
  const projectClose = $('#projectClose');
  $$('.project-more').forEach(button => button.addEventListener('click', () => {
    const details = projectDetails[button.dataset.project];
    if (!details) return;
    $('#dialogProjectStatus').textContent = details.status;
    $('#dialogProjectTitle').textContent = details.title;
    $('#dialogProjectDescription').textContent = details.description;
    const tags = $('#dialogProjectTags');
    tags.replaceChildren();
    details.tags.forEach(tag => {
      const item = document.createElement('span');
      item.textContent = tag;
      tags.appendChild(item);
    });
    projectDialog.showModal();
    projectClose.focus();
  }));
  projectClose.addEventListener('click', () => projectDialog.close());

  // Local, purely decorative interactive terminal: does not execute shell commands.
  const terminal = $('#commandDialog');
  const output = $('#terminalOutput');
  const terminalInput = $('#terminalInput');
  const openTerminal = () => {
    if (!terminal.open) terminal.showModal();
    terminalInput.focus();
  };
  $('#commandTrigger').addEventListener('click', openTerminal);
  $('#commandClose').addEventListener('click', () => terminal.close());
  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openTerminal();
    }
  });
  // Click on the backdrop, outside the dialog content, to close.
  [terminal, projectDialog].forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  }));
  const addOutput = (text, className = '') => {
    const line = document.createElement('p');
    line.textContent = text;
    if (className) line.className = className;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  };
  const commands = {
    help: () => 'Commandes : help | whoami | skills | projects | ctf | contact | github | clear',
    whoami: () => 'Othmane Karim — Élève ingénieur, Cybersecurity × AI, ENSA Béni Mellal.',
    skills: () => 'SOC • Threat Hunting • Wazuh • Web Pentest • DFIR • Python • ML • LLM/RAG',
    projects: () => 'SOC Agentique | AI Malware Analysis (conception) | Wazuh Lab | OCR | Infrastructure | Anomalies GPS',
    ctf: () => 'CSIA CTF 2026 : 1er individuel / 2e équipe. Black Hat MEA 2026 : qualification. AUSIM Cyberdrill : finaliste.',
    contact: () => 'LinkedIn: https://www.linkedin.com/in/othmane-karim/ | GitHub: https://github.com/Galdro-0',
    github: () => 'https://github.com/Galdro-0',
    clear: () => { output.replaceChildren(); return null; }
  };
  $('#terminalForm').addEventListener('submit', event => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';
    if (!command) return;
    addOutput('visitor@portfolio:~$ ' + command, 'term-green');
    if (Object.prototype.hasOwnProperty.call(commands, command)) {
      const result = commands[command]();
      if (result) addOutput(result);
    } else addOutput('Commande inconnue : ' + command + '. Essayez « help ».');
  });
})();
