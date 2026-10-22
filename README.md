# Diagnostic des modèles de gestion des AMP et LMMA à Madagascar

Online questionnaire (GitHub or GitLab Pages) → Google Sheets → R project → HTML report.
Same design and engine as the coral reef survey (`enquete-recifs`), adapted to the AMP/LMMA questionnaire: two paths (A = one site, B = institutional actor), anchored 1–5 scales with "Ne sais pas", grids (one answer per row), and scoring of the 24 sub-criteria by governance model.

```
enquete-gestion-amp/
├── index.html                  ← the questionnaire (Pages serves this)
├── assets/
│   ├── js/survey-config.js     ← texts, logos, photos, questions, Apps Script URL (GENERATED, see below)
│   ├── js/app.js               ← form engine (no need to edit)
│   ├── css/style.css           ← colours / layout
│   └── img/logos/              ← put ihsm.png and fapbm.png here
├── apps-script/Code.gs         ← receives answers, writes them to Google Sheets
├── questionnaire/              ← your Excel file (source of the questions; git-ignored)
├── tools/
│   ├── xlsx_to_config.py       ← Excel → survey-config.js (+ online adaptations)
│   ├── make_codebook.js        ← survey-config.js → analysis/codebook.csv
│   └── download_photos.R       ← local copies of the photos
├── analysis/                   ← R project (open enquete-gestion-amp.Rproj)
│   ├── R/00_packages.R 01_import.R 02_simulate.R 03_clean.R functions.R config.R
│   ├── report/rapport.Rmd
│   ├── codebook.csv            ← variables, labels, options, conditions, dimension / sub-criterion / TdR criterion
│   ├── run_all.R               ← import + render both reports + export scores
│   └── data/                   ← raw data and internal report (git-ignored, never published)
├── rapport/index.html          ← public report (currently built from FAKE data)
└── .gitlab-ci.yml              ← only needed if you publish on GitLab
```

---

## Step 1 — Customise the form (15 min)

Open `assets/js/survey-config.js` and fill the `META` block at the top:

- `organizer`, `contactName`, `contactEmail`, `deadline`, `privacy` (all marked `[...]`).
- **Logos**: copy the official files into `assets/img/logos/` as `ihsm.png` and `fapbm.png` (transparent PNG or SVG, ~120 px high). Until they are there, the page shows the names in a dashed box.
- Leave `appsScriptUrl` empty for now (Step 2).

**Changing questions.** `survey-config.js` is generated from your Excel file, so the wording is exactly yours. To change a question, edit the Excel file (or the online adaptations in `tools/xlsx_to_config.py`) and run:

```bash
pip install openpyxl
python tools/xlsx_to_config.py "questionnaire/Questionnaire Modèle de gestion AMP LMMA Mada finale.xlsx"
node tools/make_codebook.js
```

⚠️ Re-running the script overwrites `survey-config.js`: copy your `META` values (contact, deadline, Apps Script URL) into `META` at the top of `tools/xlsx_to_config.py` first, so they are kept.
⚠️ Do not rename question numbers once data collection has started: `q015`, `q018_medd`… are the column names in Google Sheets and the variable names in R.

**Photos.** 11 photos from Wikimedia Commons (Vezo fishers and pirogues, mangroves of Belo-sur-Mer, villages, reefs of north-west Madagascar). Licences CC BY-SA 2.0/3.0/4.0 allow use **if the author, licence and link are shown** — the page does this under each photo; do not remove it. I could not preview these photos from my environment: open the page once and replace any you dislike (list `PHOTOS` in `tools/xlsx_to_config.py`). Your own field photos are a better choice if you have them. To host them with the site: `source("tools/download_photos.R")` in R.

**Preview locally:** in the folder, run `python -m http.server`, then open <http://localhost:8000>.

**Enumerator link.** Q2 "Mode de remplissage" is hidden for respondents and recorded as "En ligne, par le répondant". For phone interviews, use `…/index.html?enqueteur=1`: Q2 is then shown.

## Step 2 — Connect the form to Google Sheets (10 min)

1. Create a Google Sheet (e.g. *Enquête gestion AMP — réponses*) with the Google account that will own the data.
2. In the Sheet: **Extensions → Apps Script**. Delete the default code, paste the content of `apps-script/Code.gs`, save.
3. (Optional) Put your e-mail in `NOTIFY_EMAIL` to receive a message for each response.
4. Select the function `autoriser` → **Run** → accept the permissions (Google warns the app is unverified: *Advanced → Go to project*; it is your own script).
5. **Deploy → New deployment → type: Web app** — *Execute as*: **Me**; *Who has access*: **Anyone** → Deploy → copy the URL ending in `/exec`.
6. Paste that URL into `appsScriptUrl` in `survey-config.js`.
7. Test: open the `/exec` URL — you should see `{"ok":true,"message":"Service de collecte actif"}`. Fill the form once and check that the `Reponses` tab appears.

