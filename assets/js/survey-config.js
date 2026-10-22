/* =====================================================================
   CONFIGURATION DE L'ENQUÊTE « MODÈLES DE GESTION AMP / LMMA »
   Fichier GÉNÉRÉ par tools/xlsx_to_config.py à partir du fichier Excel.
   Pour un changement ponctuel (date limite, contact, URL Apps Script),
   modifier directement META ci-dessous. Pour modifier les questions,
   modifier le fichier Excel ou tools/xlsx_to_config.py, puis relancer
   le script (sinon vos modifications manuelles seront écrasées).

   Les identifiants (id) deviennent les noms de colonnes dans Google
   Sheets et les noms de variables dans R : ne pas les modifier une fois
   la collecte lancée.

   Types : text, textarea, number, year, radio, checkbox,
           anchored (échelle 1–5 ancrée + « Ne sais pas »),
           matrix (grille : une réponse par ligne)
   Options : other, max, min, unit, help, detail {label, when},
             rowsFrom (lignes limitées aux choix d'une autre question),
             showIf { q, eq | ne | in | starts | any | notOnly }
   ===================================================================== */

const SURVEY = {
  META: {
  "version": "1.0",
  "title": "Diagnostic des modèles de gestion des AMP et LMMA à Madagascar",
  "subtitle": "Enquête auprès des gestionnaires, partenaires et institutions, en vue d'un modèle national de gestion harmonisé",
  "organizer": "Fondation pour les Aires Protégées et la Biodiversité de Madagascar (FAPBM), en collaboration avec l’Institut Halieutique et des Sciences Marines (IH.SM) – Université de Toliara",
  "contactName": "Jean-Aimé Zafimahatradraibe",
  "contactEmail": "jeanaime0494@gmail.com ",
  "deadline": "15 Novembre",
  "estimatedTime": "Parcours A : 45 à 60 min · Parcours B : 15 à 20 min",
  "estimatedTimeShort": "15 à 60 min",
  "appsScriptUrl": "https://script.google.com/macros/s/AKfycbwfA19obdClpaAp5oKM2PY29yFBTOTuJg6I-JVrEPomKsqJsNnovh94t7cae2Dl-DbTvA/exec",
  "logos": [
    {
      "src": "assets/img/logos/ihsm.png",
      "alt": "IH.SM — Université de Toliara",
      "url": "https://ihsm.mg/"
    },
    {
      "src": "assets/img/logos/fapbm.png",
      "alt": "FAPBM",
      "url": "https://www.fapbm.org/en/home/"
    }
  ],
  "intro": [
    "Cette enquête vise à dresser un diagnostic des modèles de gestion des aires marines protégées (AMP), des aires marines gérées localement (LMMA) et des AMCE/OECM à Madagascar : gouvernance, planification, participation des communautés, financement, moyens, contrôle, suivi-évaluation et résultats.",
    "Elle s'adresse aux gestionnaires et cogestionnaires de sites, aux ONG et associations d'appui, aux structures communautaires, aux administrations, aux réseaux, aux opérateurs privés, aux institutions de recherche et aux partenaires techniques et financiers.",
    "Deux parcours sont proposés. Parcours A : vous répondez pour un site précis que votre organisation gère, cogère ou appuie directement — un questionnaire par site (à la fin, vous pourrez enchaîner sur un autre site sans ressaisir votre identification). Parcours B : vous répondez en tant qu'acteur institutionnel ou transversal, sans gestion directe d'un site.",
    "Vos réponses sont enregistrées automatiquement sur cet appareil : vous pouvez interrompre la saisie et la reprendre plus tard depuis le même navigateur."
  ],
  "privacy": "Les informations recueillies servent uniquement à ce diagnostic. Les résultats seront présentés de manière agrégée et anonymisée : aucun site ni aucune organisation ne sera cité nommément sans accord.",
  "consentQ": "q001",
  "siteNameQ": "q008",
  "routeQ": "q007",
  "keepOnNewSite": [
    "q002",
    "q003",
    "q004",
    "q004_autre",
    "q005",
    "q006",
    "q007"
  ],
  "heroPhoto": "peche-diego",
  "introPhotos": [
    "pirogue-vezo",
    "mangrove-belo",
    "recif-acropora"
  ],
  "thanksPhoto": "vezo-peche",
  "photoCreditNote": "Photographies : Wikimedia Commons (auteurs et licences indiqués sous chaque photo).",
  "consent": {
    "id": "q001",
    "label": "Acceptez-vous de participer à cette enquête et que vos réponses soient utilisées de façon anonymisée pour le diagnostic ?",
    "options": [
      "Oui, j'accepte",
      "Non, je ne souhaite pas participer"
    ]
  }
},

  PHOTOS: [
  {
    "key": "peche-diego",
    "src": "assets/img/photos/peche-diego.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/La_p%C3%AAche_dans_la_baie_de_Diego-Suarez.jpg/1280px-La_p%C3%AAche_dans_la_baie_de_Diego-Suarez.jpg",
    "caption": "Pêcheurs dans la baie des Français, Antsiranana",
    "credit": "JF Design",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:La_p%C3%AAche_dans_la_baie_de_Diego-Suarez.jpg"
  },
  {
    "key": "pirogue-vezo",
    "src": "assets/img/photos/pirogue-vezo.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Pirogue_%C3%A0_balancier.JPG/1280px-Pirogue_%C3%A0_balancier.JPG",
    "caption": "Pirogue à balancier vezo",
    "credit": "Boosha Afrikaf",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Pirogue_%C3%A0_balancier.JPG"
  },
  {
    "key": "mangrove-belo",
    "src": "assets/img/photos/mangrove-belo.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mangroves_%2C_Belo_sur_mer%2C_Madagascar.jpg/1280px-Mangroves_%2C_Belo_sur_mer%2C_Madagascar.jpg",
    "caption": "Mangroves, Belo-sur-Mer",
    "credit": "Cactus0625",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Mangroves_,_Belo_sur_mer,_Madagascar.jpg"
  },
  {
    "key": "vezo-peche",
    "src": "assets/img/photos/vezo-peche.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Vezo_%C3%A0_la_p%C3%AAche.JPG/1280px-Vezo_%C3%A0_la_p%C3%AAche.JPG",
    "caption": "Pêcheurs vezo sur une pirogue à balancier",
    "credit": "Boosha Afrikaf",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Vezo_%C3%A0_la_p%C3%AAche.JPG"
  },
  {
    "key": "village-mahavavy",
    "src": "assets/img/photos/village-mahavavy.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Village_des_p%C3%AAcheurs_le_long_du_fleuve_de_Mahavavy.jpg/1280px-Village_des_p%C3%AAcheurs_le_long_du_fleuve_de_Mahavavy.jpg",
    "caption": "Village de pêcheurs, aire protégée Mahavavy-Kinkony",
    "credit": "Anai171",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Village_des_p%C3%AAcheurs_le_long_du_fleuve_de_Mahavavy.jpg"
  },
  {
    "key": "pecheurs-antsiranana",
    "src": "assets/img/photos/pecheurs-antsiranana.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Two_fisherman_VavaLapasy_Antsiranana_Madagascar.jpg/1280px-Two_fisherman_VavaLapasy_Antsiranana_Madagascar.jpg",
    "caption": "Pêcheurs, Antsiranana",
    "credit": "TinsRad",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Two_fisherman_VavaLapasy_Antsiranana_Madagascar.jpg"
  },
  {
    "key": "port-tulear",
    "src": "assets/img/photos/port-tulear.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Boutres_et_pirogue_Vezo%2C_port_de_Tul%C3%A9ar%2C_Madagascar_%2826057141635%29.jpg/1280px-Boutres_et_pirogue_Vezo%2C_port_de_Tul%C3%A9ar%2C_Madagascar_%2826057141635%29.jpg",
    "caption": "Boutres et pirogue vezo, port de Toliara",
    "credit": "krishna naudin",
    "license": "CC BY-SA 2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Boutres_et_pirogue_Vezo,_port_de_Tul%C3%A9ar,_Madagascar_(26057141635).jpg"
  },
  {
    "key": "mangrove-belo-2",
    "src": "assets/img/photos/mangrove-belo-2.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Madagascar_mangroves.JPG/1280px-Madagascar_mangroves.JPG",
    "caption": "Mangroves de Belo-sur-Mer",
    "credit": "Terpsichores",
    "license": "CC BY-SA 3.0",
    "page": "https://commons.wikimedia.org/wiki/File:Madagascar_mangroves.JPG"
  },
  {
    "key": "recif-acropora",
    "src": "assets/img/photos/recif-acropora.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Coral_%28Acropora_clathrata%29%2C_Nosy_Iranja%2C_Madagascar%2C_2025-09-17%2C_DD_53.jpg/1280px-Coral_%28Acropora_clathrata%29%2C_Nosy_Iranja%2C_Madagascar%2C_2025-09-17%2C_DD_53.jpg",
    "caption": "Acropora clathrata, Nosy Iranja",
    "credit": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Coral_(Acropora_clathrata),_Nosy_Iranja,_Madagascar,_2025-09-17,_DD_53.jpg"
  },
  {
    "key": "recif-empereurs",
    "src": "assets/img/photos/recif-empereurs.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Grupo_de_peces_emperador_estriados_%28Gnathodentex_aureolineatus%29%2C_Nosy_Kalakajoro%2C_Madagascar%2C_2025-09-14%2C_DD_03.jpg/1280px-Grupo_de_peces_emperador_estriados_%28Gnathodentex_aureolineatus%29%2C_Nosy_Kalakajoro%2C_Madagascar%2C_2025-09-14%2C_DD_03.jpg",
    "caption": "Empereurs (Gnathodentex aureolineatus), Nosy Kalakajoro",
    "credit": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Grupo_de_peces_emperador_estriados_(Gnathodentex_aureolineatus),_Nosy_Kalakajoro,_Madagascar,_2025-09-14,_DD_03.jpg"
  },
  {
    "key": "recif-clowns",
    "src": "assets/img/photos/recif-clowns.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Peces_payaso_de_Madagascar_%28Amphiprion_latifasciatus%29_en_una_an%C3%A9mona_perla_de_cristal_%28Heteractis_aurora%29%2C_Ambalihabe%2C_Madagascar%2C_2025-09-16%2C_DD_117.jpg/1280px-Peces_payaso_de_Madagascar_%28Amphiprion_latifasciatus%29_en_una_an%C3%A9mona_perla_de_cristal_%28Heteractis_aurora%29%2C_Ambalihabe%2C_Madagascar%2C_2025-09-16%2C_DD_117.jpg",
    "caption": "Poissons-clowns de Madagascar, Ambalihabe",
    "credit": "Diego Delso",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Peces_payaso_de_Madagascar_(Amphiprion_latifasciatus)_en_una_an%C3%A9mona_perla_de_cristal_(Heteractis_aurora),_Ambalihabe,_Madagascar,_2025-09-16,_DD_117.jpg"
  }
],

  STEPS: [
  {
    "key": "ID",
    "title": "Identification du répondant",
    "short": "Identification",
    "questions": [
      {
        "id": "q002",
        "n": "2",
        "label": "Mode de remplissage",
        "type": "radio",
        "required": true,
        "path": "Tous",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "help": "Réservé à l'équipe si le questionnaire est administré par téléphone.",
        "options": [
          "En ligne, par le répondant",
          "Par téléphone, avec un enquêteur"
        ],
        "enumeratorOnly": true
      },
      {
        "id": "q003",
        "n": "3",
        "label": "Nom de votre organisation / institution",
        "type": "text",
        "required": true,
        "path": "Tous",
        "dim": "ID",
        "sub": null,
        "crit": null
      },
      {
        "id": "q004",
        "n": "4",
        "label": "Type d'organisation",
        "type": "radio",
        "required": true,
        "path": "Tous",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "options": [
          "Administration centrale (ministère)",
          "Administration régionale (DREDD, DRPEB…)",
          "Madagascar National Parks (MNP)",
          "ONG internationale",
          "ONG ou association nationale",
          "Plateforme ou réseau (ex. MIHARI)",
          "Structure communautaire (VOI, association, fédération)",
          "Opérateur privé",
          "Institution de recherche / université",
          "Bailleur / fondation / partenaire technique et financier",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q005",
        "n": "5",
        "label": "Votre fonction",
        "type": "text",
        "required": true,
        "path": "Tous",
        "dim": "ID",
        "sub": null,
        "crit": null
      },
      {
        "id": "q006",
        "n": "6",
        "label": "E-mail ou téléphone (facultatif, pour une éventuelle clarification)",
        "type": "text",
        "required": false,
        "path": "Tous",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "autocomplete": "email"
      },
      {
        "id": "q007",
        "n": "7",
        "label": "Comment répondez-vous à ce questionnaire ?",
        "type": "radio",
        "required": true,
        "path": "Tous",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "options": [
          "A — Pour un site précis que mon organisation gère, cogère ou appuie directement",
          "B — En tant qu'acteur institutionnel ou transversal, sans gestion directe d'un site"
        ]
      }
    ]
  },
  {
    "key": "A1",
    "title": "Identification du site",
    "short": "Identification du site",
    "questions": [
      {
        "id": "q008",
        "n": "8",
        "label": "Nom du site (AMP / LMMA)",
        "type": "text",
        "required": true,
        "path": "A",
        "dim": "ID",
        "sub": null,
        "crit": null
      },
      {
        "id": "q009",
        "n": "9",
        "label": "Région",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "options": [
          "Diana",
          "Sava",
          "Analanjirofo",
          "Atsinanana",
          "Vatovavy",
          "Fitovinany",
          "Atsimo-Atsinanana",
          "Anosy",
          "Androy",
          "Atsimo-Andrefana",
          "Menabe",
          "Melaky",
          "Boeny",
          "Sofia",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q010",
        "n": "10",
        "label": "Catégorie du site",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "help": "Si plusieurs statuts s'appliquent, choisissez le principal.",
        "options": [
          "AMP — statut définitif (décret de création)",
          "AMP — en création (protection temporaire)",
          "LMMA Dina",
          "LMMA TGRH",
          "LMMA TGRN",
          "AMCE / OECM — reconnue ou déclarée",
          "AMCE / OECM — en cours d'identification",
          "Ne sais pas / Non applicable",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q011",
        "n": "11",
        "label": "Modèle de gouvernance du site",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "help": "Selon le Code de gestion des aires protégées (Loi n° 2015-005). Choisissez le modèle qui correspond le mieux à la réalité de la prise de décision sur le site.",
        "options": [
          "Étatique — gouvernance par l'État (gestion directe, ex. MNP)",
          "Cogestion — gouvernance partagée (État/ONG et communautés, gestion collaborative ou conjointe)",
          "Communautaire — gouvernance par les communautés locales (association/VOI, Dina, transfert de gestion)",
          "Privé — gouvernance par un opérateur privé (délégation, concession)",
          "Je ne sais pas"
        ]
      },
      {
        "id": "q012",
        "n": "12",
        "label": "Rôle de votre organisation sur ce site",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "options": [
          "Gestionnaire principal ou délégataire de gestion",
          "Cogestionnaire",
          "Appui technique et/ou financier",
          "Autorité de tutelle / administration",
          "Structure communautaire de base (VOI, association)",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q013",
        "n": "13",
        "label": "Année de mise en place",
        "type": "year",
        "required": false,
        "path": "A",
        "dim": "ID",
        "sub": null,
        "crit": null,
        "help": "Ex. 2006"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A2",
    "title": "Sites AMCE / OECM",
    "short": "AMCE / OECM",
    "questions": [
      {
        "id": "q013a",
        "n": "13a",
        "label": "État de la démarche AMCE",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "AMCE",
        "sub": null,
        "crit": null,
        "options": [
          "Reconnue officiellement",
          "Dossier soumis",
          "En cours d'évaluation",
          "Identifiée comme potentielle",
          "Ne sais pas"
        ]
      },
      {
        "id": "q013b",
        "n": "13b",
        "label": "Objectif principal de la gestion du site",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "AMCE",
        "sub": null,
        "crit": null,
        "options": [
          "Pêche durable",
          "Gestion communautaire des ressources",
          "Site sacré ou culturel",
          "Tourisme",
          "Restauration",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q013c",
        "n": "13c",
        "label": "Avantages attendus de la reconnaissance AMCE",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "AMCE",
        "sub": null,
        "crit": null,
        "options": [
          "Reconnaissance des droits locaux",
          "Accès au financement",
          "Visibilité",
          "Contribution à l'objectif national 30 × 30",
          "Protection contre les usages extérieurs",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q013d",
        "n": "13d",
        "label": "Principales difficultés pour la reconnaissance AMCE",
        "type": "textarea",
        "required": false,
        "path": "A",
        "dim": "AMCE",
        "sub": null,
        "crit": null
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q010",
      "starts": "AMCE"
    },
    "site": true
  },
  {
    "key": "A3",
    "title": "Gouvernance et prise de décision",
    "short": "Gouvernance",
    "questions": [
      {
        "id": "q014",
        "n": "14",
        "label": "Sur quelle(s) base(s) juridique(s) repose la gestion du site ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D1",
        "sub": "1.1",
        "crit": null,
        "options": [
          "Décret de création d'AMP (statut définitif)",
          "Arrêté de protection temporaire",
          "Contrat de transfert de gestion (TGRN / GELOSE / TGRH)",
          "Dina homologué par le tribunal",
          "Dina non homologué",
          "Convention de cogestion ou de délégation de gestion",
          "Concession / bail / contrat avec un opérateur privé",
          "Aucune base juridique formelle",
          "Ne sais pas / Non applicable",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q015",
        "n": "15",
        "label": "Degré de formalisation juridique du dispositif",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D1",
        "sub": "1.1",
        "crit": "C3",
        "levels": [
          "Aucun statut ni texte reconnu",
          "Démarches de reconnaissance en cours",
          "Statut provisoire ou incomplet (protection temporaire, TG à renouveler, Dina non homologué)",
          "Statut définitif mais textes de gestion incomplets ou expirés",
          "Statut définitif et textes de gestion à jour / homologués"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q016",
        "n": "16",
        "label": "Quelle est l'instance principale de décision ?",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "D1",
        "sub": "1.2",
        "crit": null,
        "options": [
          "Comité de gestion multi-acteurs",
          "Conseil d'administration / d'orientation",
          "Assemblée générale de l'association (VOI)",
          "Direction de l'organisme gestionnaire",
          "ONG délégataire / d'appui",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q017",
        "n": "17",
        "label": "Fonctionnement de cette instance au cours des 12 derniers mois",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D1",
        "sub": "1.2",
        "crit": null,
        "levels": [
          "Pas d'instance, ou instance qui ne se réunit pas",
          "Une réunion au plus, sans compte rendu",
          "Réunions irrégulières, peu de traces écrites",
          "Réunions régulières avec procès-verbaux",
          "Réunions régulières, PV diffusés et décisions suivies"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q018",
        "n": "18",
        "label": "Rôle effectif de chaque acteur dans les décisions de gestion du site",
        "type": "matrix",
        "required": true,
        "path": "A",
        "dim": "D1",
        "sub": "1.3",
        "crit": null,
        "help": "Une réponse par ligne.",
        "cols": [
          "Décide",
          "Est consulté",
          "Est seulement informé",
          "N'intervient pas",
          "NSP"
        ],
        "rows": [
          {
            "key": "medd",
            "label": "Environnement (MEDD / DREDD)"
          },
          {
            "key": "mpeb",
            "label": "Pêche (MPEB / DRPEB)"
          },
          {
            "key": "ctd",
            "label": "Collectivités territoriales (commune, région)"
          },
          {
            "key": "trad",
            "label": "Autorités traditionnelles (Olobe, Ray aman-dreny)"
          },
          {
            "key": "communautes",
            "label": "Communautés / VOI / associations locales"
          },
          {
            "key": "ong",
            "label": "ONG d'appui"
          },
          {
            "key": "prives",
            "label": "Opérateurs privés (tourisme, collecte, aquaculture)"
          },
          {
            "key": "recherche",
            "label": "Institutions de recherche"
          }
        ]
      },
      {
        "id": "q019",
        "n": "19",
        "label": "Redevabilité : le gestionnaire rend-il compte (activités, budget, résultats) aux communautés, aux usagers et aux parties prenantes ?",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D1",
        "sub": "1.3",
        "crit": "C4",
        "levels": [
          "Jamais",
          "Rarement, de façon informelle",
          "Une fois par an, avec restitution des comptes et des résultats",
          "Plusieurs fois par an, en réunion publique",
          "Systématiquement, avec documents écrits accessibles à tous"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A4",
    "title": "Planification",
    "short": "Planification",
    "questions": [
      {
        "id": "q020",
        "n": "20",
        "label": "Plan de gestion du site",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D2",
        "sub": "2.1",
        "crit": null,
        "levels": [
          "Aucun plan de gestion",
          "Plan en cours d'élaboration",
          "Plan existant mais non validé ou expiré",
          "Plan validé et en cours de validité",
          "Plan validé, en cours de validité et décliné en plans de travail annuels (PTA)"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q021",
        "n": "21",
        "label": "Année de la dernière version validée du plan de gestion",
        "type": "year",
        "required": false,
        "path": "A",
        "dim": "D2",
        "sub": "2.1",
        "crit": null,
        "showIf": {
          "q": "q020",
          "in": [
            3,
            4,
            5
          ]
        }
      },
      {
        "id": "q022",
        "n": "22",
        "label": "Quelles mesures de gestion sont appliquées sur le site ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D2",
        "sub": "2.2",
        "crit": null,
        "options": [
          "Réserve permanente (no-take)",
          "Fermetures temporaires (ex. poulpe)",
          "Interdiction ou restriction d'engins",
          "Tailles minimales de capture",
          "Saisons de fermeture / quotas",
          "Restauration (mangrove, récif, herbier)",
          "Réglementation des activités touristiques",
          "Aucune",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q023",
        "n": "23",
        "label": "Zonage et règles d'usage",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D2",
        "sub": "2.2",
        "crit": null,
        "levels": [
          "Ni zonage ni règles écrites",
          "Règles écrites mais pas de zonage",
          "Zonage sur carte ; matérialisation et diffusion partielles",
          "Zonage délimité et matérialisé (bouées, panneaux… installés)",
          "Zonage délimité, matérialisé et bien connu des usagers"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q024",
        "n": "24",
        "label": "Planification opérationnelle",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D2",
        "sub": "2.3",
        "crit": "C2",
        "levels": [
          "Aucun plan de travail annuel (PTA)",
          "PTA occasionnel",
          "PTA annuel mais peu suivi et mise en œuvre partielle",
          "PTA annuel suivi et majoritairement mis en œuvre, avec revue annuelle",
          "PTA annuel suivi, réalisé à plus de 80 %, et revue annuelle qui ajuste le plan de gestion"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A5",
    "title": "Participation et appropriation communautaires",
    "short": "Participation",
    "questions": [
      {
        "id": "q025",
        "n": "25",
        "label": "Quels mécanismes de participation des communautés existent ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D3",
        "sub": "3.1",
        "crit": null,
        "options": [
          "Réunions villageoises régulières",
          "Comités locaux / comités de site",
          "Consultation formelle avant les décisions",
          "Consentement libre, préalable et éclairé (CLPE)",
          "Restitution des résultats de suivi",
          "Suivi participatif (ex. suivi écologique)",
          "Aucun",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q026",
        "n": "26",
        "label": "Niveau de participation des communautés à l'élaboration du plan et aux décisions",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D3",
        "sub": "3.1",
        "crit": "C4",
        "levels": [
          "Informées des décisions",
          "Consultées",
          "Co-décident avec les autres acteurs",
          "Co-décident avec une influence prépondérante",
          "Initient et portent les décisions finales"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q027",
        "n": "27",
        "label": "Quels groupes participent effectivement aux décisions ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D3",
        "sub": "3.2",
        "crit": null,
        "options": [
          "Pêcheurs résidents",
          "Pêcheurs migrants / non-résidents",
          "Femmes (glaneuses, collectrices, mareyeuses)",
          "Jeunes",
          "Autorités traditionnelles",
          "Élus locaux",
          "Opérateurs privés",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q028",
        "n": "28",
        "label": "Proportion de femmes dans l'instance de décision",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D3",
        "sub": "3.2",
        "crit": null,
        "levels": [
          "Aucune femme",
          "Moins de 10 %",
          "10 à 20 %",
          "20 à 30 %",
          "30 % ou plus"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q029",
        "n": "29",
        "label": "D'où est venue l'initiative de gestion ?",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "D3",
        "sub": "3.3",
        "crit": null,
        "options": [
          "Des communautés",
          "D'une ONG",
          "De l'État",
          "D'un opérateur privé",
          "Initiative conjointe",
          "Ne sais pas / Non applicable",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q030",
        "n": "30",
        "label": "Appropriation du dispositif par les communautés",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D3",
        "sub": "3.3",
        "crit": "C4",
        "levels": [
          "Perçu comme externe ; ne fonctionne qu'avec l'appui extérieur",
          "Faible implication, en dehors des activités financées",
          "Implication réelle (cotisations, patrouilles bénévoles) mais dépendante de l'appui pour les décisions clés",
          "Communautés pleinement impliquées et contributrices",
          "Communautés initient, contribuent et assurent elles-mêmes les activités de gestion nécessaires (surveillance, suivi, application des règles)"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A6",
    "title": "Financement",
    "short": "Financement",
    "questions": [
      {
        "id": "q031",
        "n": "31",
        "label": "Sources de financement de la gestion du site",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D4",
        "sub": "4.1",
        "crit": null,
        "options": [
          "Budget de l'État",
          "FAPBM (fondation)",
          "Bailleurs bilatéraux / multilatéraux",
          "ONG internationales",
          "Droits d'entrée / recettes touristiques",
          "Redevances ou ristournes locales",
          "Cotisations communautaires",
          "Activités génératrices de revenus (AGR)",
          "Secteur privé (RSE, partenariat)",
          "Crédits carbone ou biodiversité",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q032",
        "n": "32",
        "label": "Part de la principale source dans le budget total",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D4",
        "sub": "4.1",
        "crit": "C3",
        "levels": [
          "Plus de 80 %",
          "60 à 80 %",
          "40 à 60 %",
          "20 à 40 %",
          "Moins de 20 % (sources très diversifiées)"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q033",
        "n": "33",
        "label": "Budget annuel de fonctionnement approximatif (MGA)",
        "type": "radio",
        "required": false,
        "path": "A",
        "dim": "D4",
        "sub": "4.2",
        "crit": null,
        "options": [
          "Moins de 10 millions",
          "10 à 50 millions",
          "50 à 200 millions",
          "200 millions à 1 milliard",
          "1 à 10 milliards",
          "Plus de 10 milliards",
          "Ne sais pas / Non applicable"
        ]
      },
      {
        "id": "q034",
        "n": "34",
        "label": "Part des besoins de gestion couverts par le budget disponible",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D4",
        "sub": "4.2",
        "crit": null,
        "levels": [
          "Moins de 20 %",
          "20 à 40 %",
          "40 à 60 %",
          "60 à 80 %",
          "Plus de 80 %"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q035",
        "n": "35",
        "label": "Existe-t-il un mécanisme de financement autonome (fonds fiduciaire, écotourisme, AGR, carbone…) ?",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "D4",
        "sub": "4.3",
        "crit": null,
        "options": [
          "Oui, fonctionnel",
          "En cours de mise en place",
          "Non",
          "Ne sais pas / Non applicable"
        ],
        "detail": {
          "label": "Précisez le mécanisme",
          "when": [
            "Oui, fonctionnel",
            "En cours de mise en place"
          ]
        }
      },
      {
        "id": "q036",
        "n": "36",
        "label": "Visibilité du financement à moyen terme",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D4",
        "sub": "4.3",
        "crit": "C3",
        "levels": [
          "Rien d'assuré au-delà d'un an",
          "Financement assuré pour environ un an",
          "Financement assuré pour 1 à 3 ans",
          "Financement assuré pour 3 à 5 ans",
          "Financement assuré pour plus de 5 ans ou mécanisme autonome couvrant l'essentiel"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q037",
        "n": "37",
        "label": "Si l'appui extérieur principal s'arrêtait demain, que deviendrait la gestion ?",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D4",
        "sub": "4.3",
        "crit": "C3",
        "levels": [
          "Elle s'arrêterait",
          "Elle serait quasi arrêtée",
          "Elle serait fortement réduite",
          "Elle serait réduite mais resterait fonctionnelle",
          "Elle continuerait pleinement"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A7",
    "title": "Moyens humains, matériels et mise en œuvre",
    "short": "Moyens",
    "questions": [
      {
        "id": "q038",
        "n": "38",
        "label": "Nombre de personnes salariées affectées à la gestion du site (équivalent temps plein)",
        "type": "number",
        "required": false,
        "path": "A",
        "dim": "D5",
        "sub": "5.1",
        "crit": null,
        "min": 0,
        "unit": "ETP"
      },
      {
        "id": "q039",
        "n": "39",
        "label": "Nombre d'agents communautaires / bénévoles actifs (patrouilleurs, enquêteurs…)",
        "type": "number",
        "required": false,
        "path": "A",
        "dim": "D5",
        "sub": "5.1",
        "crit": null,
        "min": 0,
        "unit": "personnes"
      },
      {
        "id": "q040",
        "n": "40",
        "label": "Compétences disponibles dans l'équipe de gestion",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D5",
        "sub": "5.1",
        "crit": null,
        "options": [
          "Gestion d'aire protégée",
          "Suivi écologique / biologie marine",
          "Surveillance et droit de l'environnement",
          "Gestion administrative et financière",
          "Animation et organisation communautaire",
          "SIG / cartographie",
          "Développement d'AGR",
          "Suivi socio-économique et analyse de perception",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q041",
        "n": "41",
        "label": "Adéquation du personnel (effectif et compétences) aux besoins",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D5",
        "sub": "5.1",
        "crit": null,
        "levels": [
          "Personnel absent ou non formé",
          "Très insuffisant",
          "Effectif partiel ; compétences clés manquantes",
          "Suffisant",
          "Effectif et compétences pleinement adaptés"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q042",
        "n": "42",
        "label": "Équipements disponibles et opérationnels",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D5",
        "sub": "5.2",
        "crit": null,
        "options": [
          "Bureau / local dédié",
          "Moyens de communication (radio, téléphone)",
          "Embarcation motorisée",
          "Pirogue",
          "Véhicule / moto",
          "Matériel de suivi (GPS, matériel de plongée, appareil photo)",
          "Panneaux / bouées de balisage",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q043",
        "n": "43",
        "label": "Adéquation des infrastructures et équipements aux besoins",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D5",
        "sub": "5.2",
        "crit": null,
        "levels": [
          "Aucun équipement",
          "Très insuffisants",
          "Équipements de base, insuffisants ou mal entretenus",
          "Suffisants",
          "Complets et opérationnels"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q044",
        "n": "44",
        "label": "Taux de réalisation du plan de travail annuel de la dernière année",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D5",
        "sub": "5.3",
        "crit": "C1",
        "levels": [
          "Moins de 20 % (ou pas de PTA)",
          "20 à 40 %",
          "40 à 60 %",
          "60 à 80 %",
          "Plus de 80 %"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A8",
    "title": "Contrôle et application des règles",
    "short": "Contrôle",
    "questions": [
      {
        "id": "q045",
        "n": "45",
        "label": "Dispositif de surveillance",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D6",
        "sub": "6.1",
        "crit": "C1",
        "levels": [
          "Aucune surveillance",
          "Ponctuelle (réaction à des signalements)",
          "Régulière mais ne couvrant pas les zones clés (noyau dur, réserves)",
          "Régulière et planifiée, couvrant les zones clés",
          "Régulière, planifiée et consignée (registre, rapports)"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q046",
        "n": "46",
        "label": "Qui assure la surveillance ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D6",
        "sub": "6.1",
        "crit": null,
        "options": [
          "Comité de surveillance communautaire (CCS, CLP…)",
          "Agents MNP",
          "Agents de l'administration de la pêche",
          "Gendarmerie / police",
          "Marine nationale",
          "Opérateur privé",
          "ONG d'appui",
          "KMD",
          "Autre (préciser)"
        ],
        "other": true,
        "showIf": {
          "q": "q045",
          "ne": 1
        }
      },
      {
        "id": "q047",
        "n": "47",
        "label": "Quelles suites sont données aux infractions constatées ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D6",
        "sub": "6.2",
        "crit": null,
        "options": [
          "Avertissement / sensibilisation",
          "Amende selon le Dina",
          "Saisie des engins ou des captures",
          "Transmission aux autorités administratives ou judiciaires",
          "Aucune suite",
          "Ne sais pas / Non applicable",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q048",
        "n": "48",
        "label": "Effectivité de l'application des sanctions",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D6",
        "sub": "6.2",
        "crit": "C1",
        "levels": [
          "Infractions non sanctionnées",
          "Sanctions rares",
          "Sanctions irrégulières ou sélectives",
          "Sanctions appliquées dans la plupart des cas",
          "Sanctions systématiques, équitables et enregistrées"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q049",
        "n": "49",
        "label": "Articulation avec les autorités et gestion des conflits",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D6",
        "sub": "6.3",
        "crit": null,
        "levels": [
          "Aucune articulation ; conflits non gérés",
          "Recours très rare aux autorités",
          "Recours occasionnel ; gestion des conflits informelle",
          "Procédure connue, appliquée la plupart du temps",
          "Mécanisme parfaitement clair et instance de gestion des conflits opérationnelle"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A9",
    "title": "Suivi-évaluation",
    "short": "Suivi-évaluation",
    "questions": [
      {
        "id": "q050",
        "n": "50",
        "label": "Suivi écologique",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.1",
        "crit": null,
        "help": "Le suivi écologique désigne la collecte de données sur l'état des ressources (récifs, poissons, poulpe, mangroves, herbiers…). Un protocole est « écrit » s'il existe un document décrivant les stations, les méthodes et la fréquence.",
        "levels": [
          "Aucun suivi écologique",
          "Suivi occasionnel : moins d'une fois par an, ou seulement quand un projet le finance",
          "Suivi au moins une fois par an, mais méthode ou stations qui changent d'une campagne à l'autre",
          "Suivi au moins une fois par an selon un protocole écrit (mêmes stations, mêmes méthodes)",
          "Comme 4, et les données sont analysées et présentées aux gestionnaires et aux communautés au moins une fois par an"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q051",
        "n": "51",
        "label": "Indicateurs écologiques et halieutiques suivis",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.1",
        "crit": null,
        "options": [
          "Couverture corallienne / benthos",
          "Abondance / biomasse des poissons",
          "Invertébrés (poulpe, holothuries…)",
          "Captures (débarquements, CPUE)",
          "Mangroves",
          "Herbiers",
          "Espèces emblématiques (tortues, mammifères marins)",
          "Qualité de l'eau",
          "Aucun",
          "Autre (préciser)"
        ],
        "other": true,
        "showIf": {
          "q": "q050",
          "ne": 1
        }
      },
      {
        "id": "q052",
        "n": "52",
        "label": "Qui collecte les données de suivi ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.1",
        "crit": null,
        "options": [
          "Gestionnaires",
          "Communautés formées (suivi participatif)",
          "Chercheurs",
          "ONG d'appui",
          "Opérateur privé",
          "Autre (préciser)"
        ],
        "other": true,
        "showIf": {
          "q": "q050",
          "ne": 1
        }
      },
      {
        "id": "q053",
        "n": "53",
        "label": "Suivi socio-économique et suivi de la mise en œuvre du plan",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.2",
        "crit": null,
        "levels": [
          "Aucun des deux",
          "Ponctuel",
          "L'un des deux réalisé régulièrement",
          "Les deux réalisés régulièrement",
          "Les deux réalisés régulièrement, avec rapport annuel diffusé"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q054",
        "n": "54",
        "label": "Outils d'évaluation de l'efficacité de gestion ou de la gouvernance déjà appliqués sur le site",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.2",
        "crit": null,
        "options": [
          "IMET",
          "METT",
          "SAPA / évaluation de la gouvernance",
          "NRGT",
          "Aucun",
          "Ne sais pas / Non applicable",
          "Autre (préciser)"
        ],
        "other": true
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A10",
    "title": "Méthodes, données et gestion adaptative",
    "short": "Méthodes de suivi",
    "questions": [
      {
        "id": "q054a",
        "n": "54a",
        "label": "Méthodes de suivi écologique utilisées",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.1",
        "crit": null,
        "options": [
          "Suivi des captures / débarquements (CPUE)",
          "Suivi des fermetures temporaires (ex. poulpe, avant / après ouverture)",
          "Comptage visuel des poissons sur transects",
          "Couverture corallienne / benthos (point intercept, photo-quadrats)",
          "Reef Check",
          "Suivi des herbiers (quadrats, Seagrass-Watch)",
          "Suivi des mangroves (placettes, télédétection)",
          "Suivi des espèces emblématiques (tortues, mammifères marins, oiseaux)",
          "Télédétection / SIG",
          "Aucun suivi écologique",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q054b",
        "n": "54b",
        "label": "Fréquence du suivi écologique principal",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.1",
        "crit": null,
        "options": [
          "Plus de 2 fois par an",
          "1 à 2 fois par an",
          "Tous les 2 à 3 ans",
          "Irrégulière, selon les financements",
          "Aucun suivi",
          "Ne sais pas"
        ],
        "showIf": {
          "q": "q054a",
          "notOnly": "Aucun suivi écologique"
        }
      },
      {
        "id": "q054c",
        "n": "54c",
        "label": "Méthodes de suivi socio-économique utilisées",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.2",
        "crit": null,
        "options": [
          "Enquêtes ménages (revenus, moyens d'existence)",
          "SocMon (suivi socio-économique standardisé)",
          "Enquêtes de perception / satisfaction des usagers",
          "Suivi des revenus des AGR (algoculture, holothuriculture…)",
          "Suivi des bénéfices du tourisme",
          "Évaluation de la gouvernance (NRGT, SAPA…)",
          "Aucun suivi socio-économique",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q054d",
        "n": "54d",
        "label": "Fréquence du suivi socio-économique principal",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.2",
        "crit": null,
        "options": [
          "Plus de 2 fois par an",
          "1 à 2 fois par an",
          "Tous les 2 à 3 ans",
          "Irrégulière, selon les financements",
          "Aucun suivi",
          "Ne sais pas"
        ],
        "showIf": {
          "q": "q054c",
          "notOnly": "Aucun suivi socio-économique"
        }
      },
      {
        "id": "q054e",
        "n": "54e",
        "label": "Outils de collecte et de stockage des données",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.3",
        "crit": null,
        "options": [
          "Fiches papier",
          "Tableur (Excel)",
          "Application mobile (KoBo, ODK…)",
          "SMART (patrouilles et surveillance)",
          "Base de données de l'ONG d'appui",
          "Base de données nationale ou du réseau (ex. MIHARI)",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q054f",
        "n": "54f",
        "label": "Les données de suivi sont-elles partagées ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.3",
        "crit": null,
        "options": [
          "Avec les communautés",
          "Avec l'administration (MEDD, MPEB)",
          "Avec d'autres sites ou réseaux",
          "Publiées (rapports, articles)",
          "Non partagées",
          "Ne sais pas"
        ]
      },
      {
        "id": "q054g",
        "n": "54g",
        "label": "Seriez-vous prêt à adopter un protocole de suivi commun au niveau national ?",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "REC",
        "sub": null,
        "crit": null,
        "options": [
          "Oui, sans condition",
          "Oui, avec un appui (formation, matériel, financement)",
          "Oui, à condition de garder certains indicateurs propres au site",
          "Non, le protocole actuel est adapté",
          "Ne sais pas"
        ]
      },
      {
        "id": "q054h",
        "n": "54h",
        "label": "Fréquence d'évaluation de l'efficacité de gestion",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.2",
        "crit": null,
        "options": [
          "Jamais évaluée",
          "Une seule fois",
          "Tous les ans",
          "Tous les 2 ans",
          "Tous les 3 à 5 ans",
          "Irrégulière, selon les projets",
          "Ne sais pas"
        ]
      },
      {
        "id": "q054i",
        "n": "54i",
        "label": "Quels sont les principaux obstacles ou conditions à l'adoption d'un protocole de suivi commun et d'un outil d'évaluation standardisé (coût, compétences, comparabilité des données, propriété des données…) ?",
        "type": "textarea",
        "required": false,
        "path": "A",
        "dim": "REC",
        "sub": null,
        "crit": null
      },
      {
        "id": "q054j",
        "n": "54j",
        "label": "Quel outil proposeriez-vous pour une harmonisation nationale : (1) pour le suivi écologique ou socio-économique (ex. Reef Check), et (2) pour l'évaluation de l'efficacité de gestion (ex. IMET) ? Précisez pourquoi pour chacun des deux outils.",
        "type": "textarea",
        "required": false,
        "path": "A",
        "dim": "REC",
        "sub": null,
        "crit": null
      },
      {
        "id": "q055",
        "n": "55",
        "label": "Utilisation des résultats du suivi pour ajuster la gestion",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.3",
        "crit": "C2",
        "levels": [
          "Jamais",
          "Occasionnellement, sans décision formalisée",
          "Au moins un ajustement de la gestion au cours des 3 dernières années",
          "Ajustements au moins une fois par an, discutés en réunion",
          "Systématiquement, avec restitution aux acteurs et ajustements documentés"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q056",
        "n": "56",
        "label": "Au cours des 5 dernières années, la gestion a-t-elle été ajustée à la suite de… ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D7",
        "sub": "7.3",
        "crit": "C2",
        "options": [
          "Résultats du suivi",
          "Événements climatiques (cyclone, blanchissement, sécheresse)",
          "Conflits entre usagers",
          "Changement de financement",
          "Nouvelle réglementation",
          "Aucun ajustement",
          "Autre (préciser)"
        ],
        "other": true
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A11",
    "title": "Résultats et impacts",
    "short": "Résultats",
    "questions": [
      {
        "id": "q057",
        "n": "57",
        "label": "Évolution de l'état des ressources clés depuis la mise en place de la gestion",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D8",
        "sub": "8.1",
        "crit": "C5",
        "levels": [
          "Dégradation nette",
          "Légère dégradation",
          "Stable",
          "Légère amélioration",
          "Nette amélioration"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q058",
        "n": "58",
        "label": "Sur quoi repose votre réponse précédente ?",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D8",
        "sub": "8.1",
        "crit": null,
        "options": [
          "Données des suivis",
          "Observations des gestionnaires",
          "Perceptions des usagers (pêcheurs)",
          "Ne sais pas / Non applicable",
          "Autre (préciser)"
        ],
        "other": true,
        "showIf": {
          "q": "q057",
          "ne": "NSP"
        }
      },
      {
        "id": "q059",
        "n": "59",
        "label": "Bénéfices socio-économiques observés pour les communautés",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "D8",
        "sub": "8.2",
        "crit": null,
        "options": [
          "Hausse des captures après fermetures",
          "AGR (algoculture, holothuriculture, apiculture…)",
          "Revenus du tourisme",
          "Emplois locaux",
          "Renforcement de l'organisation communautaire",
          "Accès amélioré aux services (santé, éducation, eau)",
          "Aucun bénéfice notable",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q060",
        "n": "60",
        "label": "Ampleur et partage des bénéfices pour les communautés",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D8",
        "sub": "8.2",
        "crit": "C5",
        "levels": [
          "Aucun bénéfice, ou effets négatifs",
          "Bénéfices faibles",
          "Bénéfices limités ou réservés à certains groupes",
          "Bénéfices réels et assez bien partagés",
          "Bénéfices importants, démontrés et partagés équitablement"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q061",
        "n": "61",
        "label": "Atteinte des objectifs du plan de gestion",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "D8",
        "sub": "8.3",
        "crit": "C1",
        "levels": [
          "Moins de 20 % des objectifs atteints, ou non évaluable",
          "20 à 40 %",
          "Environ la moitié",
          "60 à 80 %",
          "Plus de 80 % atteints et documentés"
        ],
        "nsp": "Ne sais pas / Non applicable"
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A12",
    "title": "Pressions, résilience, équité et conflits",
    "short": "Pressions et équité",
    "questions": [
      {
        "id": "q061a",
        "n": "61a",
        "label": "Intensité des pressions sur le site",
        "type": "matrix",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "help": "Une réponse par ligne.",
        "cols": [
          "Absente",
          "Faible",
          "Moyenne",
          "Forte",
          "Très forte",
          "Ne sais pas"
        ],
        "rows": [
          {
            "key": "peche_illegale",
            "label": "Pêche illégale"
          },
          {
            "key": "surpeche",
            "label": "Surpêche"
          },
          {
            "key": "engins_destructifs",
            "label": "Engins de pêche destructifs"
          },
          {
            "key": "collecte_organismes",
            "label": "Collecte de coraux et d'organismes vivants"
          },
          {
            "key": "pollution_terrestre",
            "label": "Pollution d'origine terrestre"
          },
          {
            "key": "sedimentation",
            "label": "Sédimentation"
          },
          {
            "key": "tourisme",
            "label": "Tourisme non régulé"
          },
          {
            "key": "blanchissement",
            "label": "Blanchissement corallien"
          },
          {
            "key": "especes_envahissantes",
            "label": "Espèces envahissantes"
          },
          {
            "key": "conflits_usage",
            "label": "Conflits d'usage"
          },
          {
            "key": "cyclones",
            "label": "Cyclones et tempêtes"
          },
          {
            "key": "bassin_versant",
            "label": "Problème de bassin versant"
          },
          {
            "key": "ensablement",
            "label": "Ensablement"
          }
        ]
      },
      {
        "id": "q061b",
        "n": "61b",
        "label": "Capacité du modèle de gestion à répondre à ces pressions",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "levels": [
          "Pas du tout",
          "Faiblement",
          "En partie",
          "Largement",
          "Pleinement"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q061c",
        "n": "61c",
        "label": "Quelles pressions le modèle ne permet-il pas de gérer, et pourquoi ?",
        "type": "textarea",
        "required": false,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null
      },
      {
        "id": "q061d",
        "n": "61d",
        "label": "Intégration de l'adaptation au changement climatique dans la gestion",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "levels": [
          "Aucune mesure",
          "Mesures ponctuelles non planifiées",
          "Mesures mentionnées dans le plan, peu appliquées",
          "Mesures planifiées et appliquées",
          "Plan d'adaptation formalisé, appliqué et suivi"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q061e",
        "n": "61e",
        "label": "Mesures d'adaptation mises en œuvre",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "options": [
          "Zones refuges / aires de résilience",
          "Restauration (corail, mangrove, herbier)",
          "Diversification des AGR",
          "Suivi du blanchissement",
          "Plan d'urgence cyclones",
          "Aucune",
          "Autre (préciser)"
        ],
        "other": true
      },
      {
        "id": "q061f",
        "n": "61f",
        "label": "Le dispositif a-t-il déjà subi un choc climatique majeur (cyclone, blanchissement, sécheresse) ?",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "options": [
          "Oui, et il a bien résisté",
          "Oui, et il a été fragilisé",
          "Oui, et il s'est arrêté",
          "Non",
          "Ne sais pas"
        ]
      },
      {
        "id": "q061g",
        "n": "61g",
        "label": "Mesures spécifiques pour l'inclusion des femmes (approche genre)",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "levels": [
          "Aucune",
          "Intentions, sans action",
          "Actions ponctuelles",
          "Mesures formalisées mais partiellement appliquées",
          "Mesures formalisées et appliquées (quotas, AGR dédiées…)"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q061h",
        "n": "61h",
        "label": "Mesures spécifiques pour l'implication des jeunes",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "levels": [
          "Aucune",
          "Intentions, sans action",
          "Actions ponctuelles",
          "Mesures formalisées mais partiellement appliquées",
          "Mesures formalisées et appliquées (quotas, AGR dédiées…)"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q061i",
        "n": "61i",
        "label": "Intégration des savoirs locaux et traditionnels",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "levels": [
          "Aucune",
          "Consultation occasionnelle",
          "Pris en compte de façon informelle",
          "Intégrés dans certaines règles (Dina, rôle des Olobe / Ray aman-dreny…)",
          "Intégration formalisée"
        ],
        "nsp": "Ne sais pas / Non applicable"
      },
      {
        "id": "q061j",
        "n": "61j",
        "label": "Existe-t-il des conflits d'usage sur le site ?",
        "type": "radio",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "options": [
          "Oui, fréquents",
          "Oui, occasionnels",
          "Non",
          "Ne sais pas"
        ]
      },
      {
        "id": "q061k",
        "n": "61k",
        "label": "Types de conflits",
        "type": "checkbox",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "options": [
          "Pêcheurs résidents / migrants",
          "Pêche / tourisme",
          "Communautés / opérateurs privés",
          "Communautés / administration",
          "Communautés / comité de gestion (gestionnaire)",
          "Conflits fonciers",
          "Entre villages ou associations",
          "Autre (préciser)"
        ],
        "other": true,
        "showIf": {
          "q": "q061j",
          "starts": "Oui"
        }
      },
      {
        "id": "q061l",
        "n": "61l",
        "label": "Les conflits sont-ils effectivement résolus ?",
        "type": "anchored",
        "required": true,
        "path": "A",
        "dim": "T",
        "sub": null,
        "crit": null,
        "levels": [
          "Jamais",
          "Rarement",
          "Environ la moitié",
          "Le plus souvent",
          "Presque toujours, durablement"
        ],
        "nsp": "Ne sais pas / Non applicable",
        "showIf": {
          "q": "q061j",
          "starts": "Oui"
        }
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "A13",
    "title": "Auto-évaluation FFOM du modèle de gestion",
    "short": "FFOM",
    "questions": [
      {
        "id": "q062",
        "n": "62",
        "label": "Citez les 2 ou 3 principales FORCES du modèle de gestion de ce site",
        "type": "textarea",
        "required": true,
        "path": "A",
        "dim": "FFOM",
        "sub": null,
        "crit": null
      },
      {
        "id": "q063",
        "n": "63",
        "label": "Les 2 ou 3 principales FAIBLESSES",
        "type": "textarea",
        "required": true,
        "path": "A",
        "dim": "FFOM",
        "sub": null,
        "crit": null
      },
      {
        "id": "q064",
        "n": "64",
        "label": "Les OPPORTUNITÉS pour améliorer la gestion",
        "type": "textarea",
        "required": false,
        "path": "A",
        "dim": "FFOM",
        "sub": null,
        "crit": null
      },
      {
        "id": "q065",
        "n": "65",
        "label": "Les MENACES qui pèsent sur la pérennité du dispositif",
        "type": "textarea",
        "required": false,
        "path": "A",
        "dim": "FFOM",
        "sub": null,
        "crit": null
      }
    ],
    "group": "Parcours A — Votre site",
    "showIf": {
      "q": "q007",
      "starts": "A"
    },
    "site": true
  },
  {
    "key": "B1",
    "title": "Appréciation des modèles de gestion",
    "short": "Appréciation des modèles",
    "questions": [
      {
        "id": "q066",
        "n": "66",
        "label": "Avec quels modèles de gestion avez-vous une expérience directe ?",
        "type": "checkbox",
        "required": true,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": null,
        "options": [
          "Étatique",
          "Cogestion",
          "Communautaire",
          "Privé"
        ]
      },
      {
        "id": "q067",
        "n": "67",
        "label": "Efficacité de chaque modèle",
        "type": "matrix",
        "required": true,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": "C1",
        "help": "Capacité à mettre en œuvre la gestion et à faire respecter les règles.",
        "cols": [
          "1 — Très faible",
          "2 — Faible",
          "3 — Moyen",
          "4 — Fort",
          "5 — Très fort",
          "NSP"
        ],
        "rows": [
          {
            "key": "etatique",
            "label": "Étatique"
          },
          {
            "key": "cogestion",
            "label": "Cogestion"
          },
          {
            "key": "communautaire",
            "label": "Communautaire"
          },
          {
            "key": "prive",
            "label": "Privé"
          }
        ],
        "rowsFrom": "q066"
      },
      {
        "id": "q068",
        "n": "68",
        "label": "Adaptabilité de chaque modèle",
        "type": "matrix",
        "required": true,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": "C2",
        "help": "Capacité à ajuster la gestion aux résultats du suivi et aux changements (chocs, conflits).",
        "cols": [
          "1 — Très faible",
          "2 — Faible",
          "3 — Moyen",
          "4 — Fort",
          "5 — Très fort",
          "NSP"
        ],
        "rows": [
          {
            "key": "etatique",
            "label": "Étatique"
          },
          {
            "key": "cogestion",
            "label": "Cogestion"
          },
          {
            "key": "communautaire",
            "label": "Communautaire"
          },
          {
            "key": "prive",
            "label": "Privé"
          }
        ],
        "rowsFrom": "q066"
      },
      {
        "id": "q069",
        "n": "69",
        "label": "Durabilité de chaque modèle",
        "type": "matrix",
        "required": true,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": "C3",
        "help": "Capacité du dispositif à se maintenir dans le temps (statut, financement, autonomie).",
        "cols": [
          "1 — Très faible",
          "2 — Faible",
          "3 — Moyen",
          "4 — Fort",
          "5 — Très fort",
          "NSP"
        ],
        "rows": [
          {
            "key": "etatique",
            "label": "Étatique"
          },
          {
            "key": "cogestion",
            "label": "Cogestion"
          },
          {
            "key": "communautaire",
            "label": "Communautaire"
          },
          {
            "key": "prive",
            "label": "Privé"
          }
        ],
        "rowsFrom": "q066"
      },
      {
        "id": "q070",
        "n": "70",
        "label": "Appropriation communautaire de chaque modèle",
        "type": "matrix",
        "required": true,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": "C4",
        "help": "Degré auquel les communautés participent, décident et portent le dispositif.",
        "cols": [
          "1 — Très faible",
          "2 — Faible",
          "3 — Moyen",
          "4 — Fort",
          "5 — Très fort",
          "NSP"
        ],
        "rows": [
          {
            "key": "etatique",
            "label": "Étatique"
          },
          {
            "key": "cogestion",
            "label": "Cogestion"
          },
          {
            "key": "communautaire",
            "label": "Communautaire"
          },
          {
            "key": "prive",
            "label": "Privé"
          }
        ],
        "rowsFrom": "q066"
      },
      {
        "id": "q071",
        "n": "71",
        "label": "Atteinte des objectifs (conservation et développement local) de chaque modèle",
        "type": "matrix",
        "required": true,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": "C5",
        "help": "Résultats écologiques et socio-économiques obtenus.",
        "cols": [
          "1 — Très faible",
          "2 — Faible",
          "3 — Moyen",
          "4 — Fort",
          "5 — Très fort",
          "NSP"
        ],
        "rows": [
          {
            "key": "etatique",
            "label": "Étatique"
          },
          {
            "key": "cogestion",
            "label": "Cogestion"
          },
          {
            "key": "communautaire",
            "label": "Communautaire"
          },
          {
            "key": "prive",
            "label": "Privé"
          }
        ],
        "rowsFrom": "q066"
      }
    ],
    "group": "Parcours B — Acteur institutionnel",
    "showIf": {
      "q": "q007",
      "starts": "B"
    }
  },
  {
    "key": "B2",
    "title": "Forces, faiblesses et obstacles",
    "short": "Forces et faiblesses",
    "questions": [
      {
        "id": "q072",
        "n": "72",
        "label": "Forces et faiblesses du modèle étatique",
        "type": "textarea",
        "required": false,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": null,
        "help": "Facultatif.",
        "showIf": {
          "q": "q066",
          "eq": "Étatique"
        }
      },
      {
        "id": "q073",
        "n": "73",
        "label": "Forces et faiblesses du modèle cogestion",
        "type": "textarea",
        "required": false,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": null,
        "help": "Facultatif.",
        "showIf": {
          "q": "q066",
          "eq": "Cogestion"
        }
      },
      {
        "id": "q074",
        "n": "74",
        "label": "Forces et faiblesses du modèle communautaire",
        "type": "textarea",
        "required": false,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": null,
        "help": "Facultatif.",
        "showIf": {
          "q": "q066",
          "eq": "Communautaire"
        }
      },
      {
        "id": "q075",
        "n": "75",
        "label": "Forces et faiblesses du modèle privé",
        "type": "textarea",
        "required": false,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": null,
        "help": "Facultatif.",
        "showIf": {
          "q": "q066",
          "eq": "Privé"
        }
      },
      {
        "id": "q076",
        "n": "76",
        "label": "Obstacles juridiques ou institutionnels à l'harmonisation des modèles de gestion",
        "type": "textarea",
        "required": false,
        "path": "B",
        "dim": "B",
        "sub": null,
        "crit": null
      }
    ],
    "group": "Parcours B — Acteur institutionnel",
    "showIf": {
      "q": "q007",
      "starts": "B"
    }
  },
  {
    "key": "R",
    "title": "Vers un modèle national harmonisé",
    "short": "Modèle harmonisé",
    "questions": [
      {
        "id": "q077",
        "n": "77",
        "label": "Quels éléments devraient obligatoirement figurer dans un modèle national harmonisé ?",
        "type": "checkbox",
        "required": true,
        "path": "Tous",
        "dim": "REC",
        "sub": null,
        "crit": null,
        "help": "Cochez au maximum 5 éléments.",
        "options": [
          "Clarification du statut juridique des LMMA",
          "Articulation Dina — justice — administration",
          "Mécanisme de financement durable",
          "Cadre commun de suivi écologique et socio-écologique",
          "Standards minimaux de participation et d'inclusion",
          "Partage équitable des bénéfices",
          "Renforcement des capacités des structures communautaires",
          "Coordination entre administrations (environnement / pêche)",
          "Évaluation régulière de l'efficacité (IMET)",
          "Autre (préciser)"
        ],
        "other": true,
        "max": 5
      },
      {
        "id": "q078",
        "n": "78",
        "label": "Décrivez une bonne pratique, issue de votre expérience, qui devrait inspirer le modèle national",
        "type": "textarea",
        "required": false,
        "path": "Tous",
        "dim": "REC",
        "sub": null,
        "crit": null
      },
      {
        "id": "q079",
        "n": "79",
        "label": "Pour un cadre commun de suivi : quels indicateurs écologiques et socio-économiques seraient prioritaires ?",
        "type": "textarea",
        "required": false,
        "path": "Tous",
        "dim": "REC",
        "sub": null,
        "crit": null
      },
      {
        "id": "q080",
        "n": "80",
        "label": "Quels documents pouvez-vous partager ? (à envoyer par e-mail à l'adresse indiquée en introduction)",
        "type": "checkbox",
        "required": false,
        "path": "Tous",
        "dim": "REC",
        "sub": null,
        "crit": null,
        "options": [
          "Plan de gestion",
          "PTA / rapport annuel",
          "Données de suivi",
          "Dina / règlement intérieur",
          "Convention ou contrat de gestion",
          "Rapport d'évaluation (IMET, METT…)",
          "Aucun"
        ]
      },
      {
        "id": "q081",
        "n": "81",
        "label": "Accepteriez-vous d'être recontacté(e) pour un échange de 20 minutes ?",
        "type": "radio",
        "required": true,
        "path": "Tous",
        "dim": "REC",
        "sub": null,
        "crit": null,
        "options": [
          "Oui",
          "Non"
        ],
        "detail": {
          "label": "Vos coordonnées (si elles ne figurent pas à la question 6)",
          "when": [
            "Oui"
          ]
        }
      }
    ]
  }
]
};

if (typeof module !== "undefined") module.exports = SURVEY;
