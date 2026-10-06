// Bundles the app prototype into one self-contained page: node build.js  →  index.html
const fs = require("fs");
const path = require("path");
const here = __dirname, src = (f) => fs.readFileSync(path.join(here, "src", f), "utf8"), vendor = (f) => fs.readFileSync(path.join(here, "vendor", f), "utf8");

const out = src("shell.html")
  .replace("/*@CSS@*/", () => src("app.css").replace("@LOGIN_BG@", "data:image/jpeg;base64," + fs.readFileSync(path.join(here, "src", "login-bg.jpg")).toString("base64")))
  .replace("<!--@LOGO@-->", () => src("logo-symbols.svg"))
  // labels: the dashboard's own dictionary wins; the app dictionary only fills keys it lacks
  .replace("/*@I18N@*/", () => vendor("i18n-dashboard.js") +
    "\n;(function () { var real = window.I18N;\n" + vendor("i18n-app.js") +
    "\nvar old = window.I18N; ['ar', 'en'].forEach(function (l) { real[l] = Object.assign({}, old[l], real[l]); }); window.I18N = real; })();")
  .replace("/*@DATA@*/", () => vendor("data.js"))
  .replace("/*@APP@*/", () => src("app.js"));

const cut = out.indexOf("</style>") + "</style>".length;
const page = `<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n${out.slice(0, cut)}\n</head>\n<body>\n${out.slice(cut)}\n</body>\n</html>\n`;
fs.writeFileSync(path.join(here, "index.html"), page);
console.log("index.html", (page.length / 1024).toFixed(0) + " KB");