Data structure (`Reponses` tab): **one row per submitted questionnaire** — path A: one row per site; path B: one row per actor.
- `respondent_id` links the sites entered one after the other by the same person (the thank-you page offers "Remplir pour un autre site", which keeps Q2–Q7); `site_seq` = 1, 2, 3…
- Multiple-choice answers are separated by ` | `; "Autre (préciser)" text is in `qXXX_autre`; Q35 and Q81 details in `q035_detail`, `q081_detail`.
- 1–5 scales contain `1`…`5` or `NSP`. Grids are split by row: `q018_medd`, `q061a_cyclones`, `q067_cogestion`…
- Questions not shown to a respondent are empty. Duplicates (double click) are ignored using `response_id`. Server errors are logged in the `Journal` tab.
- When you modify `Code.gs`: **Deploy → Manage deployments → ✏️ → Version: New version** (keeps the same URL).

## Step 3 — Publish the site (10 min)

The repository must be **public** for free Pages hosting. That is fine: no response data is stored in it (`analysis/data/` and `questionnaire/` are git-ignored).

**GitHub**
1. Create a repository (e.g. `enquete-gestion-amp`) and upload the folder (*Add file → Upload files*, or Git):
   ```bash
   git init && git add . && git commit -m "Questionnaire gestion AMP v1.0"
   git branch -M main
   git remote add origin https://github.com/<user>/enquete-gestion-amp.git
   git push -u origin main
   ```
2. **Settings → Pages → Deploy from a branch → `main` / `(root)`** → Save.
3. After ~1 min: form at `https://<user>.github.io/enquete-gestion-amp/`, report at `…/rapport/`.

**GitLab** — push the same folder to a GitLab project; `.gitlab-ci.yml` publishes it automatically at `https://<user>.gitlab.io/enquete-gestion-amp/` (check *Deploy → Pages*; set visibility to *Everyone* if needed).

Before sending the link: fill it once yourself on a phone and on a computer (path A and path B), then delete your test rows in the Sheet.

## Step 4 — Analyse in R

1. Open `analysis/enquete-gestion-amp.Rproj` in RStudio. `R/00_packages.R` installs what is missing.
2. **Test now with fake data**: `DATA_SOURCE <- "simulated"` (default in `R/config.R`), then `source("run_all.R")`. This builds:
   - `rapport/index.html` — public, aggregated only;
   - `data/rapport_interne.html` — internal: list of sites with scores, open answers, "Autre" details, contacts (Q81);
   - `data/scores_sites.csv` — one score per site × sub-criterion, for your own analyses.
   The fake data respect the form logic (paths, AMCE page, conditional questions) and have model effects built in so the plots look realistic — they mean nothing.
3. **Real data**: in `R/config.R` set `SHEET_URL` and `DATA_SOURCE <- "sheet"`, then `source("run_all.R")`. The first time, a browser window asks you to authorise *Tidyverse API Packages* to read your Sheets (token cached in `analysis/.secrets/`, git-ignored). Each import is saved in `data/raw/` (`.rds` + `.csv`); `DATA_SOURCE <- "cache"` works offline on the last copy.
4. Work interactively:
   ```r
   source("R/00_packages.R"); source("R/config.R"); source("R/01_import.R")
   source("R/03_clean.R"); source("R/functions.R")
   CB  <- read_codebook()
   dat <- clean_data(load_raw("cache"), CB)
   SA  <- dplyr::filter(dat$reponses, route == "A")     # one row per site
   heat_scores(dat, "dim")                               # 8 dimensions × governance model
   plot_matrix(SA, "q061a", reverse = TRUE)              # pressures
   heat_by(SA, "q031", group = "modele")                 # funding sources by model
   plot_partB(dplyr::filter(dat$reponses, route == "B")) # Q67–71
   ```

**How scores are computed** (`R/03_clean.R`, following your *Echelles_Notation* sheet): each 1–5 "Score" question is tagged with its dimension (D1–D8) and sub-criterion (1.1–8.3) in `codebook.csv`. Sub-criterion score = mean of its questions (only 4.3 has two: Q36, Q37); "NSP" is excluded. Dimension score = mean of its sub-criteria if at least 2 of 3 are answered; global score = mean of dimensions if ≥ 6 of 8. Group = governance model (Q11). Means by model are hidden below `min_n = 3` sites (report parameter). The TdR criteria C1–C5 (column J of your sheet) are used to compare site self-assessments (path A) with institutional ratings (Q67–71, path B).

