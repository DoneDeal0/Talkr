"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var e = require("react");
function t(e) {
  if (e && e.__esModule) return e;
  var t = Object.create(null);
  return (
    e &&
      Object.keys(e).forEach(function (r) {
        if ("default" !== r) {
          var n = Object.getOwnPropertyDescriptor(e, r);
          Object.defineProperty(
            t,
            r,
            n.get
              ? n
              : {
                  enumerable: !0,
                  get: function () {
                    return e[r];
                  },
                },
          );
        }
      }),
    (t.default = e),
    Object.freeze(t)
  );
}
var r = t(e),
  n = function () {
    return (
      (n =
        Object.assign ||
        function (e) {
          for (var t, r = 1, n = arguments.length; r < n; r++)
            for (var a in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          return e;
        }),
      n.apply(this, arguments)
    );
  };
var a = function (e, t) {
  return (
    void 0 === t && (t = !1),
    t
      ? (function (e) {
          return "undefined" != typeof navigator
            ? navigator.language.split("-")[0]
            : e;
        })(e)
      : e
  );
};
function o(e, t, r) {
  var n = e.locale,
    a = e.languages,
    o = e.defaultLanguage,
    u = a[n] ? n : o,
    l = a[u],
    c = t;
  if (r && Object.keys(r).includes("count")) {
    var i = (function (e, t) {
      return "object" == typeof Intl && "function" == typeof Intl.PluralRules
        ? new Intl.PluralRules(t).select(e)
        : 0 === e
          ? "zero"
          : 1 === e
            ? "one"
            : "other";
    })(r.count, u);
    c += 0 === r.count ? ".zero" : "other" === i ? ".many" : ".".concat(i);
  }
  return (
    r && r.gender && (c += "m" === r.gender ? ".male" : ".female"),
    c.split(".").forEach(function (e) {
      if (l[e]) return (l = l[e]);
    }),
    "string" != typeof l
      ? (console.warn("Talkr: Missing translation for ".concat(t)), "")
      : r
        ? l
            .split("__")
            .map(function (e) {
              return r[e] || e;
            })
            .join("")
        : l
  );
}
var u = e.createContext({
  locale: "",
  setLocale: function () {
    return null;
  },
  languages: {},
  defaultLanguage: "",
});
(exports.Talkr = function (t) {
  var n = t.children,
    o = t.languages,
    l = t.defaultLanguage,
    c = t.detectBrowserLanguage,
    i = e.useState(a(l, c)),
    f = i[0],
    s = i[1];
  return r.createElement(
    u.Provider,
    { value: { locale: f, setLocale: s, languages: o, defaultLanguage: l } },
    n,
  );
}),
  (exports.TalkrContext = u),
  (exports.tr = o),
  (exports.useT = function () {
    var t = e.useContext(u),
      r = t.setLocale,
      a = (function (e, t) {
        var r = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            t.indexOf(n) < 0 &&
            (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var a = 0;
          for (n = Object.getOwnPropertySymbols(e); a < n.length; a++)
            t.indexOf(n[a]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
              (r[n[a]] = e[n[a]]);
        }
        return r;
      })(t, ["setLocale"]);
    return n(n({}, a), {
      setLocale: r,
      T: function (e, t) {
        return o(a, e, t);
      },
    });
  });
