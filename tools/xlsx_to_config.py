# -*- coding: utf-8 -*-
"""
xlsx_to_config.py — génère assets/js/survey-config.js à partir du fichier Excel
du questionnaire (onglet « Questionnaire »).

Usage (depuis le dossier enquete-gestion-amp/) :
    pip install openpyxl
    python tools/xlsx_to_config.py "Questionnaire Modèle de gestion AMP LMMA Mada finale.xlsx"
    node tools/make_codebook.js

Les libellés, modalités et caractère obligatoire viennent du fichier Excel.
Les adaptations nécessaires au formulaire en ligne (conditions d'affichage,
découpage en pages, identifiants des lignes de grille…) sont dans OVERRIDES et
STEPS ci-dessous. Toute modification faite à la main dans survey-config.js est
écrasée si l'on relance ce script : modifier plutôt ce fichier.
"""
import json, re, sys, os

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "js", "survey-config.js")

# --------------------------------------------------------------------------- META
META = {
    "version": "1.0",
    "title": "Diagnostic des modèles de gestion des AMP et LMMA à Madagascar",
    "subtitle": "Enquête auprès des gestionnaires, partenaires et institutions, en vue d'un modèle national de gestion harmonisé",
    "organizer": "[Nom de l'institution porteuse — à compléter]",
    "contactName": "[Nom du/de la responsable de l'enquête]",
    "contactEmail": "[adresse@exemple.mg]",
    "deadline": "[date limite — à compléter]",
    "estimatedTime": "Parcours A : 45 à 60 min · Parcours B : 15 à 20 min",
    "estimatedTimeShort": "15 à 60 min",
    "appsScriptUrl": "",
    "logos": [
        {"src": "assets/img/logos/ihsm.png", "alt": "IH.SM — Université de Toliara", "url": ""},
        {"src": "assets/img/logos/fapbm.png", "alt": "FAPBM", "url": ""},
    ],
    "intro": [
        "Cette enquête vise à dresser un diagnostic des modèles de gestion des aires marines protégées (AMP), des aires marines gérées localement (LMMA) et des AMCE/OECM à Madagascar : gouvernance, planification, participation des communautés, financement, moyens, contrôle, suivi-évaluation et résultats.",
        "Elle s'adresse aux gestionnaires et cogestionnaires de sites, aux ONG et associations d'appui, aux structures communautaires, aux administrations, aux réseaux, aux opérateurs privés, aux institutions de recherche et aux partenaires techniques et financiers.",
        "Deux parcours sont proposés. Parcours A : vous répondez pour un site précis que votre organisation gère, cogère ou appuie directement — un questionnaire par site (à la fin, vous pourrez enchaîner sur un autre site sans ressaisir votre identification). Parcours B : vous répondez en tant qu'acteur institutionnel ou transversal, sans gestion directe d'un site.",
        "Vos réponses sont enregistrées automatiquement sur cet appareil : vous pouvez interrompre la saisie et la reprendre plus tard depuis le même navigateur.",
    ],
    "privacy": "Les informations recueillies servent uniquement à ce diagnostic. Les résultats seront présentés de manière agrégée et anonymisée : aucun site ni aucune organisation ne sera cité nommément sans accord. [Adapter selon vos engagements de confidentialité.]",
    "consentQ": "q001",
    "siteNameQ": "q008",
    "routeQ": "q007",
    "keepOnNewSite": ["q002", "q003", "q004", "q004_autre", "q005", "q006", "q007"],
    "heroPhoto": "peche-diego",
    "introPhotos": ["pirogue-vezo", "mangrove-belo", "recif-acropora"],
    "thanksPhoto": "vezo-peche",
    "photoCreditNote": "Photographies : Wikimedia Commons (auteurs et licences indiqués sous chaque photo).",
}

def commons(key, file, caption, credit, license_, width=1280):
    """Photo Wikimedia Commons : URL de la miniature + page de la licence."""
    from urllib.parse import quote
    import hashlib
    name = file.replace(" ", "_")
    md5 = hashlib.md5(name.encode("utf-8")).hexdigest()
    q = quote(name, safe="")
    thumb = f"https://upload.wikimedia.org/wikipedia/commons/thumb/{md5[0]}/{md5[:2]}/{q}/{width}px-{q}"
    return {"key": key, "src": f"assets/img/photos/{key}.jpg", "remote": thumb, "caption": caption,
            "credit": credit, "license": license_,
            "page": "https://commons.wikimedia.org/wiki/File:" + quote(name, safe="(),")}

