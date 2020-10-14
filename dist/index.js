"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=function(){return(t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},n=navigator.language.split("-")[0],r=e.createContext(null);
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
***************************************************************************** */exports.Talkr=function(t){var a=t.children,u=t.languages,o=t.mainLanguage,i=e.useState(o||n),l=i[0],c=i[1];return e.createElement(r.Provider,{value:{locale:l,setLocale:c,languages:u,mainLanguage:o}},a)},exports.t=function(n,a){var u=e.useContext(r),o=u.locale,i=u.languages,l=u.mainLanguage,c=i[o]?o:l,s=n;a&&Object.keys(a).includes("count")&&(s=a.count>1?n+".plural":n+".default");var g=i[c];if(e.useMemo((function(){return s.split(".").forEach((function(e){if(g[e])return g=g[e]}))}),[]),"string"!=typeof g)return null;var f=a&&Object.entries(a).reduce((function(e,n){var r;return t(t({},e),((r={})[n[0]]=n[1].toString(),r))}),{});return f?g.split("__").map((function(e){return f[e]?f[e]:e})).join(""):g},exports.useLocale=function(){return e.useContext(r)};