## Step 5 — Publish the report

After `run_all.R`, commit and push `rapport/index.html`:
```bash
git add rapport/index.html && git commit -m "Rapport mis à jour" && git push
```
The public version has no organisation or site names and no free text. Keep `data/rapport_interne.html` for yourself and your supervisors — never commit it.

> With few sites, a single private site (or the only site of a region) can still be identifiable from its model or region. Check the public report before pushing.

---

## Changes made to the questionnaire — please check

The online version follows the spreadsheet; these adjustments were needed to make it work as a form. Revert any you disagree with in `OVERRIDES` / `STEPS` of `tools/xlsx_to_config.py`.

| Q | Change | Why |
|---|---|---|
| 1 | On the welcome page; "Non" shows a thank-you message and stops the form (nothing is sent) | Filter question |
| 2 | Hidden for respondents, recorded as "En ligne…"; shown with `?enqueteur=1` | "Réservé à l'équipe" |
| 7 | Routes the form: A → site pages (Q8–65); B → Q66–76; both → Q77–81 | Column "Parcours" |
| 13a–13d | Page shown only if Q10 starts with "AMCE / OECM" | Section "Sites AMCE / OECM" |
| 13, 21 | Year fields (1950–current year) | Ask for a year |
| 21 | Shown if Q20 = 3, 4 or 5 | No plan → no plan year |
| 35 | "Précisez lequel dans « Autre »" removed from the text; "Autre" option replaced by an optional "Précisez le mécanisme" field shown when "Oui, fonctionnel" or "En cours…" | "Autre" was used to specify a "Oui" answer |
| 38, 39 | Numbers ≥ 0, units ETP / personnes | |
| 46 | Hidden if Q45 = 1 (no surveillance) | |
| 51, 52 | Hidden if Q50 = 1 (no ecological monitoring) | |
| 54b, 54d | Hidden if "Aucun suivi…" is the only answer to Q54a / Q54c | |
| 58 | Hidden if Q57 = "Ne sais pas" | Refers to the previous answer |
| 61k, 61l | Shown if Q61j = "Oui…" | Types of conflicts |
| 67–71 | Rows limited to the models ticked in Q66; NSP column kept | Your choice: rate only models with direct experience |
| 72–75 | Each shown only if that model is ticked in Q66 | Same logic |
| 77 | Max 5 selections enforced | "Cochez au maximum 5" |
| 81 | "Oui" opens an optional contact field | Q6 contact is optional |
| All | "Autre (préciser)" opens a required text field; "Aucun…", "Ne sais pas…", "Non partagées" un-tick the other options | |

**Points I did not change — worth deciding before launch:**
- **Length of path A** (~95 questions, 13 pages). For organisations supporting several sites (Blue Ventures, WWF, WCS, MNP), that is 45–60 min per site. Consider asking them for their 1–2 main sites only, or splitting Part A into a short version.
- **Redundancies**: Q24 (level 5 includes "réalisé à plus de 80 %") and Q44 both measure PTA completion; Q50 vs Q54a–54b (monitoring and its frequency); Q53 vs Q54c–54d; Q51 (indicators) vs Q54a (methods). They inflate length and some sub-criteria will be correlated by construction.
- **Q35** mixes the question and the instruction; I changed it (see table) — check you agree.
- **Q66 has no "Aucun" option**: a path-B actor without direct experience of any model cannot continue. Add "Aucune expérience directe" if needed (then Q67–71 would be skipped).
- **Q11 vs Q10 consistency**: e.g. "LMMA Dina" + "Étatique" is possible in the form. Worth a check in the internal report.
- **Same site, several respondents**: a site can be described by its manager and by a partner NGO (e.g. Nosy Hara by MNP and WWF). Decide whether you keep both rows (and compare) or one reference answer per site before computing model means.
- **Self-assessment bias**: path A scores are declarative; the "Documents à vérifier" column of your rubric (Q80 asks for them) is the way to triangulate for a subset of sites.
- **Small numbers per model**: with ~4 state and 1 private site in the target list, comparisons by model will be descriptive only (no tests); the report hides means below 3 sites.

## Limits to be aware of

- Answers are saved on the respondent's device (browser storage) while filling — not across devices.
- The form is in French only.
- The `/exec` URL is public: anyone with it could submit. A hidden anti-bot field is included; duplicates are filtered by `response_id`. Check the data for test/spam rows before analysis.
- The progress bar shows "Étape 1 sur 4" until Q7 is answered (the number of pages depends on the path).
