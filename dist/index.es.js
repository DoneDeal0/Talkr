import{createContext as n,useState as r,createElement as t,useContext as e,useMemo as a}from"react";
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
***************************************************************************** */var u=function(){return(u=Object.assign||function(n){for(var r,t=1,e=arguments.length;t<e;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(n[a]=r[a]);return n}).apply(this,arguments)},i=navigator.language.split("-")[0],o=n(null);function l(n){var e=n.children,a=n.languages,u=n.mainLanguage,l=r(u||i),c=l[0],g=l[1];return t(o.Provider,{value:{locale:c,setLocale:g,languages:a,mainLanguage:u}},e)}function c(n,r){var t=e(o),i=t.locale,l=t.languages,c=t.mainLanguage,g=l[i]?i:c,f=n;r&&Object.keys(r).includes("count")&&(f=r.count>1?n+".plural":n+".default");var s=l[g];if(a((function(){return f.split(".").forEach((function(n){if(s[n])return s=s[n]}))}),[]),"string"!=typeof s)return null;var p=r&&Object.entries(r).reduce((function(n,r){var t;return u(u({},n),((t={})[r[0]]=r[1].toString(),t))}),{});return p?s.split("__").map((function(n){return p[n]?p[n]:n})).join(""):s}function g(){return e(o)}export{l as Talkr,c as t,g as useLocale};