PHOTOS = [
    commons("peche-diego", "La pêche dans la baie de Diego-Suarez.jpg", "Pêcheurs dans la baie des Français, Antsiranana", "JF Design", "CC BY-SA 4.0"),
    commons("pirogue-vezo", "Pirogue à balancier.JPG", "Pirogue à balancier vezo", "Boosha Afrikaf", "CC BY-SA 4.0"),
    commons("mangrove-belo", "Mangroves , Belo sur mer, Madagascar.jpg", "Mangroves, Belo-sur-Mer", "Cactus0625", "CC BY-SA 4.0"),
    commons("vezo-peche", "Vezo à la pêche.JPG", "Pêcheurs vezo sur une pirogue à balancier", "Boosha Afrikaf", "CC BY-SA 4.0"),
    commons("village-mahavavy", "Village des pêcheurs le long du fleuve de Mahavavy.jpg", "Village de pêcheurs, aire protégée Mahavavy-Kinkony", "Anai171", "CC BY-SA 4.0"),
    commons("pecheurs-antsiranana", "Two fisherman VavaLapasy Antsiranana Madagascar.jpg", "Pêcheurs, Antsiranana", "TinsRad", "CC BY-SA 4.0"),
    commons("port-tulear", "Boutres et pirogue Vezo, port de Tuléar, Madagascar (26057141635).jpg", "Boutres et pirogue vezo, port de Toliara", "krishna naudin", "CC BY-SA 2.0"),
    commons("mangrove-belo-2", "Madagascar mangroves.JPG", "Mangroves de Belo-sur-Mer", "Terpsichores", "CC BY-SA 3.0"),
    commons("recif-acropora", "Coral (Acropora clathrata), Nosy Iranja, Madagascar, 2025-09-17, DD 53.jpg", "Acropora clathrata, Nosy Iranja", "Diego Delso", "CC BY-SA 4.0"),
    commons("recif-empereurs", "Grupo de peces emperador estriados (Gnathodentex aureolineatus), Nosy Kalakajoro, Madagascar, 2025-09-14, DD 03.jpg", "Empereurs (Gnathodentex aureolineatus), Nosy Kalakajoro", "Diego Delso", "CC BY-SA 4.0"),
    commons("recif-clowns", "Peces payaso de Madagascar (Amphiprion latifasciatus) en una anémona perla de cristal (Heteractis aurora), Ambalihabe, Madagascar, 2025-09-16, DD 117.jpg", "Poissons-clowns de Madagascar, Ambalihabe", "Diego Delso", "CC BY-SA 4.0"),
]

# --------------------------------------------------------------- pages du formulaire
# (clé, titre, titre court, groupe dans le menu, liste des n° de questions, condition d'étape)
ROUTE_A = {"q": "q007", "starts": "A"}
ROUTE_B = {"q": "q007", "starts": "B"}
STEPS = [
    ("ID",  "Identification du répondant", "Identification", None, "2-7", None),
    ("A1",  "Identification du site", "Identification du site", "Parcours A — Votre site", "8-13", ROUTE_A),
    ("A2",  "Sites AMCE / OECM", "AMCE / OECM", "Parcours A — Votre site", "13a-13d", {"q": "q010", "starts": "AMCE"}),
    ("A3",  "Gouvernance et prise de décision", "Gouvernance", "Parcours A — Votre site", "14-19", ROUTE_A),
    ("A4",  "Planification", "Planification", "Parcours A — Votre site", "20-24", ROUTE_A),
    ("A5",  "Participation et appropriation communautaires", "Participation", "Parcours A — Votre site", "25-30", ROUTE_A),
    ("A6",  "Financement", "Financement", "Parcours A — Votre site", "31-37", ROUTE_A),
    ("A7",  "Moyens humains, matériels et mise en œuvre", "Moyens", "Parcours A — Votre site", "38-44", ROUTE_A),
    ("A8",  "Contrôle et application des règles", "Contrôle", "Parcours A — Votre site", "45-49", ROUTE_A),
    ("A9",  "Suivi-évaluation", "Suivi-évaluation", "Parcours A — Votre site", "50-54", ROUTE_A),
    ("A10", "Méthodes, données et gestion adaptative", "Méthodes de suivi", "Parcours A — Votre site", "54a-54j,55,56", ROUTE_A),
    ("A11", "Résultats et impacts", "Résultats", "Parcours A — Votre site", "57-61", ROUTE_A),
    ("A12", "Pressions, résilience, équité et conflits", "Pressions et équité", "Parcours A — Votre site", "61a-61l", ROUTE_A),
    ("A13", "Auto-évaluation FFOM du modèle de gestion", "FFOM", "Parcours A — Votre site", "62-65", ROUTE_A),
    ("B1",  "Appréciation des modèles de gestion", "Appréciation des modèles", "Parcours B — Acteur institutionnel", "66-71", ROUTE_B),
    ("B2",  "Forces, faiblesses et obstacles", "Forces et faiblesses", "Parcours B — Acteur institutionnel", "72-76", ROUTE_B),
    ("R",   "Vers un modèle national harmonisé", "Modèle harmonisé", None, "77-81", None),
]

