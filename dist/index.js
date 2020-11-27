"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=function(){return(t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},n="undefined"!=typeof navigator?navigator.language.split("-")[0]:null,r=e.createContext(null);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function a(){var t=e.useContext(r);if(null==t)throw new Error("This should only be called inside Talkr");return t}exports.T=function(e,n){var r=a(),u=r.locale,l=r.languages,o=r.defaultLanguage,i=l[u]?u:o,s=l[i],c=e;if(n&&Object.keys(n).includes("count")){var f=new Intl.PluralRules(i).select(n.count);c=0===n.count?e+".zero":"other"===f?e+".many":e+"."+f}if(c.split(".").forEach((function(e){if(s[e])return s=s[e]})),"string"!=typeof s)return console.warn("Talkr bot: Missing translation for "+e),null;var g=n&&Object.entries(n).reduce((function(e,n){var r;return t(t({},e),((r={})[n[0]]=n[1].toString(),r))}),{});return g?s.split("__").map((function(e){return g[e]?g[e]:e})).join(""):s},exports.Talkr=function(t){var a=t.children,u=t.languages,l=t.defaultLanguage,o=t.detectBrowserLanguage,i=e.useState(o&&n?n:l),s=i[0],c=i[1];return e.createElement(r.Provider,{value:{locale:s,setLocale:c,languages:u,defaultLanguage:l}},a)},exports.useLocale=a;
