import{createContext as n,useState as r,createElement as t,useContext as a}from"react";
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
***************************************************************************** */var e=function(){return(e=Object.assign||function(n){for(var r,t=1,a=arguments.length;t<a;t++)for(var e in r=arguments[t])Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e]);return n}).apply(this,arguments)},u=navigator.language.split("-")[0],i=n(null);function o(n){var a=n.children,e=n.languages,o=n.mainLanguage,l=r(o||u),c=l[0],g=l[1];return t(i.Provider,{value:{locale:c,setLocale:g,languages:e,mainLanguage:o}},a)}function l(n,r){var t=a(i),u=t.locale,o=t.languages,l=t.mainLanguage,c=o[u]?u:l,g=n;r&&Object.keys(r).includes("count")&&(g=r.count>1?n+".plural":n+".default");var f=o[c];if(g.split(".").forEach((function(n){if(f[n])return f=f[n]})),"string"!=typeof f)return null;var s=r&&Object.entries(r).reduce((function(n,r){var t;return e(e({},n),((t={})[r[0]]=r[1].toString(),t))}),{});return s?f.split("__").map((function(n){return s[n]?s[n]:n})).join(""):f}function c(){return a(i)}export{o as Talkr,l as t,c as useLocale};
