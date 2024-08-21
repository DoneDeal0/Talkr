import * as e from "react";
import { createContext as n, useState as t, useContext as r } from "react";
var a = function () {
  return (
    (a =
      Object.assign ||
      function (e) {
        for (var n, t = 1, r = arguments.length; t < r; t++)
          for (var a in (n = arguments[t]))
            Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        return e;
      }),
    a.apply(this, arguments)
  );
};
var o = function (e, n) {
  return (
    void 0 === n && (n = !1),
    n
      ? (function (e) {
          return "undefined" != typeof navigator
            ? navigator.language.split("-")[0]
            : e;
        })(e)
      : e
  );
};
function l(e, n, t) {
  var r = e.locale,
    a = e.languages,
    o = e.defaultLanguage,
    l = a[r] ? r : o,
    u = a[l],
    c = n;
  if (t && Object.keys(t).includes("count")) {
    var i = (function (e, n) {
      return "object" == typeof Intl && "function" == typeof Intl.PluralRules
        ? new Intl.PluralRules(n).select(e)
        : 0 === e
          ? "zero"
          : 1 === e
            ? "one"
            : "other";
    })(t.count, l);
    c += 0 === t.count ? ".zero" : "other" === i ? ".many" : ".".concat(i);
  }
  return (
    t && t.gender && (c += "m" === t.gender ? ".male" : ".female"),
    c.split(".").forEach(function (e) {
      if (u[e]) return (u = u[e]);
    }),
    "string" != typeof u
      ? (console.warn("Talkr: Missing translation for ".concat(n)), "")
      : t
        ? u
            .split("__")
            .map(function (e) {
              return t[e] || e;
            })
            .join("")
        : u
  );
}
var u = n({
  locale: "",
  setLocale: function () {
    return null;
  },
  languages: {},
  defaultLanguage: "",
});
function c(n) {
  var r = n.children,
    a = n.languages,
    l = n.defaultLanguage,
    c = n.detectBrowserLanguage,
    i = t(o(l, c)),
    f = i[0],
    s = i[1];
  return e.createElement(
    u.Provider,
    { value: { locale: f, setLocale: s, languages: a, defaultLanguage: l } },
    r,
  );
}
function i() {
  var e = r(u),
    n = e.setLocale,
    t = (function (e, n) {
      var t = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          n.indexOf(r) < 0 &&
          (t[r] = e[r]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var a = 0;
        for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
          n.indexOf(r[a]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
            (t[r[a]] = e[r[a]]);
      }
      return t;
    })(e, ["setLocale"]);
  return a(a({}, t), {
    setLocale: n,
    T: function (e, n) {
      return l(t, e, n);
    },
  });
}
export { c as Talkr, u as TalkrContext, l as tr, i as useT };