# Clés courtes des lignes de grille (deviennent les suffixes de colonnes : q018_medd…)
ROW_KEYS = {
    "18": ["medd", "mpeb", "ctd", "trad", "communautes", "ong", "prives", "recherche"],
    "61a": ["peche_illegale", "surpeche", "engins_destructifs", "collecte_organismes", "pollution_terrestre",
            "sedimentation", "tourisme", "blanchissement", "especes_envahissantes", "conflits_usage",
            "cyclones", "bassin_versant", "ensablement"],
    "67": ["etatique", "cogestion", "communautaire", "prive"],
}
for k in ["68", "69", "70", "71"]:
    ROW_KEYS[k] = ROW_KEYS["67"]

# Adaptations au formulaire en ligne (voir README, « Modifications apportées »)
OVERRIDES = {
    "1":   {"consent": True},
    "2":   {"enumeratorOnly": True},          # masquée sauf lien enquêteur (?enqueteur=1)
    "6":   {"autocomplete": "email"},
    "13":  {"type": "year"},
    "21":  {"type": "year", "showIf": {"q": "q020", "in": [3, 4, 5]}},
    "35":  {"label": "Existe-t-il un mécanisme de financement autonome (fonds fiduciaire, écotourisme, AGR, carbone…) ?",
            "dropOther": True, "detail": {"label": "Précisez le mécanisme", "when": ["Oui, fonctionnel", "En cours de mise en place"]}},
    "38":  {"min": 0, "unit": "ETP"},
    "39":  {"min": 0, "unit": "personnes"},
    "46":  {"showIf": {"q": "q045", "ne": 1}},
    "51":  {"showIf": {"q": "q050", "ne": 1}},
    "52":  {"showIf": {"q": "q050", "ne": 1}},
    "54b": {"showIf": {"q": "q054a", "notOnly": "Aucun suivi écologique"}},
    "54d": {"showIf": {"q": "q054c", "notOnly": "Aucun suivi socio-économique"}},
    "58":  {"showIf": {"q": "q057", "ne": "NSP"}},
    "61k": {"showIf": {"q": "q061j", "starts": "Oui"}},
    "61l": {"showIf": {"q": "q061j", "starts": "Oui"}},
    "67":  {"rowsFrom": "q066"}, "68": {"rowsFrom": "q066"}, "69": {"rowsFrom": "q066"},
    "70":  {"rowsFrom": "q066"}, "71": {"rowsFrom": "q066"},
    "72":  {"showIf": {"q": "q066", "eq": "Étatique"}},
    "73":  {"showIf": {"q": "q066", "eq": "Cogestion"}},
    "74":  {"showIf": {"q": "q066", "eq": "Communautaire"}},
    "75":  {"showIf": {"q": "q066", "eq": "Privé"}},
    "77":  {"max": 5},
    "81":  {"detail": {"label": "Vos coordonnées (si elles ne figurent pas à la question 6)", "when": ["Oui"]}},
}

TYPE_MAP = {
    "Choix unique": "radio", "Choix unique (filtre)": "radio", "Choix unique (aiguillage)": "radio",
    "Cases à cocher": "checkbox", "Texte court": "text", "Texte long": "textarea",
    "Nombre": "number", "Échelle 1–5 ancrée": "anchored", "Grille": "matrix",
}

# ------------------------------------------------------------------------ lecture
def qid(n):
    m = re.match(r"^(\d+)([a-z]?)$", n)
    return "q%03d%s" % (int(m.group(1)), m.group(2))

def expand(spec):
    """'54a-54j,55,56' -> ['54a', ..., '54j', '55', '56']"""
    out = []
    for part in spec.split(","):
        if "-" in part:
            a, b = part.split("-")
            ma, mb = re.match(r"(\d+)([a-z]?)", a), re.match(r"(\d+)([a-z]?)", b)
            if ma.group(2):  # 13a-13d
                out += [ma.group(1) + chr(c) for c in range(ord(ma.group(2)), ord(mb.group(2)) + 1)]
            else:
                out += [str(i) for i in range(int(a), int(b) + 1)]
        else:
            out.append(part)
    return out

def clean_opt(o):
    o = o.strip()
    o = re.sub(r"^\+\s*", "", o)
    return o

