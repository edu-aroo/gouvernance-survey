/* =====================================================================
   Moteur du formulaire — généré à partir de survey-config.js
   Normalement, aucune modification n'est nécessaire ici.
   ===================================================================== */
(function () {
  "use strict";

  const META = SURVEY.META;
  const STORE_KEY = "gestion-amp-enquete-draft-v" + META.version;
  const QDEF = {};
  SURVEY.STEPS.forEach(s => s.questions.forEach(q => { QDEF[q.id] = q; }));
  const PHOTOS = SURVEY.PHOTOS || [];
  const photoByKey = k => PHOTOS.find(p => p.key === k);
  const SEP = " | ";
  const NSP = "NSP";                                   // valeur enregistrée pour « Ne sais pas / Non applicable »
  const PARAMS = new URLSearchParams(location.search);
  const ENUMERATOR = PARAMS.has("enqueteur");          // lien enquêteur : …/index.html?enqueteur=1
  // Questions dont dépend la liste des étapes (aiguillage A/B, AMCE)
  const STEP_DEPS = new Set(SURVEY.STEPS.filter(s => s.showIf).map(s => s.showIf.q));

  /* ------------------------------------------------------------ état */
  let state = freshState();
  let steps = [];
  let saveTimer = null;

  function freshState() {
    const s = {
      responseId: uuid(),
      respondentId: uuid(),           // commun à tous les sites saisis par une même personne
      siteSeq: 1,
      startedAt: new Date().toISOString(),
      consent: "",
      general: {},
      current: 0,
      maxReached: 0
    };
    defaults(s.general);
    return s;
  }
  function defaults(ans) {
    Object.values(QDEF).forEach(q => {
      if (q.enumeratorOnly && !ans[q.id]) ans[q.id] = ENUMERATOR ? "" : q.options[0];
    });
  }

  /* --------------------------------------------------------- helpers */
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isEmpty = v => v == null || v === "" || (Array.isArray(v) && (v.length === 0 || v.every(x => x === "" || x == null)));
  const isOther = o => /^Autre/.test(o) || /\(préciser\)/.test(o);
  const isExclusive = o => /^(Aucun|Aucune|Ne sai[st] pas|Je ne sais pas|Non partagées)/.test(o);
  const consentOk = () => /^Oui/.test(state.consent || "");
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------------------------------------------- conditions */
  function cond(c, ans) {
    if (!c) return true;
    const v = ans[c.q];
    if ("eq" in c) return Array.isArray(v) ? v.includes(c.eq) : v === c.eq;
    if ("ne" in c) return v !== c.ne;
    if ("in" in c) return c.in.includes(v);
    const arr = Array.isArray(v) ? v : (isEmpty(v) ? [] : [v]);
    if ("starts" in c) return arr.some(x => String(x).startsWith(c.starts));
    if ("any" in c) return arr.some(x => c.any.includes(x));
    if ("notOnly" in c) return !(arr.length === 1 && arr[0] === c.notOnly);
    return true;
  }
  function matrixRows(q, ans) {
    if (!q.rowsFrom) return q.rows;
    const sel = ans[q.rowsFrom] || [];
    return q.rows.filter(r => sel.includes(r.label));
  }
  function questionVisible(q, ans) {
    if (q.enumeratorOnly && !ENUMERATOR) return false;
    if (q.rowsFrom && !matrixRows(q, ans).length) return false;
    if (!q.showIf) return true;
    const parent = QDEF[q.showIf.q];                       // conditions en cascade
    if (parent && parent !== q && !questionVisible(parent, ans)) return false;
    return cond(q.showIf, ans);
  }
  const detailShown = (q, v) => q.detail && (!q.detail.when || q.detail.when.includes(v));

  /* --------------------------------------------------------- étapes */
  function buildSteps() {
    const out = [{ id: "intro", kind: "intro", title: "Bienvenue", short: "Présentation", group: null }];
    for (const s of SURVEY.STEPS) {
      if (!cond(s.showIf, state.general)) continue;
      out.push({ id: s.key, kind: "questions", def: s, title: s.title, short: s.short, group: s.group || null });
    }
    out.push({ id: "recap", kind: "recap", title: "Vérification et envoi", short: "Vérification et envoi", group: null });
    return out;
  }
  const scopeAnswers = () => state.general;

  /* ------------------------------------------------------ photos */
  // Fichier local (assets/img/photos) en priorité ; à défaut, copie hébergée sur Wikimedia Commons
  function photoImg(p, cls) {
    if (!p) return "";
    return `<img class="${cls || ""}" src="${esc(p.src)}" data-remote="${esc(p.remote)}" alt="${esc(p.caption)}" loading="lazy"
      onerror="if(this.dataset.remote&&this.src!==this.dataset.remote){this.src=this.dataset.remote}else{var f=this.closest('figure,.hero-photo');if(f)f.classList.add('no-photo')}">`;
  }
  function photoFigure(p, cls) {
    if (!p) return "";
    return `<figure class="photo ${cls || ""}">${photoImg(p)}
      <figcaption><span>${esc(p.caption)}</span><a href="${esc(p.page)}" target="_blank" rel="noopener">© ${esc(p.credit)} · ${esc(p.license)}</a></figcaption></figure>`;
  }

  /* ------------------------------------------------- rendu en-tête */
  function renderChrome() {
    const hero = photoByKey(META.heroPhoto);
    if (hero) {
      $("#heroPhoto").innerHTML = photoImg(hero, "hero-img");
      $("#heroCredit").innerHTML = `${esc(hero.caption)} · <a href="${esc(hero.page)}" target="_blank" rel="noopener">© ${esc(hero.credit)}, ${esc(hero.license)}</a>`;
    }
    if (META.photoCreditNote) $("#photoCredits").textContent = META.photoCreditNote;
    document.title = META.title;
    $("#heroTitle").textContent = META.title;
    $("#heroSubtitle").textContent = META.subtitle;
    $("#heroOrganizer").textContent = META.organizer;
    $("#chipTime").textContent = META.estimatedTimeShort || META.estimatedTime;
    $("#chipDeadline").textContent = META.deadline;
    $("#footerOrganizer").textContent = META.organizer;
    const mail = $("#footerContact");
    mail.textContent = META.contactName + " — " + META.contactEmail;
    mail.href = "mailto:" + META.contactEmail;
    $("#footerYear").textContent = new Date().getFullYear();
    $("#headerYear").textContent = new Date().getFullYear();
    if (ENUMERATOR) document.body.classList.add("is-enumerator");

    $("#logos").innerHTML = META.logos.map(l => {
      const img = `<img src="${esc(l.src)}" alt="${esc(l.alt)}" loading="eager" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'logo-fallback',textContent:this.alt}))">`;
      return `<li class="logo">${l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener">${img}</a>` : img}</li>`;
    }).join("");
  }

  /* ------------------------------------------------------ sidebar */
  function renderSidebar() {
    const list = $("#stepList");
    let html = "", lastGroup = null;
    steps.forEach((s, i) => {
      if (s.group !== lastGroup) {
        if (lastGroup !== null) html += "</ol></li>";
        if (s.group) html += `<li class="step-group"><span class="group-title">${esc(s.group)}</span><ol>`;
        lastGroup = s.group;
      }
      const cls = ["step-link", i === state.current ? "is-current" : "", i < state.current ? "is-done" : "", i > state.maxReached ? "is-locked" : ""].join(" ");
      html += `<li><button type="button" class="${cls}" data-step="${i}" ${i > state.maxReached ? "disabled" : ""}>
        <span class="step-dot" aria-hidden="true"></span><span class="step-name">${esc(s.short)}</span></button></li>`;
    });
    if (lastGroup !== null) html += "</ol></li>";
    list.innerHTML = html;

    const pct = Math.round(100 * state.current / Math.max(1, steps.length - 1));
    $("#progressBar").style.width = pct + "%";
    $("#progressBar").parentElement.setAttribute("aria-valuenow", pct);
    $("#progressLabel").textContent = "Étape " + (state.current + 1) + " sur " + steps.length;
    $("#progressPct").textContent = pct + " %";
    $("#mobileStepName").textContent = steps[state.current].short;
  }

  /* ---------------------------------------------- rendu questions */
  function uidFor(step, q) { return step.id + "__" + q.id; }

  function renderQuestion(step, q) {
    const ans = scopeAnswers(step);
    const uid = uidFor(step, q);
    const v = ans[q.id];
    const req = q.required ? `<span class="req" title="Obligatoire">*</span>` : "";
    const num = `<span class="q-num">Q${esc(q.n)}</span>`;
    let field = "";

    switch (q.type) {
      case "text": {
        field = `<input class="input" type="text" id="${uid}" name="${uid}" value="${esc(v || "")}" autocomplete="${q.id === "q003" ? "organization" : (q.autocomplete || "off")}">`;
        break;
      }
      case "textarea":
        field = `<textarea class="input" id="${uid}" name="${uid}" rows="4">${esc(v || "")}</textarea>`;
        break;
      case "number": case "year": {
        const yr = new Date().getFullYear();
        const min = q.type === "year" ? 1950 : (q.min != null ? q.min : "");
        const max = q.type === "year" ? yr : (q.max != null ? q.max : "");
        field = `<div class="num-wrap"><input class="input input-num" type="number" inputmode="${q.type === "year" ? "numeric" : "decimal"}" step="${q.type === "year" ? 1 : "any"}"
          id="${uid}" name="${uid}" value="${v == null ? "" : esc(v)}" ${min !== "" ? `min="${min}"` : ""} ${max !== "" ? `max="${max}"` : ""} ${q.type === "year" ? 'placeholder="AAAA"' : ""}>
          ${q.unit ? `<span class="unit">${esc(q.unit)}</span>` : ""}</div>`;
        break;
      }
      case "radio": case "checkbox": {
        const multi = q.type === "checkbox";
        const opts = q.options || [];
        const sel = multi ? (v || []) : v;
        const cols = opts.length > 6 ? " choices-2col" : "";
        const lim = q.max || 0;
        const full = lim && multi && sel.length >= lim;
        if (lim) field += `<p class="q-limit muted small">${lim} réponses maximum · <span data-count>${sel.length}</span>/${lim} sélectionnée(s)</p>`;
        field += `<div class="choices${cols}" role="${multi ? "group" : "radiogroup"}">` + opts.map(o => {
          const checked = multi ? sel.includes(o) : sel === o;
          const dis = full && !checked;
          return `<label class="choice${dis ? " is-disabled" : ""}"><input type="${multi ? "checkbox" : "radio"}" name="${uid}" value="${esc(o)}" ${checked ? "checked" : ""} ${dis ? "disabled" : ""}>
            <span class="mark" aria-hidden="true"></span><span class="choice-text">${esc(o)}</span></label>`;
        }).join("") + `</div>`;
        if (q.other) {
          const show = multi ? (sel || []).some(isOther) : isOther(sel || "");
          field += `<div class="other-wrap" ${show ? "" : "hidden"}><input class="input" type="text" name="${uid}__autre" data-sub="autre"
            placeholder="Précisez…" value="${esc(ans[q.id + "_autre"] || "")}" aria-label="Précisez « Autre »"></div>`;
        }
        break;
      }
      case "anchored": {
        field = `<div class="anchored" role="radiogroup">` + q.levels.map((o, k) => {
          const val = k + 1;
          return `<label class="anch lvl-${val}"><input type="radio" name="${uid}" value="${val}" ${v === val ? "checked" : ""}>
            <span class="anch-box"><span class="anch-num">${val}</span><span class="anch-txt">${esc(o)}</span></span></label>`;
        }).join("") + `<label class="anch anch-nsp"><input type="radio" name="${uid}" value="${NSP}" ${v === NSP ? "checked" : ""}>
            <span class="anch-box"><span class="anch-num">?</span><span class="anch-txt">${esc(q.nsp)}</span></span></label></div>`;
        break;
      }
      case "matrix": {
        const g = v || {};
        const rows = matrixRows(q, ans);
        const scored = q.cols.every(c => /^(\d\s*—|NSP)/.test(c));   // colonnes « 1 — Très faible … »
        field = `<div class="matrix${scored ? " matrix-scored" : ""}" data-sig="${esc(rows.map(r => r.key).join(","))}">` + rows.map(r => `
          <div class="mx-row${g[r.key] ? " is-answered" : ""}" data-row="${r.key}" role="radiogroup" aria-label="${esc(r.label)}">
            <div class="mx-label">${esc(r.label)}</div>
            <div class="mx-opts">${q.cols.map(c => `<label class="mx-opt${c === "NSP" || /^Ne sai/.test(c) ? " mx-nsp" : ""}">
              <input type="radio" name="${uid}__${r.key}" value="${esc(c)}" ${g[r.key] === c ? "checked" : ""}>
              <span>${scored && /^\d/.test(c) ? `<b>${esc(c[0])}</b><small>${esc(c.replace(/^\d\s*—\s*/, ""))}</small>` : esc(c)}</span></label>`).join("")}</div>
          </div>`).join("") + `</div>`;
        break;
      }
    }
    if (q.detail) {
      const show = detailShown(q, v);
      field += `<div class="detail-wrap" ${show ? "" : "hidden"}><label class="explain-label" for="${uid}__detail">${esc(q.detail.label)} <span class="muted small">(facultatif)</span></label>
        <input class="input" type="text" id="${uid}__detail" name="${uid}__detail" data-sub="detail" value="${esc(ans[q.id + "_detail"] || "")}"></div>`;
    }
    const grouped = ["radio", "checkbox", "anchored", "matrix"].includes(q.type);
    return `<div class="q q-${q.type}" data-qid="${q.id}" data-type="${q.type}" ${questionVisible(q, ans) ? "" : "hidden"}>
      <div class="q-head">${num}<label class="q-label" ${grouped ? "" : `for="${uid}"`}>${esc(q.label)}${req}</label></div>
      ${q.help ? `<p class="q-help">${esc(q.help)}</p>` : ""}
      ${q.type === "matrix" && !/réponse par ligne/.test(q.help || "") ? `<p class="q-help">${q.rowsFrom ? "Seuls les modèles cochés à la question 66 sont proposés. " : ""}Une réponse par ligne.</p>` : ""}
      <div class="q-field">${field}</div>
      <p class="q-error" role="alert"></p>
    </div>`;
  }

  /* ------------------------------------------------- rendu étapes */
  function siteName() { return (state.general[META.siteNameQ] || "").trim(); }

  function renderStep() {
    const step = steps[state.current];
    const box = $("#stepContainer");
    let html = "";

    if (step.kind === "intro") {
      const c = META.consent;
      html = `<div class="step-head"><p class="eyebrow">Présentation</p><h2>${esc(META.title)}</h2></div>
        <div class="intro">${META.intro.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        ${META.draftNote ? `<div class="notice"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10H5V5h10v4z"/></svg>
       <div><strong>Enregistrement automatique</strong><p>${esc(META.draftNote)}</p></div></div>` : ""}
        ${(META.introPhotos || []).length ? `<div class="photo-mosaic">${META.introPhotos.map(k => photoFigure(photoByKey(k))).join("")}</div>` : ""}
        <div class="paths">
          <div class="path"><span class="path-tag">Parcours A</span><strong>Gestionnaire ou partenaire d'un site</strong><p>Un questionnaire par AMP, LMMA ou AMCE que votre organisation gère, cogère ou appuie directement.</p></div>
          <div class="path"><span class="path-tag path-tag-b">Parcours B</span><strong>Acteur institutionnel ou transversal</strong><p>Administrations, réseaux, bailleurs, recherche : appréciation des modèles de gestion et recommandations.</p></div>
        </div>
        <div class="notice"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
          <div><strong>Confidentialité</strong><p>${esc(META.privacy)}</p></div></div>
        <ul class="facts">
          <li><span>Durée estimée</span><strong>${esc(META.estimatedTime)}</strong></li>
          <li><span>Date limite</span><strong>${esc(META.deadline)}</strong></li>
          <li><span>Contact</span><strong><a href="mailto:${esc(META.contactEmail)}">${esc(META.contactEmail)}</a></strong></li>
        </ul>
        ${ENUMERATOR ? `<p class="ok small"><strong>Mode enquêteur</strong> : la question « Mode de remplissage » est affichée.</p>` : ""}
        <p class="muted small">Les questions marquées d'un <span class="req">*</span> sont obligatoires.</p>
        <div class="q" data-qid="__consent">
          <div class="q-head"><span class="q-num">Q1</span><span class="q-label">${esc(c.label)}<span class="req">*</span></span></div>
          <div class="q-field"><div class="choices" role="radiogroup">${c.options.map(o => `<label class="choice"><input type="radio" name="consent" value="${esc(o)}" ${state.consent === o ? "checked" : ""}>
            <span class="mark" aria-hidden="true"></span><span class="choice-text">${esc(o)}</span></label>`).join("")}</div>
          <div class="refusal" ${state.consent && !consentOk() ? "" : "hidden"}><p><strong>Merci pour votre réponse.</strong> Vous avez choisi de ne pas participer : aucune donnée ne sera enregistrée. Vous pouvez fermer cette page.</p></div></div>
          <p class="q-error" role="alert"></p></div>`;
    } else if (step.kind === "recap") {
      html = renderRecap();
    } else {
      const def = step.def;
      const qSteps = steps.filter(s => s.kind === "questions");
      const others = PHOTOS.filter(p => p.key !== META.heroPhoto && !(META.introPhotos || []).includes(p.key));
      const banner = others.length ? others[qSteps.indexOf(step) % others.length] : null;
      const sName = siteName();
      html = (banner ? photoFigure(banner, "photo-banner") : "") + `<div class="step-head">
          ${def.site && def.key !== "A1" ? `<div class="site-banner"><span class="site-tag">Site ${state.siteSeq > 1 ? "n° " + state.siteSeq : ""}</span><strong>${esc(sName || "—")}</strong><span class="muted small">Les questions de cette page portent sur ce site.</span></div>` : ""}
          <p class="eyebrow">${esc(step.group || "Questionnaire")}</p><h2>${esc(def.title)}</h2>
          ${def.key === "A1" && state.siteSeq > 1 ? `<p class="ok small">Nouveau site (n° ${state.siteSeq}) : votre identification a été conservée. Renseignez maintenant ce site.</p>` : ""}
        </div>`;
      def.questions.forEach(q => { html += renderQuestion(step, q); });
    }
    box.innerHTML = html;
    $("#btnPrev").hidden = state.current === 0;
    $("#btnNext").hidden = step.kind === "recap" || (step.kind === "intro" && state.consent && !consentOk());
    $("#btnNext").textContent = state.current === steps.length - 2 ? "Vérifier mes réponses" : "Suivant";
    renderSidebar();
  }

  /* -------------------------------------------- lecture des champs */
  function readQuestion(step, qEl) {
    const qid = qEl.dataset.qid;
    const type = qEl.dataset.type;
    const ans = scopeAnswers(step);
    const uid = step.id + "__" + qid;
    const named = n => $$(`[name="${CSS.escape(n)}"]`, qEl);
    switch (type) {
      case "checkbox":
        ans[qid] = named(uid).filter(i => i.checked).map(i => i.value); break;
      case "radio":
        ans[qid] = (named(uid).find(i => i.checked) || {}).value || ""; break;
      case "anchored": {
        const c = named(uid).find(i => i.checked);
        ans[qid] = !c ? "" : (c.value === NSP ? NSP : Number(c.value)); break;
      }
      case "number": case "year": {
        const raw = named(uid)[0].value; ans[qid] = raw === "" ? "" : Number(raw); break;
      }
      case "matrix": {
        const g = Object.assign({}, ans[qid] || {});
        $$(".mx-row", qEl).forEach(r => {
          const c = $$("input", r).find(i => i.checked);
          if (c) g[r.dataset.row] = c.value;
          r.classList.toggle("is-answered", !!c);
        });
        ans[qid] = g; break;
      }
      default:
        ans[qid] = named(uid)[0].value;
    }
    const o = $(`[data-sub="autre"]`, qEl); if (o) ans[qid + "_autre"] = o.value;
    const d = $(`[data-sub="detail"]`, qEl); if (d) ans[qid + "_detail"] = d.value;
  }

  function onFieldChange(e) {
    const step = steps[state.current];
    if (e.target.name === "consent") {
      state.consent = e.target.value;
      clearError(e.target.closest(".q"));
      $(".refusal").hidden = consentOk();
      $("#btnNext").hidden = !consentOk();
      scheduleSave(); return;
    }
    const qEl = e.target.closest(".q");
    if (!qEl || step.kind !== "questions") return;
    const qid = qEl.dataset.qid;
    const q = QDEF[qid];
    // « Aucun… » / « Ne sais pas » : exclusif des autres cases
    if (e.target.type === "checkbox" && e.target.checked && !e.target.dataset.sub) {
      const boxes = $$('.choices input[type="checkbox"]', qEl);
      if (isExclusive(e.target.value)) boxes.forEach(b => { if (b !== e.target) b.checked = false; });
      else boxes.forEach(b => { if (isExclusive(b.value)) b.checked = false; });
    }
    readQuestion(step, qEl);
    const ans = scopeAnswers(step);

    const ow = $(".other-wrap", qEl);
    if (ow) {
      const v = ans[qid];
      const show = Array.isArray(v) ? v.some(isOther) : isOther(v || "");
      ow.hidden = !show;
      if (show && e.target.type !== "text" && e.target.checked && isOther(e.target.value)) $("input", ow).focus();
    }
    const dw = $(".detail-wrap", qEl);
    if (dw) dw.hidden = !detailShown(q, ans[qid]);
    if (q && q.max) {
      const boxes = $$('.choices input[type="checkbox"]', qEl);
      const n = boxes.filter(b => b.checked).length;
      boxes.forEach(b => { if (!b.checked) b.disabled = n >= q.max; b.closest(".choice").classList.toggle("is-disabled", b.disabled); });
      const cnt = $("[data-count]", qEl); if (cnt) cnt.textContent = n;
    }
    clearError(qEl);
    // grilles dont les lignes dépendent de cette question (ex. Q67–71 ← Q66)
    step.def.questions.filter(x => x.rowsFrom === qid).forEach(x => {
      const el = $(`.q[data-qid="${x.id}"]`);
      const tmp = document.createElement("div");
      tmp.innerHTML = renderQuestion(step, x);
      el.replaceWith(tmp.firstElementChild);
    });
    updateVisibility(step);

    if (STEP_DEPS.has(qid)) {
      const curId = step.id;
      steps = buildSteps();
      state.current = Math.max(0, steps.findIndex(s => s.id === curId));
      state.maxReached = Math.min(state.maxReached, steps.length - 1);
      renderSidebar();
    }
    scheduleSave();
  }

  function updateVisibility(step) {
    const ans = scopeAnswers(step);
    step.def.questions.forEach(q => {
      const el = $(`.q[data-qid="${q.id}"]`);
      if (el) el.hidden = !questionVisible(q, ans);
    });
  }

  /* ---------------------------------------------------- validation */
  function setError(qEl, msg) { qEl.classList.add("has-error"); $(".q-error", qEl).textContent = msg; }
  function clearError(qEl) { if (!qEl) return false; qEl.classList.remove("has-error"); const e = $(".q-error", qEl); if (e) e.textContent = ""; return true; }

  function validateQuestion(step, q, ans) {
    const v = ans[q.id];
    if (q.type === "matrix") {
      if (!q.required) return null;
      const miss = matrixRows(q, ans).filter(r => !(v || {})[r.key]);
      return miss.length ? (miss.length === 1 ? "Une ligne sans réponse : " + miss[0].label + "." : miss.length + " lignes sans réponse.") : null;
    }
    if (q.required && isEmpty(v)) return "Cette question est obligatoire.";
    if (q.other) {
      const hasOther = Array.isArray(v) ? v.some(isOther) : isOther(v || "");
      if (hasOther && isEmpty((ans[q.id + "_autre"] || "").trim())) return "Veuillez préciser votre réponse « Autre ».";
    }
    if ((q.type === "number" || q.type === "year") && v !== "" && v != null) {
      if (isNaN(v)) return "Veuillez saisir un nombre.";
      const min = q.type === "year" ? 1950 : q.min, max = q.type === "year" ? new Date().getFullYear() : q.max;
      if (min != null && v < min) return `La valeur doit être supérieure ou égale à ${min}.`;
      if (max != null && v > max) return `La valeur doit être inférieure ou égale à ${max}.`;
    }
    if (q.max && Array.isArray(v) && v.length > q.max) return `${q.max} réponses maximum.`;
    return null;
  }

  function validateStep(step, showErrors) {
    let firstBad = null;
    if (step.kind === "intro") {
      if (!consentOk()) {
        if (showErrors) { const el = $('.q[data-qid="__consent"]'); setError(el, "Veuillez indiquer si vous acceptez de participer."); firstBad = el; }
        return showErrors ? firstBad : false;
      }
      return showErrors ? null : true;
    }
    if (step.kind !== "questions") return showErrors ? null : true;
    const ans = scopeAnswers(step);
    let ok = true;
    step.def.questions.forEach(q => {
      if (!questionVisible(q, ans)) return;
      const msg = validateQuestion(step, q, ans);
      if (msg) {
        ok = false;
        if (showErrors) { const el = $(`.q[data-qid="${q.id}"]`); if (el) { setError(el, msg); firstBad = firstBad || el; } }
      }
    });
    return showErrors ? firstBad : ok;
  }

  /* ---------------------------------------------------- navigation */
  function goTo(i) {
    state.current = Math.max(0, Math.min(i, steps.length - 1));
    state.maxReached = Math.max(state.maxReached, state.current);
    renderStep();
    scheduleSave();
    $("#formTop").scrollIntoView({ behavior: "smooth", block: "start" });
    document.body.classList.remove("nav-open");
  }
  function next() {
    const bad = validateStep(steps[state.current], true);
    if (bad) { bad.scrollIntoView({ behavior: "smooth", block: "center" }); const f = $("input,textarea,select", bad); if (f) f.focus({ preventScroll: true }); return; }
    goTo(state.current + 1);
  }

  /* -------------------------------------------------- récapitulatif */
  function fmt(q, ans) {
    const v = ans[q.id];
    if (q.type === "anchored") return v === NSP ? q.nsp : (v ? v + " — " + q.levels[v - 1] : "");
    if (q.type === "matrix") return matrixRows(q, ans).filter(r => (v || {})[r.key]).map(r => r.label + " : " + v[r.key]).join(" ; ");
    let s = Array.isArray(v) ? v.join(" ; ") : (v == null ? "" : String(v));
    if (q.unit && s) s += " " + q.unit;
    if (q.other && ans[q.id + "_autre"] && (Array.isArray(v) ? v.some(isOther) : isOther(v || ""))) s += " (" + ans[q.id + "_autre"] + ")";
    if (detailShown(q, v) && ans[q.id + "_detail"]) s += " — " + ans[q.id + "_detail"];
    return s;
  }
  function renderRecap() {
    const sName = siteName();
    const isA = /^A/.test(state.general[META.routeQ] || "");
    let html = `<div class="step-head"><p class="eyebrow">Dernière étape</p><h2>Vérification et envoi</h2>
      <p class="muted">Relisez vos réponses avant l'envoi. Cliquez sur « Modifier » pour corriger une section.</p>
      ${isA ? `<p class="small">Site concerné : <strong>${esc(sName || "—")}</strong></p>` : ""}</div>`;
    const incomplete = [];
    steps.forEach((s, i) => {
      if (s.kind !== "questions") return;
      const ans = scopeAnswers(s);
      const ok = validateStep(s, false);
      if (!ok) incomplete.push(i);
      const rows = s.def.questions.filter(q => questionVisible(q, ans)).map(q => {
        const f = fmt(q, ans);
        return `<div class="recap-row"><dt><span class="q-num">Q${esc(q.n)}</span> ${esc(q.label)}</dt><dd>${f ? esc(f) : '<span class="muted">—</span>'}</dd></div>`;
      }).join("");
      html += `<section class="recap-block ${ok ? "" : "is-incomplete"}">
        <header><div><span class="muted small">${esc(s.group || "Questionnaire")}</span><h3>${esc(s.title)}</h3></div>
        <button type="button" class="btn btn-ghost btn-sm" data-step="${i}">Modifier</button></header>
        ${ok ? "" : '<p class="warn">Des réponses obligatoires manquent dans cette section.</p>'}
        <dl>${rows}</dl></section>`;
    });
    html += `<div class="hp" aria-hidden="true"><label>Ne pas remplir<input type="text" id="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="submit-zone">
        ${incomplete.length ? `<p class="warn">Merci de compléter les sections signalées avant l'envoi.</p>` : ""}
        <button type="button" class="btn btn-primary btn-lg" id="btnSubmit" ${incomplete.length ? "disabled" : ""}>Envoyer mes réponses</button>
        <button type="button" class="btn btn-ghost" id="btnDownload">Télécharger une copie de mes réponses (.json)</button>
      </div>`;
    return html;
  }

  /* ------------------------------------------------------ payload */
  function flatten(qs, ans, includeValues) {
    const out = {};
    qs.forEach(q => {
      const vis = includeValues && (questionVisible(q, ans) || q.enumeratorOnly);
      const v = vis ? ans[q.id] : "";
      switch (q.type) {
        case "matrix": {
          const shown = vis ? matrixRows(q, ans).map(r => r.key) : [];
          q.rows.forEach(r => { out[q.id + "_" + r.key] = shown.includes(r.key) ? ((v || {})[r.key] || "") : ""; });
          return;
        }
        case "checkbox":
          out[q.id] = Array.isArray(v) ? v.join(SEP) : ""; break;
        default:
          out[q.id] = v == null ? "" : v;
      }
      if (q.other) {
        const has = vis && (Array.isArray(v) ? v.some(isOther) : isOther(v || ""));
        out[q.id + "_autre"] = has ? (ans[q.id + "_autre"] || "").trim() : "";
      }
      if (q.detail) out[q.id + "_detail"] = vis && detailShown(q, v) ? String(ans[q.id + "_detail"] || "").trim() : "";
    });
    return out;
  }
  function buildPayload() {
    const general = { [META.consent.id]: state.consent };
    SURVEY.STEPS.forEach(s => Object.assign(general, flatten(s.questions, state.general, cond(s.showIf, state.general))));
    const now = new Date();
    return {
      response_id: state.responseId,
      respondent_id: state.respondentId,
      site_seq: state.siteSeq,
      survey_version: META.version,
      started_at: state.startedAt,
      submitted_at_client: now.toISOString(),
      duration_min: Math.round((now - new Date(state.startedAt)) / 60000),
      website: ($("#website") || {}).value || "",
      general
    };
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(buildPayload(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "reponses-gestion-amp-" + state.responseId.slice(0, 8) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
  }

  async function submit() {
    const bad = steps.findIndex(s => !validateStep(s, false));
    if (bad >= 0) { goTo(bad); setTimeout(() => validateStep(steps[bad], true), 50); return; }
    const btn = $("#btnSubmit");
    if (!META.appsScriptUrl) {
      showStatus("error", "Le formulaire n'est pas encore relié à Google Sheets (URL Apps Script manquante dans survey-config.js). Vous pouvez télécharger une copie de vos réponses.");
      return;
    }
    btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Envoi en cours…';
    try {
      const res = await fetch(META.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(buildPayload())
      });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || "Erreur inconnue");
      done();
    } catch (err) {
      btn.disabled = false; btn.textContent = "Réessayer l'envoi";
      showStatus("error", "L'envoi a échoué (" + err.message + "). Vos réponses sont conservées sur cet appareil : vérifiez votre connexion et réessayez, ou téléchargez une copie et envoyez-la à " + META.contactEmail + ".");
    }
  }
  function showStatus(kind, msg) {
    let el = $("#submitStatus");
    if (!el) { el = document.createElement("p"); el.id = "submitStatus"; $(".submit-zone").prepend(el); }
    el.className = kind === "error" ? "warn" : "ok";
    el.textContent = msg;
  }

  function done() {
    const isA = /^A/.test(state.general[META.routeQ] || "");
    const sName = siteName();
    const ref = state.responseId.slice(0, 8).toUpperCase();
    // Ce qui est conservé pour un éventuel site suivant
    const keep = { respondentId: state.respondentId, siteSeq: state.siteSeq, consent: state.consent, general: {} };
    (META.keepOnNewSite || []).forEach(k => { if (state.general[k] !== undefined) keep.general[k] = state.general[k]; });
    try { localStorage.removeItem(STORE_KEY); } catch (e) { }

    const tp = photoByKey(META.thanksPhoto);
    $(".layout").hidden = true;
    const box = document.createElement("div");
    box.className = "panel thanks"; box.id = "thanks";
    box.innerHTML = `${tp ? photoFigure(tp, "photo-thanks") : ""}
      <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="var(--accent-soft)"/><path fill="var(--accent)" d="M10 15.17 6.83 12l-1.42 1.41L10 18 19 9l-1.41-1.41z"/></svg>
      <h2>Merci pour votre contribution !</h2>
      <p>Vos réponses${isA && sName ? ` pour le site <strong>${esc(sName)}</strong>` : ""} ont bien été enregistrées.</p>
      <p class="muted">Référence : <code>${esc(ref)}</code></p>
      ${isA ? `<div class="another"><p><strong>Votre organisation gère ou appuie un autre site ?</strong><br>
        <span class="muted small">Votre identification (organisation, fonction, contact) sera conservée ; seules les questions sur le site sont à remplir.</span></p>
        <button type="button" class="btn btn-primary" id="btnAnother">Remplir pour un autre site</button></div>` : ""}
      <p class="muted small">Pour toute question : <a href="mailto:${esc(META.contactEmail)}">${esc(META.contactEmail)}</a></p>`;
    $("#app").appendChild(box);
    const again = $("#btnAnother");
    if (again) again.addEventListener("click", () => {
      state = freshState();
      state.respondentId = keep.respondentId;
      state.siteSeq = keep.siteSeq + 1;
      state.consent = keep.consent;
      Object.assign(state.general, keep.general);
      steps = buildSteps();
      const i = steps.findIndex(s => s.id === "A1");
      state.current = i; state.maxReached = i;
      box.remove(); $(".layout").hidden = false;
      renderStep(); scheduleSave();
      $("#formTop").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* -------------------------------------------------------- brouillon */
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
        $("#saveState").textContent = "Brouillon enregistré · " + new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      } catch (e) { }
    }, 400);
  }
  function loadDraft() {
    try { const raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }

  /* ---------------------------------------------------------- init */
  function init() {
    renderChrome();
    const draft = loadDraft();
    if (draft && (Object.keys(draft.general || {}).length > 1 || draft.consent)) {
      const b = $("#draftBanner");
      b.hidden = false;
      $("#btnResume").addEventListener("click", () => {
        state = Object.assign(freshState(), draft);
        defaults(state.general);
        steps = buildSteps();
        state.current = Math.min(state.current, steps.length - 1);
        state.maxReached = Math.min(state.maxReached, steps.length - 1);
        b.hidden = true; renderStep();
      });
      $("#btnRestart").addEventListener("click", () => {
        try { localStorage.removeItem(STORE_KEY); } catch (e) { }
        b.hidden = true; state = freshState(); steps = buildSteps(); renderStep();
      });
    }
    steps = buildSteps();
    renderStep();

    const form = $("#form");
    form.addEventListener("input", e => { if (e.target.matches('input[type="text"],input[type="number"],textarea')) onFieldChange(e); });
    form.addEventListener("change", e => { if (e.target.matches('input[type="radio"],input[type="checkbox"]')) onFieldChange(e); });
    form.addEventListener("submit", e => e.preventDefault());
    form.addEventListener("click", e => {
      const b = e.target.closest("[data-step]"); if (b) { goTo(Number(b.dataset.step)); return; }
      if (e.target.id === "btnSubmit") submit();
      if (e.target.id === "btnDownload") downloadJson();
    });
    $("#btnNext").addEventListener("click", next);
    $("#btnPrev").addEventListener("click", () => goTo(state.current - 1));
    $("#stepList").addEventListener("click", e => { const b = e.target.closest("[data-step]"); if (b && !b.disabled) goTo(Number(b.dataset.step)); });
    $("#navToggle").addEventListener("click", () => document.body.classList.toggle("nav-open"));
    form.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && e.target.type !== "radio") e.preventDefault(); });
    // Test automatisé : window.__survey expose l'état (sans effet pour les répondants)
    window.__survey = { get state() { return state; }, buildPayload, get steps() { return steps; } };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
