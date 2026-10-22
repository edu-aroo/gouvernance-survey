// Génère analysis/codebook.csv à partir de assets/js/survey-config.js
// Usage : node tools/make_codebook.js
const path = require("path"), fs = require("fs");
const S = require(path.join(__dirname, "../assets/js/survey-config.js"));
const rows = [];
const q = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
const meta = x => ({ path: x.path || "", dim: x.dim || "", sub: x.sub || "", crit: x.crit || "" });
// Q1 (consentement, page d'accueil)
const C = S.META.consent;
rows.push({ variable: C.id, n: "1", step_key: "intro", step: "Consentement", label: C.label, type: "radio", options: C.options.join(" | "), required: "Oui", condition: "", ...meta({ path: "Tous", dim: "ID" }) });
for (const st of S.STEPS) {
  const stepCond = st.showIf ? JSON.stringify(st.showIf) : "";
  for (const x of st.questions) {
    const base = { step_key: st.key, step: st.title, n: x.n, required: x.required ? "Oui" : "Non",
                   condition: x.showIf ? JSON.stringify(x.showIf) : "", step_condition: stepCond, ...meta(x) };
    if (x.type === "matrix") {
      for (const r of x.rows) rows.push({ ...base, variable: `${x.id}_${r.key}`, label: `${x.label} — ${r.label}`, row_label: r.label,
        type: "matrix", options: x.cols.join(" | "), rows_from: x.rowsFrom || "" });
      continue;
    }
    const opts = x.type === "anchored" ? x.levels.map((l, i) => (i + 1) + " — " + l).concat("NSP") : (x.options || []);
    rows.push({ ...base, variable: x.id, label: x.label, type: x.type, options: opts.join(" | "), unit: x.unit || "" });
    if (x.other) rows.push({ ...base, variable: x.id + "_autre", label: x.label + " — précision (Autre)", type: "text", options: "", required: "Non" });
    if (x.detail) rows.push({ ...base, variable: x.id + "_detail", label: x.label + " — " + x.detail.label, type: "text", options: "", required: "Non" });
  }
}
const cols = ["variable", "n", "step_key", "step", "label", "type", "options", "required", "condition", "step_condition",
              "row_label", "rows_from", "unit", "path", "dim", "sub", "crit"];
const csv = [cols.join(",")].concat(rows.map(r => cols.map(c => q(r[c])).join(","))).join("\n");
fs.writeFileSync(path.join(__dirname, "../analysis/codebook.csv"), csv + "\n", "utf8");
console.log(rows.length + " variables écrites dans analysis/codebook.csv");