def parse(path):
    ws = openpyxl.load_workbook(path, data_only=True)["Questionnaire"]
    qs = {}
    for r in ws.iter_rows(min_row=2, values_only=True):
        n, section, text, typ, opts, req = r[0], r[1], r[2], r[3], r[4], r[5]
        if n is None or section is None:
            continue
        n = str(n).strip().lstrip("Q")
        text = str(text).strip()
        help_ = None
        m = re.search(r"\[Aide\s*:\s*(.*?)\]", text, re.S)
        if m:
            help_ = m.group(1).strip()
            text = re.sub(r"\s*\[Aide\s*:.*?\]", "", text, flags=re.S).strip()
        q = {"id": qid(n), "n": n, "label": text, "type": TYPE_MAP[typ], "required": str(req).strip() == "Oui",
             "path": r[6], "dim": r[7], "sub": r[8], "crit": r[9]}
        if help_:
            q["help"] = help_
        if q["type"] == "matrix":
            rows_s, cols_s = re.match(r"Lignes\s*:\s*(.*?)\s*\n\s*Colonnes\s*:\s*(.*)", opts, re.S).groups()
            labels = [x.strip() for x in rows_s.split(";")]
            q["cols"] = [x.strip() for x in cols_s.split(";")]
            keys = ROW_KEYS[n]
            assert len(keys) == len(labels), n
            q["rows"] = [{"key": k, "label": l} for k, l in zip(keys, labels)]
        elif q["type"] == "anchored":
            lines = [x.strip() for x in str(opts).split("\n") if x.strip()]
            q["levels"] = [re.sub(r"^\d\s*—\s*", "", x) for x in lines if re.match(r"^\d\s*—", x)]
            nsp = [x for x in lines if not re.match(r"^\d\s*—", x)]
            assert len(q["levels"]) == 5, n
            q["nsp"] = nsp[0] if nsp else "Ne sais pas / Non applicable"
        elif opts:
            q["options"] = [clean_opt(x) for x in str(opts).split("\n") if x.strip()]
            if any(re.match(r"^Autre", o) or "(préciser)" in o for o in q["options"]):
                q["other"] = True
        qs[n] = q
    return qs

def apply_overrides(q):
    o = OVERRIDES.get(q["n"], {})
    for k, v in o.items():
        if k == "dropOther":
            q["options"] = [x for x in q["options"] if not x.startswith("Autre")]
            q.pop("other", None)
        else:
            q[k] = v
    return q

def main(path):
    qs = parse(path)
    used, steps = set(), []
    for key, title, short, group, spec, cond in STEPS:
        ids = expand(spec)
        questions = []
        for n in ids:
            q = apply_overrides(dict(qs[n]))
            used.add(n)
            questions.append(q)
        st = {"key": key, "title": title, "short": short, "questions": questions}
        if group: st["group"] = group
        if cond: st["showIf"] = cond
        if key.startswith("A"): st["site"] = True
        steps.append(st)
    consent = apply_overrides(dict(qs["1"])); used.add("1")
    missing = set(qs) - used
    assert not missing, "Questions non placées : %s" % sorted(missing)

    meta = dict(META)
    meta["consent"] = {"id": consent["id"], "label": consent["label"], "options": consent["options"]}
    js = (
        "/* =====================================================================\n"
        "   CONFIGURATION DE L'ENQUÊTE « MODÈLES DE GESTION AMP / LMMA »\n"
        "   Fichier GÉNÉRÉ par tools/xlsx_to_config.py à partir du fichier Excel.\n"
        "   Pour un changement ponctuel (date limite, contact, URL Apps Script),\n"
        "   modifier directement META ci-dessous. Pour modifier les questions,\n"
        "   modifier le fichier Excel ou tools/xlsx_to_config.py, puis relancer\n"
        "   le script (sinon vos modifications manuelles seront écrasées).\n\n"
        "   Les identifiants (id) deviennent les noms de colonnes dans Google\n"
        "   Sheets et les noms de variables dans R : ne pas les modifier une fois\n"
        "   la collecte lancée.\n\n"
        "   Types : text, textarea, number, year, radio, checkbox,\n"
        "           anchored (échelle 1–5 ancrée + « Ne sais pas »),\n"
        "           matrix (grille : une réponse par ligne)\n"
        "   Options : other, max, min, unit, help, detail {label, when},\n"
        "             rowsFrom (lignes limitées aux choix d'une autre question),\n"
        "             showIf { q, eq | ne | in | starts | any | notOnly }\n"
        "   ===================================================================== */\n\n"
        "const SURVEY = {\n  META: " + json.dumps(meta, ensure_ascii=False, indent=2) +
        ",\n\n  PHOTOS: " + json.dumps(PHOTOS, ensure_ascii=False, indent=2) +
        ",\n\n  STEPS: " + json.dumps(steps, ensure_ascii=False, indent=2) +
        "\n};\n\nif (typeof module !== \"undefined\") module.exports = SURVEY;\n"
    )
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)
    nq = sum(len(s["questions"]) for s in steps) + 1
    print(f"{nq} questions, {len(steps)} pages → {os.path.relpath(OUT)}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "questionnaire.xlsx")
